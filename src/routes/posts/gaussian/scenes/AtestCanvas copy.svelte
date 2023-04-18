<script lang="ts">
  import { OrbitControls } from '@threlte/extras'
  import { Canvas, T } from '@threlte/core'
  import { Text } from '@threlte/extras'
  import * as THREE from 'three'
  import { genGridLines, genLineSegment, setAxisLimits } from '$lib/mathUtils'
  import Coords from '$lib/Coords.svelte'
  import { Line2 } from 'three/examples/jsm/lines/Line2'
  import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial'

  const showCoords = false

  const curve = new THREE.SplineCurve([
    new THREE.Vector2(-10, 0),
    new THREE.Vector2(-5, 5),
    new THREE.Vector2(0, 0),
    new THREE.Vector2(5, -5),
    new THREE.Vector2(9, -1),
    new THREE.Vector2(9.4, -0.5),
    new THREE.Vector2(9.6, -0.3),
    new THREE.Vector2(10, -0.1),
    new THREE.Vector2(11, -0.05),
    new THREE.Vector2(11.5, 0),
    new THREE.Vector2(12, 0),
  ])

  const points = curve.getPoints(101)
  const geometry = new THREE.BufferGeometry().setFromPoints(points)
  const material = new THREE.LineDashedMaterial({ color: 0xff0000 })
</script>

<div class="wrapper">
  <Canvas>
    <T.Mesh visible={true}>
      <T.Line {geometry} {material} />
    </T.Mesh>

    {#if showCoords}
      <Coords locXYZ={new THREE.Vector3(0, 0, 0)} />
    {/if}

    <!-- Add Camera -->
    <T.PerspectiveCamera
      makeDefault
      position={[0, 0, 20]}
      on:create={({ ref }) => {
        ref.lookAt(0, 0, 0)
      }}
    >
      <OrbitControls enableZoom enableRotate enablePan />
    </T.PerspectiveCamera>

    <!-- Add Lights -->
    <T.DirectionalLight position={[-100, 0, 0]} intensity={0.75} />
    <T.DirectionalLight position={[0, 100, 0]} intensity={0.2} />
    <T.DirectionalLight position={[0, -100, 0]} intensity={0.2} />
    <T.AmbientLight intensity={0.5} />
  </Canvas>
</div>
