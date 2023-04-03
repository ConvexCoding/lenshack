<script>
  import { T } from '@threlte/core';
</script>

<T.PerspectiveCamera
  makeDefault
  position={[5, 5, 5]}
  on:create={({ ref }) => {
    ref.lookAt(0, 1, 0);
  }}
/>

<T.Mesh position.y={1}>
  <T.BoxGeometry args={[2, 2, 2]} />
  <T.MeshBasicMaterial color={'red'} />
</T.Mesh>
