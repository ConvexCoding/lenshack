<script>
  import { Canvas, T } from '@threlte/core'
  import { Vector3 } from 'three'
  import * as THREE from 'three'
  import Coords from '$lib/Coords.svelte'
  import { CatmullRomCurve3 } from 'three'
  import { OrbitControls } from '@threlte/extras'

  export let showCoords = false

  let path = new CatmullRomCurve3([
    new THREE.Vector3(-10, 0, 0),
    new THREE.Vector3(-5, 5, 0),
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(5, -5, 0),
    new THREE.Vector3(9, -1, 0),
    new THREE.Vector3(9.4, -0.5, 0),
    new THREE.Vector3(9.6, -0.3, 0),
    new THREE.Vector3(10, -0.1, 0),
    new THREE.Vector3(11, -0.05, 0),
    new THREE.Vector3(11.5, 0, 0),
    new THREE.Vector3(12, 0, 0),
  ])
  const geometry = new THREE.TubeGeometry(path, 100, 1, 20, false)
  const material = new THREE.MeshPhongMaterial({ color: 0xffffff })
</script>

<div class="wrapper">
  <Canvas>
    {#if showCoords}
      <Coords locXYZ={new Vector3(0, 0, 0)} />
    {/if}

    <T.PerspectiveCamera
      makeDefault
      position={[0, 0, 30]}
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

    <T.Mesh {geometry}>
      <T.MeshPhongMaterial color={'red'} shinness={100} opacity={0.8} transparent side={2} />
    </T.Mesh>
  </Canvas>
</div>
