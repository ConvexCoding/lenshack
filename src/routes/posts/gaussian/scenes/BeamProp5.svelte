<script lang="ts">
  import { Canvas, T } from '@threlte/core'
  import Beam5Scene from './Beam5Scene.svelte'

  export let w0 = 1
  export let zstart = 0
  export let zend = 2000
  export let zinc = 2
  export let wasitMaxScale = 15.0
</script>

<div class="wrapper">
  <Canvas>
    <Beam5Scene {w0} {wasitMaxScale} {zstart} {zend} {zinc} />
  </Canvas>
</div>
