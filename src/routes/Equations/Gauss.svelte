<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->
<script lang="ts">
  import InlineEdit from '../../lib/InlineEdit.svelte'

  export let equationTextSize = 'text-xl'
  const debug = import.meta.env.DEV

  const etitle = 'Gaussian Beam Calculator (ss in μm at the 1/e² power points)'
  const egraphic = './gausscalc.webp'

  let D = ''
  let f = ''
  let lambda = ''

  const notes = [
    '(1) f: focal length of lens',
    '(2) D: gaussian beam dia at 1/e² pwr pts',
    '(3) λ: wavelength of light in units of μm',
    '(4) f & D must be in the same units',
  ]

  function resetEquation() {
    D = ''
    f = ''
    lambda = ''
  }
  function testEquation() {
    D = '15'
    f = '100'
    lambda = '1.07'
  }

  function solveEquation(D: string, f: string, lambda: string) {
    const DVal = parseFloat(D)
    const fVal = parseFloat(f)
    const lambdaVal = parseFloat(lambda)

    if (isNaN(DVal) || isNaN(fVal) || isNaN(lambdaVal)) {
      return
    }

    if (DVal === 0) return

    const ssVal = (4 * lambdaVal * fVal) / (Math.PI * DVal)
    return `${ssVal.toFixed(1)} μm`
  }

  $: ss = solveEquation(D, f, lambda)
</script>

<!-- Scale all drawings to have a width of 425 pixels -->

<!-- Equation 1 Gauss Equation -->
<div class="container mt-10 flex items-center justify-evenly">
  <h4>{etitle}</h4>
</div>
<div class="container mt-5 flex items-center justify-evenly gap-2">
  <!-- Equation Section -->
  <div>
    <div class={'container flex flex-col items-center ' + equationTextSize}>
      <!-- central div for equation + button - not sure why two divs around block -->
      <div class="math-text card variant-filled">
        <!-- block for equation -->
        <div class="mb-5 ml-10 mr-10 mt-5 flex items-center">
          <div class:bg-green-300={debug} class="mr-3">ss =</div>
          <!--
          <div class="flex flex-col">
          <div class:bg-green-800={debug} class="flex flex-row h-48 justify-center items-end">
        -->
          <div class="flex flex-col">
            <div class="flex flex-row justify-center">
              4 · <InlineEdit bind:value={lambda} placeholder="λ" />
              · <InlineEdit bind:value={f} placeholder="f" />
            </div>
            <hr class="m-1 !border-t-2" />
            <div class="flex flex-row justify-center">
              π · <InlineEdit bind:value={D} placeholder="D" />
            </div>
          </div>

          {#if ss}
            <div class="ml-3 mr-3">=</div>
            <div class:bg-yellow-300={debug}>{ss}</div>
          {/if}
        </div>
        <!-- block for equation -->
        <div class="mb-2 flex justify-center gap-2">
          <button
            class="btn btn-sm border-4 border-red-700 bg-yellow-100 text-black"
            on:click={resetEquation}>Reset</button
          >
          {#if debug}
            <button
              class="btn btn-sm border-4 border-red-700 bg-yellow-100 text-black"
              on:click={testEquation}>Test</button
            >
          {/if}
        </div>
        <!-- central div for equation + button - not sure why two divs around block -->
      </div>
    </div>
  </div>
  <!-- Notes Section -->
  <div>
    <p>Notes:</p>
    {#each notes as note}
      <p class="ml-3">{note}</p>
    {/each}
  </div>
</div>
