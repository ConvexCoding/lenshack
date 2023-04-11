<script lang="ts">
  import { OrbitControls } from '@threlte/extras'
  import { Canvas, T, useFrame } from '@threlte/core'
  import { BufferAttribute, LatheGeometry, Vector3 } from 'three'
  import { xyToVector } from '$lib/mathUtils'
  import Coords from '$lib/Coords.svelte'
  import { Lut } from 'three/examples/jsm/math/Lut'
  import { generateLatheColors } from '$lib/mathUtils'
  import { RangeSlider } from '@skeletonlabs/skeleton'

  export let w0 = 0.2
  export let i0 = 1

  // Generate a 2d plot of peak intensity versus radial distance (2 * w0)
  // where radial distance r is mapped to the z axis
  // and the intensity Ir is mapped to the y axis

  const r: number[] = []
  const intensity: number[] = []

  const rmulti = 2
  const verticalGridDivisions = 9
  const horizontalGridDivisions = 10
  const rinc = (w0 * rmulti) / 100

  // set constants
  // realize this could one statement but it's easier to read this way
  let maxY = i0
  let minY = 0
  let maxR = rmulti * w0
  let maxWaist = 1.0

  const numLuts = 51
  const lut = new Lut('rainbow', numLuts)

  // displayed chart in pixels
  const gridWidth = 100 // total grid width = 2 * gridWidth
  const gridHeight = 100 // total grid height = 2 * gridHeight
  const horizontalLabelHeight = 10

  // set scale constants for w and z
  let scaleY0 = maxY
  const colorToGrid = false
  const yMaxColor = gridHeight
  let image: LatheGeometry
  let ivalue = 0.5
  let max = 1.0
  let waistvalue = w0

  function updateAll(localIntensity: number, localWaist: number) {
    w0 = localWaist
    i0 = localIntensity
    r.length = 0
    intensity.length = 0
    for (let radius = -rmulti * maxWaist; radius <= rmulti * maxWaist; radius += rinc) {
      r.push((radius * gridWidth) / (rmulti * maxWaist))
      const itemp = localIntensity * Math.exp(-2 * (radius / localWaist) * (radius / localWaist))
      intensity.push(itemp * gridHeight)
    }
    const data = xyToVector(r, intensity)
    image = new LatheGeometry(data, 51, 0, Math.PI * 2)
    const lathcolors = generateLatheColors(image, yMaxColor, 'rainbow', numLuts)
    image.setAttribute('color', new BufferAttribute(lathcolors, 3))
    return image
  }

  const showCoords = false
  let rotation = 0
  $: updatedImage = updateAll(ivalue, waistvalue)
</script>

<div class="wrapper">
  <div class="absolute flex w-1/5 flex-col">
    <div class="ml-5">
      <RangeSlider
        name="intensity-slider"
        accent="accent-surface-900 dark:accent-surface-300"
        bind:value={ivalue}
        min={0}
        max={1}
        step={0.01}
        ticked={true}
        on:change{updateIntensity(ivalue)}
      >
        <div class="flex items-center justify-between">
          <div class="text-sm font-bold">Peak Intensity</div>
          <div class="text-sm font-bold">{ivalue} / {max}</div>
        </div>
      </RangeSlider>
    </div>

    <div class="ml-5">
      <RangeSlider
        name="waist-slider"
        accent="accent-surface-900 dark:accent-surface-300"
        bind:value={waistvalue}
        min={0}
        max={1}
        step={0.01}
        on:change{updateWaist(waistvalue)}
        ticked
      >
        <div class="flex items-center justify-between">
          <div class="text-sm font-bold">Waist Radius</div>
          <div class="text-sm font-bold">{waistvalue} / {max}</div>
        </div>
      </RangeSlider>
    </div>
  </div>

  <Canvas>
    {#if showCoords}
      <Coords locXYZ={new Vector3(0, 0, -gridHeight / 2 - 60)} />
    {/if}

    <T.PerspectiveCamera
      makeDefault
      position={[-200, 10, -0]}
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
      geometry={updatedImage}
      position={[0, -gridWidth / 4, 0]}
      rotation={[0, rotation, 0]}
      castShadow={true}
      let:ref
    >
      <T.MeshPhongMaterial vertexColors={true} shinness={100} opacity={0.8} transparent side={2} />
    </T.Mesh>
  </Canvas>
</div>
