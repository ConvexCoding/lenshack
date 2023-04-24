<script lang="ts">
  import { OrbitControls } from '@threlte/extras'
  import { Canvas, T } from '@threlte/core'
  import { Text } from '@threlte/extras'
  import { BufferGeometry, DoubleSide, Group, LineDashedMaterial, Vector3 } from 'three'
  import { genGridLines, genLineSegment, setAxisLimits, toGrid, toWorld } from '$lib/mathUtils'
  import Coords from '$lib/Coords.svelte'
  import { Line2 } from 'three/examples/jsm/lines/Line2'
  import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial'
  import { RangeSlider } from '@skeletonlabs/skeleton'
  import Aline from '$lib/Aline.svelte'

  export let w0 = 0.5
  export let λ = 1.0
  export let n = 1
  export let zstart = -2000
  export let zend = 2000
  export let zinc = 2
  export let showRangeSliders = true
  export let showDivergence = true
  export let wasitMaxScale = 1.0

  let showWZ = true
  let showZr = true

  // Generate a plot with horizontal axis along z and vertical axis along y
  // where waist radius is mapped to the y axis
  // and the z distance is mapped to the z axis

  let waistvalue = w0
  let waistmin = 0.25
  let waistmax = 4.0
  let waisttic = 0.05

  let wavelvalue = λ
  let wavelmin = 0.5
  let wavelmax = 12
  let waveltic = 0.5

  // displayed chart in pixels
  const gridWidth = 200 // total grid width = 2 * gridWidth
  const gridHeight = 75 // total grid height = 2 * gridHeight

  const zScale = [
    [zstart, zend],
    [-gridWidth, gridWidth],
  ]

  // set constants
  // realize this could be one statement but it's easier to read this way
  $: zr = (Math.PI * waistvalue * waistvalue * n) / wavelvalue
  let maxY = w0 * Math.sqrt(1 + (zend / zr) * (zend / zr)) // max waist size needed for scale chart
  maxY = setAxisLimits(0, maxY, zinc)[1] // round up to nearest logical chart scale
  maxY = wasitMaxScale // override for now

  // set scale constants for w and z
  let scaleZ = 2 * gridWidth
  let scaleY = 2 * gridHeight
  let scaleY0 = (w0 * scaleY) / maxY / 2

  const xoffset = -2

  function genLineSegs(waist: number, wavelength: number) {
    let pluslinesegs = new Float32Array(((zend - zstart) / zinc + 1) * 3)
    let neglinesegs = new Float32Array(((zend - zstart) / zinc + 1) * 3)

    const z: number[] = []
    const w: number[] = []

    const zrj = (Math.PI * waist * waist * n) / (wavelength / 1000)
    let startY = waist * Math.sqrt(1 + (zstart / zrj) * (zstart / zrj))
    let endY = waist * Math.sqrt(1 + (zend / zrj) * (zend / zrj))
    maxY = Math.max(startY, endY)
    maxY = setAxisLimits(0, maxY, zinc)[1] // round up to nearest logical chart scale
    maxY = wasitMaxScale // override for now
    scaleY0 = (waist * scaleY) / maxY / 2

    for (let i = zstart; i <= zend; i += zinc) {
      z.push(((i - zstart) * scaleZ) / (zend - zstart) - scaleZ / 2)
      const wz = waist * Math.sqrt(1 + (i / zrj) * (i / zrj))
      w.push((wz * scaleY) / 2 / maxY)
    }
    const numPoints = w.length

    for (let i = 0; i < numPoints; i++) {
      pluslinesegs[i * 3] = xoffset // set x-coordinate to 0
      pluslinesegs[i * 3 + 1] = w[i] // set y-coordinate to w[i]
      pluslinesegs[i * 3 + 2] = z[i] // set z-coordinate to z[i]
      neglinesegs[i * 3] = xoffset // set x-coordinate to 0
      neglinesegs[i * 3 + 1] = -w[i] // set y-coordinate to w[i]
      neglinesegs[i * 3 + 2] = z[i] // set z-coordinate to z[i]
    }
    return [pluslinesegs, neglinesegs]
  }

  function calculateMaxY(waist: number, wavelength: number) {
    const zrj = (Math.PI * waist * waist * n) / (wavelength / 1000)
    let startY = waist * Math.sqrt(1 + (zstart / zrj) * (zstart / zrj))
    let endY = waist * Math.sqrt(1 + (zend / zrj) * (zend / zrj))
    maxY = Math.max(startY, endY)
    maxY = setAxisLimits(0, maxY, zinc)[1] // round up to nearest logical chart scale
    maxY = wasitMaxScale // override for now
    return maxY
  }

  // generate grid lines
  // *****************************
  let gridLines = genGridLines(xoffset, gridWidth, gridHeight, 5)
  // *****************************

  // line data to plot beam trajectory
  $: data = genLineSegs(waistvalue, wavelvalue)

  // location of waist on grid in gridunits
  $: zWaistGridUnits = toGrid(0, zScale)

  // divergence angle theta in radians
  $: theta = wavelvalue / (Math.PI * waistvalue * 1000)

  // line data to plot the far field divergence angle line
  $: slopeLines = [
    new Vector3(xoffset, 0, zWaistGridUnits),
    new Vector3(
      xoffset,
      (theta * zend * gridHeight) / calculateMaxY(waistvalue, wavelvalue),
      gridWidth
    ),
  ]

  function ScaleZValue(z: number) {
    return ((z - zstart) * scaleZ) / (zend - zstart) - scaleZ / 2
    //(i - zstart) * scaleZ) / (zend - zstart) - scaleZ / 2
  }

  function ScaleWValue(z: number) {
    return (z * scaleY) / 2 / maxY
  }

  // line data to plot the far field divergence angle line
  $: WZLines = [
    new Vector3(xoffset, 0, ScaleZValue(zr * 1000)),
    new Vector3(xoffset, ScaleWValue(waistvalue * Math.sqrt(2)), ScaleZValue(zr * 1000)),
  ]

  $: ZrLines = [
    new Vector3(xoffset, ScaleWValue(waistvalue * Math.sqrt(2)), ScaleZValue(0)),
    new Vector3(xoffset, ScaleWValue(waistvalue * Math.sqrt(2)), ScaleZValue(zr * 1000)),
  ]

  $: W0Lines = [
    new Vector3(xoffset, ScaleWValue(0), ScaleZValue(0)),
    new Vector3(xoffset, ScaleWValue(waistvalue), ScaleZValue(0)),
  ]

  // calculation of rotation for the divergence angle text
  $: divAngleTextRotation =
    (theta * zend * gridHeight) /
    calculateMaxY(waistvalue, wavelvalue) /
    (gridWidth - zWaistGridUnits) /
    2

  const thetaLabelZOffset = 100

  $: divAngleGridUnits =
    (theta * zend * gridHeight) /
    calculateMaxY(waistvalue, wavelvalue) /
    (gridWidth - zWaistGridUnits)

  $: divergAngleLabelYOffset = (thetaLabelZOffset * divAngleGridUnits) / 2
