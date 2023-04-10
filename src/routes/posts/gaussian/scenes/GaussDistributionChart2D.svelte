<script lang="ts">
  import { OrbitControls } from '@threlte/extras'
  import { T } from '@threlte/core'
  import { Text } from '@threlte/extras'
  import { DoubleSide } from 'three'
  import { grid2Quad, genLineSegment, setAxisLimits } from '$lib/mathUtils'
  import Coords from '$lib/Coords.svelte'
  import { Line2 } from 'three/examples/jsm/lines/Line2'
  import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial'

  export let w0 = 0.2
  export let i0 = 1

  // Generate a 2d plot of peak intensity versus radial distance (2 * w0)
  // where radial distance r is mapped to the z axis
  // and the intensity Ir is mapped to the y axis

  const r: number[] = []
  const intensity: number[] = []

  const rmulti = 3
  const verticalGridDivisions = 9
  const horizontalGridDivisions = 10
  const rinc = (w0 * rmulti) / 100

  // set constants
  // realize this could one statement but it's easier to read this way
  let maxY = i0
  let minY = 0
  let maxR = rmulti * w0

  // displayed chart in pixels
  const gridWidth = 140 // total grid width = 2 * gridWidth
  const gridHeight = 140 // total grid height = 2 * gridHeight
  const horizontalLabelHeight = 10

  // set scale constants for w and z
  let scaleY0 = maxY

  // generate z and w arrays
  // *****************************
  for (let radius = -rmulti * w0; radius <= rmulti * w0; radius += rinc) {
    r.push((radius * gridWidth) / (rmulti * w0))
    const itemp = i0 * Math.exp(-2 * (radius / w0) * (radius / w0))
    intensity.push(itemp * gridHeight)
  }

  const numPoints = r.length
  const pluslinesegs = new Float32Array(numPoints * 3) // each point has 3 coordinates (x, y, z)
  const xoffset = -2

  for (let i = 0; i < numPoints; i++) {
    pluslinesegs[i * 3] = xoffset // set x-coordinate to 0
    pluslinesegs[i * 3 + 1] = intensity[i] // set y-coordinate to intensity[i]
    pluslinesegs[i * 3 + 2] = r[i] // set z-coordinate to r[i]
  }

  // *****************************

  // generate grid lines
  // *****************************
  let gridLines = grid2Quad(
    xoffset,
    gridWidth,
    gridHeight,
    verticalGridDivisions,
    horizontalGridDivisions
  )
  // *****************************

  $: lineSegGeometry = genLineSegment(pluslinesegs)
</script>

<!--
<Coords locXYZ={new Vector3(-40, 0, -scaleZ / 2 + 60)} />
-->

<!-- Add Camera -->
<T.PerspectiveCamera
  makeDefault
  position={[-200, 0, 0]}
  on:create={({ ref }) => {
    ref.lookAt(0, 0, 0)
  }}
>
  <OrbitControls enableDamping enableZoom enablePan />
</T.PerspectiveCamera>

<!-- Add Lights -->
<T.DirectionalLight position={[-100, 0, 0]} intensity={0.75} />
<T.DirectionalLight position={[0, 100, 0]} intensity={0.2} />
<T.DirectionalLight position={[0, -100, 0]} intensity={0.2} />
<T.AmbientLight intensity={0.5} />

<T.Group position.y={-gridHeight / 2 + horizontalLabelHeight / 2} visible={true}>
  <!-- profile lines -->
  <T.Mesh>
    <T
      is={Line2}
      geometry={lineSegGeometry}
      material={new LineMaterial({ color: 0x0000ff, linewidth: 0.005 })}
    />
  </T.Mesh>

  <!-- background plane - in this case along Y-Z aaxis -->
  <T.Mesh position={[0, gridHeight / 2, 0]} rotation={[0, 0, 0]}>
    <T.BoxGeometry args={[1, gridHeight + 10, gridWidth * 2 + 10]} />
    <T.MeshStandardMaterial side={DoubleSide} color={'yellow'} transparent opacity={1} />
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
      material={new LineMaterial({ color: 0x000000, linewidth: 0.004 })}
    />
    <T
      is={Line2}
      geometry={genLineSegment(gridLines[1])}
      material={new LineMaterial({ color: 0x000000, linewidth: 0.0015 })}
    />
  </T.Mesh>

  <!-- add axis label for Ymax at Xmax -->
  <T.Mesh position={[xoffset, gridHeight, gridWidth]} rotation={[0, -Math.PI / 2, 0]}>
    <Text
      text={i0.toFixed(2) + ' W/mm^2'}
      color={0x000000}
      fontSize={8}
      anchorX={'right'}
      anchorY={'top'}
    />
  </T.Mesh>

  <!-- add axis label for Ymax at X0 -->
  <T.Mesh position={[xoffset, scaleY0, -gridWidth]} rotation.y={-Math.PI / 2}>
    <Text
      text={'<-- -' + maxR.toFixed(3) + ' mm'}
      color={0x000000}
      fontSize={8}
      anchorX={'left'}
      anchorY={'bottom'}
    />
  </T.Mesh>

  <!-- Max z Distance Label -->
  <T.Mesh position={[xoffset, 0, gridWidth]} rotation.y={-Math.PI / 2}>
    <Text
      text={maxR.toFixed(3) + ' mm -->'}
      color={0x000000}
      fontSize={8}
      anchorX={'right'}
      anchorY={'bottom'}
    />
  </T.Mesh>

  <!-- Title -->
  <T.Mesh position={[xoffset, gridHeight, -gridWidth]} rotation.y={-Math.PI / 2}>
    <Text
      text={'Intensity at Focus'}
      color={0x000000}
      fontSize={10}
      anchorX={'left'}
      anchorY={'top'}
    />
  </T.Mesh>
</T.Group>

<T.Group position.y={-gridHeight - 5}>
  <!-- background plane - in this case along Y-Z aaxis -->
  <T.Mesh position={[0, gridHeight / 2, 0]} rotation={[0, 0, 0]}>
    <T.BoxGeometry args={[1, horizontalLabelHeight, gridWidth * 2 + 10]} />
    <T.MeshStandardMaterial side={DoubleSide} color={'yellow'} transparent opacity={1} />
  </T.Mesh>

  <!-- add axis label for Ymax at Xmax -->
  <T.Mesh position={[xoffset, gridHeight / 2 + 5, 0]} rotation={[0, -Math.PI / 2, 0]}>
    <Text text={'0.0'} color={0x000000} fontSize={8} anchorX={'center'} anchorY={'middle'} />
  </T.Mesh>

  <T.Mesh position={[xoffset, gridHeight / 2 + 5, gridWidth / 2]} rotation={[0, -Math.PI / 2, 0]}>
    <Text
      text={'radial distance -->'}
      color={0x000000}
      fontSize={8}
      anchorX={'center'}
      anchorY={'middle'}
    />
  </T.Mesh>
</T.Group>
