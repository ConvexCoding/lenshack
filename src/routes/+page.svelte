<script lang="ts">
  import { Canvas } from '@threlte/core'
  import { MirroredRepeatWrapping } from 'three'
  import Gauss from './Equations/Gauss.svelte'
  import GaussProp from './Equations/GaussProp.svelte'
  import Rayleigh from './Equations/Rayleigh.svelte'
  import BeamProp from './Scenes/BeamProp.svelte'
  import Scene from './Scenes/Scene.svelte'
  import Scene1 from './Scenes/Scene1.svelte'
  import Scene2 from './Scenes/Scene2.svelte'
  import Scene3 from './Scenes/Scene3.svelte'
</script>

<div class="outercontainer flex h-full flex-col overflow-y-auto pb-10">
  <h1 class="title flex justify-center">Gaussian Laser Beam Blog</h1>
  <br />
  <h3 class="flex justify-center text-orange-500">Gaussian Beams</h3>
  <h3 class="flex justify-center text-orange-500">&</h3>
  <h3 class="flex justify-center text-orange-500">
    How They Are Focused by the Ideal Laser Lenses
  </h3>
  <br />
  <br />
  <div class="ml-5 mr-5 border-blue-500">
    <p>
      Laser beams in general have been made popular to the general public by many of the science
      fiction movies of the past decades. In the real world one the most common types of laser beams
      is the Gaussian laser beam. Gaussian laser beams are a common tool in the laboratory and in
      industry. They are used in a variety of applications from eye surgery, laser drilling of
      circuit boards, and laser cutting of almost all know materials. Gaussian beam propagate (like
      all photons) in a straight line.
    </p>
    <br />
    <p>
      Although laser beams are commonly thought to be collimated light, this is not the case. The
      beams propagate according to the following equation:
    </p>
    <br />
    <GaussProp />
    <br />
    <p>
      In this equation w(z) is the beam waist (or radius) at any given distance z - the distance the
      laser beam travels along it's optic axis. The value z<sub>r</sub>
      is the Rayleigh Range, which is a constant for a gaussian laser beam of wavelength, λ, and initial
      beam radius of w<sub>0</sub>. The equation for the Rayleigh Range constant is:
    </p>
    <br />
    <Rayleigh />
    <br />
    Maybe graphic here showing prop of laser beam based on starting waist.
    <br />
    next graphic show laser beam through Lenses and some text about Focused
    <br />

    <Gauss />
  </div>
  <br />
  <br />
  <div class="container h-2/3 w-2/3 border-8 border-yellow-500 bg-white">
    <Canvas>
      <Scene3 />
    </Canvas>
  </div>
  <br />
  more text
  <br />
  <br />
  <div class="container h-2/3 w-2/3 border-8 border-red-500 bg-white">
    <Canvas>
      <Scene1 />
    </Canvas>
  </div>
  <br />
  <br />
  <div class="container h-2/3 w-2/3 border-8 border-red-500 bg-white">
    <Canvas>
      <BeamProp />
    </Canvas>
  </div>
</div>
