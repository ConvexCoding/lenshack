<script lang="ts">
  import { Canvas, T } from '@threlte/core'
  import { Vector3 } from 'three'
  import * as THREE from 'three'
  import Coords from '$lib/Coords.svelte'
  import { CatmullRomCurve3 } from 'three'
  import { OrbitControls } from '@threlte/extras'

  export let showCoords = false

  let spiral: Vector3[] = []
  let x = 0
  let r = -10
  let extension = 30
  spiral.push(new Vector3(15, r, 0))
  for (let i = 0; i <= Math.PI * 2 * 3; i += Math.PI / 6) {
    x += 0.25
    spiral.push(new Vector3(r * Math.sin(i), r * Math.cos(i), x))
  }
  spiral.push(new Vector3(-30, r, x))

  let scalex = 1
  let scaley = 0.6

  let nozzle: THREE.Vector2[] = []
  nozzle.push(new THREE.Vector2(scaley * 0, scalex * 0))
  nozzle.push(new THREE.Vector2(scaley * 0.75, scalex * 0))
  nozzle.push(new THREE.Vector2(scaley * 1, scalex * 2))
  nozzle.push(new THREE.Vector2(scaley * 2, scalex * 2))
  nozzle.push(new THREE.Vector2(scaley * 2, scalex * 4))
  nozzle.push(new THREE.Vector2(scaley * 0.6, scalex * 4))
  nozzle.push(new THREE.Vector2(scaley * 0.6, scalex * 6))
  nozzle.push(new THREE.Vector2(scaley * 0, scalex * 6))

  let path = new CatmullRomCurve3(spiral)

  const geometry = new THREE.TubeGeometry(path, 100, 0.5, 20, false)
  const material = new THREE.MeshPhongMaterial({ color: 0xffffff })

  const geolathe = new THREE.LatheGeometry(nozzle, 20)
</script>

<div class="wrapper">
  <Canvas>
    {#if showCoords}
      <Coords locXYZ={new Vector3(0, 0, 0)} />
    {/if}

    <T.PerspectiveCamera
      makeDefault
      position={[20, 10, -35]}
      on:create={({ ref }) => {
        ref.lookAt(0, 0, 0)
      }}
    >
      <OrbitControls enableDamping enableZoom enablePan />
    </T.PerspectiveCamera>

    <T.DirectionalLight position={[0, 0, 100]} intensity={0.5} />
    <T.DirectionalLight position={[0, 100, 0]} intensity={0.2} />
    <T.DirectionalLight position={[0, -100, 0]} intensity={0.2} />
    <T.AmbientLight intensity={0.2} />

    <!-- Fiber Laser -->
    <T.Mesh {geometry}>
      <T.MeshPhongMaterial color={'yellow'} shinness={100} opacity={0.8} transparent side={2} />
    </T.Mesh>

    <!-- Fiber Laser Pump -->
    <T.Mesh
      position={[
        spiral[spiral.length - 1].x - 7.5,
        spiral[spiral.length - 1].y,
        spiral[spiral.length - 1].z,
      ]}
    >
      <T.BoxGeometry args={[15, 5, 5]} />
      <T.MeshPhongMaterial color={'orange'} />
    </T.Mesh>

    <!-- Simple Fiber Laser Nozzle -->
    <T.Mesh
      position={[spiral[0].x, spiral[0].y, spiral[0].z]}
      rotation.z={-Math.PI / 2}
      visible={false}
    >
      <T.CylinderGeometry args={[1.2, 1.6, 5]} />
      <T.MeshPhongMaterial color={'green'} />
    </T.Mesh>

    <!-- Fiber Tip Lathe -->
    <T.Mesh
      geometry={geolathe}
      position={[spiral[0].x, spiral[0].y, spiral[0].z]}
      rotation.z={-Math.PI / 2}
    >
      <T.MeshPhongMaterial color={'lightblue'} />
    </T.Mesh>
  </Canvas>
</div>
