<script lang="ts">
  import { OrbitControls } from '@threlte/extras'
  import { T } from '@threlte/core'
  import { DoubleSide, LatheGeometry, Vector3 } from 'three'
  import { xyToVector } from '$lib/mathUtils'
  import Coords from '$lib/Coords.svelte'

  const z: number[] = []
  const w: number[] = []

  export let w0 = 1
  export let λ = 0.01
  export let n = 1

  let zr = (Math.PI * w0 * w0 * n) / λ

  let maxz = 1000
  let zinc = 5
  let maxW = w0 * Math.sqrt(1 + (maxz / zr) * (maxz / zr))

  let scaleZ = 200
  let scaleW = 50

  z.push(-scaleZ / 2)
  w.push(0)
  for (let i = 0; i <= maxz; i += zinc) {
    z.push((i * scaleZ) / maxz - scaleZ / 2)
    const wz = w0 * Math.sqrt(1 + (i / zr) * (i / zr))
    w.push((wz * scaleW) / maxW)
  }
  z.push(scaleZ / 2)
  w.push(0)

  const data = xyToVector(w, z)
  const image = new LatheGeometry(data, 51, 0, Math.PI * 2)
</script>

<Coords locXYZ={new Vector3(0, 0, -scaleZ / 2 - 40)} />

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

<T.Mesh
  geometry={image}
  position={[0, 0, 0]}
  rotation={[Math.PI / 2, 0, 0]}
  castShadow={true}
  let:ref
>
  <T.MeshPhongMaterial color={'red'} shinness={100} opacity={0.9} transparent side={2} />
</T.Mesh>

<!-- background planes
<T.Mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
  <T.BoxGeometry args={[10, 20, 40]} />
  <T.MeshStandardMaterial side={DoubleSide} color={'yellow'} transparent opacity={1} />
</T.Mesh>
-->
