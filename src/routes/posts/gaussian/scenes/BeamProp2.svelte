<script lang="ts">
  import { OrbitControls } from '@threlte/extras'
  import { T } from '@threlte/core'
  import { Text } from '@threlte/extras'
  import { AmbientLight, DoubleSide, LatheGeometry, Vector3 } from 'three'
  import { genGridLines, genLineSegment, setAxisLimits, xyToVector } from '$lib/mathUtils'
  import Coords from '$lib/Coords.svelte'
  import { Line2 } from 'three/examples/jsm/lines/Line2'
  import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial'

  const z: number[] = []
  const w: number[] = []

  export let w0 = 0.5
  export let λ = 0.001
  export let n = 1
  export let maxz = 1000

  const zr = (Math.PI * w0 * w0 * n) / λ

  // set constants
  const zinc = 1

  // realize this could one statement but it's easier to read this way
  let maxW = w0 * Math.sqrt(1 + (maxz / zr) * (maxz / zr)) // max waist size needed for scale chart
  maxW = setAxisLimits(0, maxW, zinc)[1] // round up to nearest logical chart scale

  // displayed chart in pixels
  const gridWidth = 200 // total grid width = 2 * gridWidth
  const gridHeight = 75 // total grid height = 2 * gridHeight

  // set scale constants for w and z
  let scaleZ = 2 * gridWidth
  let scaleW = 2 * gridHeight
  let scaleW0 = (w0 * scaleW) / maxW / 2

  // generate z and w arrays
  // *****************************
  for (let i = 0; i <= maxz; i += zinc) {
    z.push((i * scaleZ) / maxz - scaleZ / 2)
    const wz = w0 * Math.sqrt(1 + (i / zr) * (i / zr))
    w.push((wz * scaleW) / 2 / maxW)
  }

  const numPoints = w.length
  const pluslinesegs = new Float32Array(numPoints * 3) // each point has 3 coordinates (x, y, z)
  const neglinesegs = new Float32Array(numPoints * 3) // each point has 3 coordinates (x, y, z)
  const xoffset = -2

  for (let i = 0; i < numPoints; i++) {
    pluslinesegs[i * 3] = xoffset // set x-coordinate to 0
    pluslinesegs[i * 3 + 1] = w[i] // set y-coordinate to y[i]
    pluslinesegs[i * 3 + 2] = z[i] // set z-coordinate to z[i]
    neglinesegs[i * 3] = xoffset // set x-coordinate to 0
    neglinesegs[i * 3 + 1] = -w[i] // set y-coordinate to y[i]
    neglinesegs[i * 3 + 2] = z[i] // set z-coordinate to z[i]
  }
  // *****************************

  // generate grid lines
  // *****************************
  let gridLines = genGridLines(xoffset, gridWidth, gridHeight, 5)
  // *****************************
</script>

<!--
<Coords locXYZ={new Vector3(-40, 0, -scaleZ / 2 + 60)} />
-->
<T.PerspectiveCamera
  makeDefault
  position={[-200, 0, 0]}
  on:create={({ ref }) => {
    ref.lookAt(0, 0, 0)
  }}
>
  <OrbitControls enableDamping enableZoom enablePan />
</T.PerspectiveCamera>

<T.DirectionalLight position={[-100, 0, 0]} intensity={0.75} />
<T.DirectionalLight position={[0, 100, 0]} intensity={0.2} />
<T.DirectionalLight position={[0, -100, 0]} intensity={0.2} />
<T.AmbientLight intensity={0.5} />

<!-- background planes-->
<T.Mesh position={[0, 0, 0]} rotation={[0, 0, 0]}>
  <T.BoxGeometry args={[1, scaleW + 20, scaleZ + 20]} />
  <T.MeshStandardMaterial side={DoubleSide} color={'yellow'} transparent opacity={1} />
</T.Mesh>

<!-- plus gauss plot widths -->
<T.Mesh>
  <T
    is={Line2}
    geometry={genLineSegment(pluslinesegs)}
    material={new LineMaterial({ color: 0x0000ff, linewidth: 0.01 })}
  />
  <T
    is={Line2}
    geometry={genLineSegment(neglinesegs)}
    material={new LineMaterial({ color: 0x0000ff, linewidth: 0.01 })}
  />
</T.Mesh>

<!-- add background grid lines -->
<T.Mesh>
  {#each gridLines as line}
    <T
      is={Line2}
      geometry={genLineSegment(line)}
      material={new LineMaterial({ color: 0x00aaff, linewidth: 0.001 })}
    />
  {/each}
  <T
    is={Line2}
    geometry={genLineSegment(gridLines[0])}
    material={new LineMaterial({ color: 0x000000, linewidth: 0.002 })}
  />
</T.Mesh>

<!-- add axis labels -->
<T.Mesh position={[xoffset, gridHeight, gridWidth]} rotation={[0, -Math.PI / 2, 0]}>
  <Text
    text={maxW.toFixed(2) + ' mm'}
    color={0x000000}
    fontSize={8}
    anchorX={'center'}
    anchorY={'bottom'}
  />
</T.Mesh>

<T.Mesh position={[xoffset, -gridHeight, gridWidth]} rotation.y={-Math.PI / 2}>
  <Text
    text={'-' + maxW.toFixed(2) + ' mm'}
    color={0x000000}
    fontSize={8}
    anchorX={'center'}
    anchorY={'top'}
  />
</T.Mesh>

<T.Mesh position={[xoffset, scaleW0, -gridWidth]} rotation.y={-Math.PI / 2}>
  <Text
    text={w0.toFixed(3) + ' mm'}
    color={0x000000}
    fontSize={8}
    anchorX={'center'}
    anchorY={'bottom'}
  />
</T.Mesh>
<T.Mesh position={[xoffset, -scaleW0, -gridWidth]} rotation.y={-Math.PI / 2}>
  <Text
    text={'-' + w0.toFixed(3) + ' mm'}
    color={0x000000}
    fontSize={8}
    anchorX={'center'}
    anchorY={'top'}
  />
</T.Mesh>

<!-- Max z Distance Label -->
<T.Mesh position={[xoffset, 0, gridWidth]} rotation.y={-Math.PI / 2}>
  <Text
    text={maxz.toFixed(0) + ' mm -->'}
    color={0x000000}
    fontSize={8}
    anchorX={'right'}
    anchorY={'bottom'}
  />
</T.Mesh>

<!-- Title -->
<T.Mesh position={[xoffset, gridHeight, -gridWidth]} rotation.y={-Math.PI / 2}>
  <Text
    text={'Gaussian Beam Profile over Distance'}
    color={0x000000}
    fontSize={10}
    anchorX={'left'}
    anchorY={'top'}
  />
</T.Mesh>
