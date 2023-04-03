<script lang="ts">
  import { Canvas } from '@threlte/core'
  //import Scene from './Scene.svelte';
  import Scene1 from './Scene1.svelte'
  import Scene2 from './Scene2.svelte'
  import Scene3 from './Scene3.svelte'
</script>

<div class="outercontainer flex h-full flex-col overflow-y-auto pb-10">
  <h1 class="title">Welcome to Skeleton!</h1>
  <h2>LLS #6: Evaluating Lens Design</h2>
  <br />
  When designing a lens or choosing a lens, it's important to know if the lens is good enough for your
  application. Having a suite of analysis types is an important part of this process. In this post we
  will cover five analysis types that can be used to evaluate lens performance.
  <br />
  <br />
  <div class="container h-2/3 w-2/3 border-8 border-yellow-500 bg-white">
    <Canvas>
      <Scene3 />
    </Canvas>
  </div>
  <br />
  Ray Tracing Arguably one of the simplest forms of performance analysis is done by looking at the ray
  trace through a lens. It can reveal, in rather crude terms, if the lens is focusing the rays to a point
  (assuming we are evaluating a simple focusing lens). Figure 1 shows ray traces for two short focal
  length lenses. Figure 1a shows a simple plano convex lens and Figure 1b shows this same lens but with
  aspheric terms to correct spherical aberrations. Note how the rays in 1a fail to converge to a single
  point, but the rays in 1b do.
  <br />
  <br />
  <div class="container h-2/3 w-2/3 border-8 border-red-500 bg-white">
    <Canvas>
      <Scene1 />
    </Canvas>
  </div>
</div>
