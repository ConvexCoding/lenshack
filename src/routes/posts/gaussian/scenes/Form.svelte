<script lang="ts">
  import { Canvas } from '@threlte/core'
  import { RangeSlider } from '@skeletonlabs/skeleton'
  import { OrbitControls } from '@threlte/extras'
  import { T, useFrame } from '@threlte/core'
  import { BufferAttribute, LatheGeometry, Vector3 } from 'three'
  import { xyToVector } from '$lib/mathUtils'
  import Coords from '$lib/Coords.svelte'
  import { Lut } from 'three/examples/jsm/math/Lut'
  import { generateLatheColors } from '$lib/mathUtils'
  import type { LargeNumberLike } from 'crypto'

  let w0 = 0.2
  let i0 = 1

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
  let maxY = 1
  let minY = 0
  let maxR = rmulti * w0

  const numLuts = 51
  const lut = new Lut('rainbow', numLuts)

  // displayed chart in pixels
  const gridWidth = 100 // total grid width = 2 * gridWidth
  const gridHeight = 100 // total grid height = 2 * gridHeight
  const horizontalLabelHeight = 10

  let image: LatheGeometry
  // set scale constants for w and z
  let scaleY0 = maxY

  // generate z and w arrays
  // *****************************
  const colorToGrid = false
  let yMaxColor = gridHeight

  const showCoords = false

  let rotation = 0
  // useFrame((state, delta) => {
  //   rotation += 0
  // })

  let value = 0.7
  let max = 1

  function resetGraph(value: number) {
    i0 = value
    console.log('resetGraph', value)
    r.length = 0
    intensity.length = 0
    for (let radius = -rmulti * w0; radius <= rmulti * w0; radius += rinc) {
      r.push((radius * gridWidth) / (rmulti * w0))
      const itemp = i0 * Math.exp(-2 * (radius / w0) * (radius / w0))
      intensity.push(itemp * gridHeight)
    }

    const data = xyToVector(r, intensity)
    image = new LatheGeometry(data, 51, 0, Math.PI * 2)
    const lathcolors = generateLatheColors(image, yMaxColor, 'rainbow', numLuts)
    image.setAttribute('color', new BufferAttribute(lathcolors, 3))
    return image
  }

  $: image = resetGraph(value)
</script>

<RangeSlider
  name="range-slider"
  bind:value
  min={0}
  max={1}
  step={0.1}
  ticked
  on:change{resetGraph(value)}
>
  <div class="flex items-center justify-between">
    <div class="font-bold">Peak Intensity</div>
    <div class="font-bold">{value} / {max}</div>
  </div>
</RangeSlider>

<div class="wrapper bg-slate-300">
  <Canvas>
    {#if showCoords}
      <Coords locXYZ={new Vector3(0, 0, -gridHeight / 2 - 60)} />
    {/if}

    <T.PerspectiveCamera
      makeDefault
      position={[-250, 10, -0]}
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

    <T.Mesh
      geometry={image}
      position={[0, -gridWidth / 4, 0]}
      rotation={[0, rotation, 0]}
      castShadow={true}
      let:ref
    >
      <T.MeshPhongMaterial vertexColors={true} shinness={100} opacity={0.8} transparent side={2} />
    </T.Mesh>
  </Canvas>
</div>

<div class="font-bold">Peak Intensity: {value}</div>
