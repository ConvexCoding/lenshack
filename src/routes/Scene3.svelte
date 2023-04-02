<script>
	import { OrbitControls } from '@threlte/extras';
	import { T } from '@threlte/core';
</script>

<T.PerspectiveCamera
	makeDefault
	position={[10, 10, 10]}
	on:create={({ ref }) => {
		ref.lookAt(0, 1, 0);
	}}
>
	<OrbitControls enableDamping enableZoom enableRotate enablePan />
</T.PerspectiveCamera>

<T.DirectionalLight position={[3, 10, 7]} />

<T.Mesh position.y={1}>
	<T.BoxGeometry args={[2, 4, 2]} />
	<T.MeshPhongMaterial color="blue" />
</T.Mesh>
