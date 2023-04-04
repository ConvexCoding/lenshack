<script lang="ts">
  import { OrbitControls } from '@threlte/extras'
  import { T } from '@threlte/core'
  import { LatheGeometry } from 'three'
  import { xyToVector, generateLatheColors } from '$lib/mathUtils'

  const z: number[] = []
  const w: number[] = []

  let w0 = 0.1
  let λ = 1.0
  let n = 1.0
  let zr = (Math.PI * w0 * w0 * n) / λ

  for (let i = 0; i < 50; i += 1) {
    const wz = w0 * Math.sqrt(1 + (i / zr) * (i / zr))
    z.push(i)
    w.push(w0)
  }
  const yMaxColor = Math.max(...w)
  const data = xyToVector(z, w)
  const image = new LatheGeometry(data, 51, 0, Math.PI * 2)
</script>

<T.PerspectiveCamera
  makeDefault
  position={[300, 0, 0]}
  on:create={({ ref }) => {
    ref.lookAt(0, 0, 250)
  }}
>
  <OrbitControls enableDamping enableZoom enableRotate enablePan />
</T.PerspectiveCamera>

<T.DirectionalLight position={[-100, 0, 0]} />

<T.Mesh geometry={image} position={[0, 0, 0]} rotation={[0, 0, 0]} castShadow={true} let:ref>
  <T.MeshPhongMaterial color={'red'} opacity={0.5} transparent side={2} />
</T.Mesh>