</script>

<div class="wrapper">
  {#if showRangeSliders}
    <div class="absolute ml-24 mt-5 flex flex-row">
      <div class="ml-5">
        <RangeSlider
          name="waist-slider"
          accent="accent-surface-900 dark:accent-surface-300"
          bind:value={waistvalue}
          min={waistmin}
          max={waistmax}
          step={waisttic}
        >
          <div class="flex items-center justify-between">
            <div class="text-sm font-bold">Waist(mm)</div>
            <div class="text-sm font-bold">{waistvalue} / {waistmax}</div>
          </div>
        </RangeSlider>
      </div>

      <div class="ml-5">
        <RangeSlider
          name="wavelength-slider"
          accent="accent-surface-900 dark:accent-surface-300"
          bind:value={wavelvalue}
          min={wavelmin}
          max={wavelmax}
          step={waveltic}
        >
          <div class="flex items-center justify-between">
            <div class="text-sm font-bold">λ(μm)</div>
            <div class="text-sm font-bold">{wavelvalue} / {wavelmax}</div>
          </div>
        </RangeSlider>
      </div>
    </div>
  {/if}

  <Canvas>
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
      <OrbitControls enableZoom enableRotate={true} enablePan={true} />
    </T.PerspectiveCamera>

    <!-- Add Lights -->
    <T.DirectionalLight position={[-100, 0, 0]} intensity={0.75} />
    <T.DirectionalLight position={[0, 100, 0]} intensity={0.2} />
    <T.DirectionalLight position={[0, -100, 0]} intensity={0.2} />
    <T.AmbientLight intensity={0.5} />

    <!-- plus & negative waist profile lines -->
    <T.Mesh>
      <T
        is={Line2}
        geometry={genLineSegment(data[0])}
        material={new LineMaterial({ color: 0x0000ff, linewidth: 0.01 })}
      />
      <T
        is={Line2}
        geometry={genLineSegment(data[1])}
        material={new LineMaterial({ color: 0x0000ff, linewidth: 0.01 })}
      />
    </T.Mesh>

    <!-- background plane - in this case along Y-Z aaxis -->
    <T.Mesh position={[0, 0, 0]} rotation={[0, 0, 0]} visible={false}>
      <T.BoxGeometry args={[1, scaleY + 50, scaleZ + 50]} />
      <T.MeshStandardMaterial side={DoubleSide} color={'white'} transparent opacity={1} />
    </T.Mesh>

    <!-- add background grid lines -->
    <T.Mesh visible={true}>
      {#each gridLines as line}
        <T
          is={Line2}
          geometry={genLineSegment(line)}
          material={new LineMaterial({ color: 0x00aaaa, linewidth: 0.001 })}
        />
      {/each}
      <T
        is={Line2}
        geometry={genLineSegment(gridLines[0])}
        material={new LineMaterial({ color: 0x000000, linewidth: 0.002 })}
      />
    </T.Mesh>

    <T.Group visible={false}>
      <!-- add axis label for Ymax at Xmax -->
      <T.Mesh position={[xoffset, gridHeight, gridWidth]} rotation={[0, -Math.PI / 2, 0]}>
        <Text
          text={maxY.toFixed(2) + ' mm'}
          color={0x000000}
          fontSize={8}
          anchorX={'center'}
          anchorY={'bottom'}
        />
      </T.Mesh>

      <!-- add axis label for (-)Ymin at Xmax -->
      <T.Mesh position={[xoffset, -gridHeight, gridWidth]} rotation.y={-Math.PI / 2}>
        <Text
          text={'-' + maxY.toFixed(2) + ' mm'}
          color={0x000000}
          fontSize={8}
          anchorX={'center'}
          anchorY={'top'}
        />
      </T.Mesh>

      <!-- add axis label for Ymax at X0 -->
      <T.Mesh position={[xoffset, scaleY0, zWaistGridUnits]} rotation.y={-Math.PI / 2}>
        <Text
          text={waistvalue.toFixed(2) + ' mm'}
          color={0x000000}
          fontSize={8}
          anchorX={'center'}
          anchorY={'top'}
        />
      </T.Mesh>

      <!-- add axis label for (-)Ymin at X0 -->
      <T.Mesh position={[xoffset, -scaleY0, zWaistGridUnits]} rotation.y={-Math.PI / 2}>
        <Text
          text={'-' + waistvalue.toFixed(2) + ' mm'}
          color={0x000000}
          fontSize={8}
          anchorX={'center'}
          anchorY={'bottom'}
        />
      </T.Mesh>

      <!-- z0 Distance Label -->
      <T.Mesh position={[xoffset, 0, -gridWidth]} rotation.y={-Math.PI / 2}>
        <Text
          text={'z = ' + zstart.toFixed(0) + ' mm -->'}
          color={0x000000}
          fontSize={8}
          anchorX={'left'}
          anchorY={'bottom'}
        />
      </T.Mesh>

      <!-- Max z Distance Label -->
      <T.Mesh position={[xoffset, 0, gridWidth]} rotation.y={-Math.PI / 2}>
        <Text
          text={'z = ' + zend.toFixed(0) + ' mm -->'}
          color={0x000000}
          fontSize={8}
          anchorX={'right'}
          anchorY={'bottom'}
        />
      </T.Mesh>
    </T.Group>

    <!-- Title -->
    <T.Mesh position={[xoffset, -gridHeight, -gridWidth]} rotation.y={-Math.PI / 2} visible={false}>
      <Text
        text={'Gaussian Beam Profile over Distance'}
        color={0x000000}
        fontSize={10}
        anchorX={'left'}
        anchorY={'bottom'}
      />
    </T.Mesh>

    <!-- Divergence line and angle Label -->
    {#if showDivergence}
      <Aline
        vs={slopeLines}
        arrow={2}
        label={'Divergence Angle: Theta'}
        textAX={'center'}
        textAY={'top'}
        setTextAngle={true}
      />
    {/if}

    <!-- line and label W0 -->
    <Aline vs={W0Lines} arrow={2} label={'W0'} />

    <!-- line and label W0 -->
    <Aline vs={WZLines} arrow={2} label={'Wz = W0 * Sqrt(2)'} />

    <!-- line and label Zr -->
    <Aline
      vs={ZrLines}
      arrow={3}
      label={'Rayleigh Length: Zr'}
      textAX={'center'}
      textAY={'bottom'}
    />
  </Canvas>
</div>
