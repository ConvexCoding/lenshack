<script lang="ts">
  import { T } from '@threlte/core'
  import { Text } from '@threlte/extras'
  import { Line2 } from 'three/examples/jsm/lines/Line2.js'
  import { LineBasicMaterial, Vector3 } from 'three'
  import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry'
  import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial'

  export let locXYZ: Vector3 = new Vector3(0, 0, 0)
  export let lengths: number[] = [0, 20, 0, 20, 0, 20]

  export let showX = true
  export let showY = true
  export let showZ = true

  export let colorX = 0xff0000
  export let colorY = 0x00ff00
  export let colorZ = 0x0000ff

  const lineLength = Math.min(lengths[1], 20)

  // some arbitary scaling going on here
  const labelOffset = (2 * lineLength) / 15
  const coneArgs = [(0.8 * lineLength) / 15, (3 * lineLength) / 15, 32]
  const fontSize = (3 * lineLength) / 15

  let ptsX: Vector3[] = []
  ptsX.push(new Vector3(lengths[0], 0, 0))
  ptsX.push(new Vector3(lengths[1] + locXYZ.x, locXYZ.y, locXYZ.z))

  let ptsY: Vector3[] = []
  ptsY.push(new Vector3(0, lengths[2], 0))
  ptsY.push(new Vector3(locXYZ.x, lengths[3] + locXYZ.y, locXYZ.z))

  let ptsZ: Vector3[] = []
  ptsZ.push(new Vector3(0, 0, lengths[4]))
  ptsZ.push(new Vector3(locXYZ.x, locXYZ.y, lengths[5] + locXYZ.z))

  const geoLineX = new LineGeometry()
  const geoLineY = new LineGeometry()
  const geoLineZ = new LineGeometry()
  geoLineX.setPositions(new Float32Array([lengths[0], 0, 0, lengths[1], 0, 0]))
  geoLineY.setPositions(new Float32Array([0, lengths[2], 0, 0, lengths[3], 0]))
  geoLineZ.setPositions(new Float32Array([0, 0, lengths[4], 0, 0, lengths[5]]))

  const lw = 0.005
  let matLineX = new LineMaterial({ color: colorX, linewidth: lw })
  let matLineY = new LineMaterial({ color: colorY, linewidth: lw })
  let matLineZ = new LineMaterial({ color: colorZ, linewidth: lw })
</script>

<!-- Do all lines within one mesh -->
<T.Mesh position={[locXYZ.x, locXYZ.y, locXYZ.z]}>
  {#if showX}
    <T is={Line2} geometry={geoLineX} material={matLineX} />
  {/if}
  {#if showY}
    <T is={Line2} geometry={geoLineY} material={matLineY} />
  {/if}
  {#if showZ}
    <T is={Line2} geometry={geoLineZ} material={matLineZ} />
  {/if}
</T.Mesh>

{#if showX}
  <!-- Add cone and axis label for X Axis -->
  <T.Mesh position={ptsX[1].toArray()} rotation={[0, 0, -Math.PI / 2]} castShadow={true} let:ref>
    <T.ConeGeometry args={coneArgs} />
    <T.MeshStandardMaterial color={'red'} />
  </T.Mesh>

  <T.Mesh
    position={[lengths[1] + locXYZ.x + labelOffset, locXYZ.y, locXYZ.z]}
    castShadow={true}
    let:ref
  >
    <Text text={'X'} color={colorX} {fontSize} anchorX={'left'} anchorY={'middle'} />
  </T.Mesh>
{/if}

{#if showY}
  <!-- Add cone and axis label for Y Axis -->
  <T.Mesh position={ptsY[1].toArray()} castShadow let:ref>
    <T.ConeGeometry args={coneArgs} />
    <T.MeshStandardMaterial color={'green'} />
  </T.Mesh>

  <T.Mesh
    position={[locXYZ.x, lengths[3] + locXYZ.y + labelOffset, locXYZ.z]}
    castShadow={true}
    let:ref
  >
    <Text text={'Y'} color={colorY} {fontSize} anchorX={'center'} anchorY={'bottom-baseline'} />
  </T.Mesh>
{/if}

{#if showZ}
  <!-- Add cone and axis label for Z Axis -->
  <T.Mesh position={ptsZ[1].toArray()} rotation={[Math.PI / 2, 0, 0]} castShadow={true} let:ref>
    <T.ConeGeometry args={coneArgs} />
    <T.MeshStandardMaterial color={'blue'} />
  </T.Mesh>

  <T.Mesh
    position={[locXYZ.x, locXYZ.y, lengths[5] + locXYZ.z + labelOffset]}
    rotation={[0, Math.PI, 0]}
    castShadow={true}
    let:ref
  >
    <Text text={'Z'} color={colorZ} {fontSize} anchorX={'center'} anchorY={'middle'} />
  </T.Mesh>
{/if}
