<script lang="ts">
  import { dev } from '$app/environment'
  import InlineEdit from '$lib/InlineEdit.svelte'

  export let equationTextSize = 'text-xl'
  const debug = dev

  let I0 = ''
  let r = ''
  let w0 = ''

  $: hasValues = I0 || r || w0

  function testEquation() {
    I0 = '1.0'
    r = '0.75'
    w0 = '0.75'
  }

  function solveEquation(I0: string, r: string, w0: string) {
    const I0Val = parseFloat(I0)
    const rVal = parseFloat(r)
    const w0Val = parseFloat(w0)

    if (isNaN(I0Val) || isNaN(rVal) || isNaN(w0Val)) {
      return
    }

    if (w0Val === 0) return

    const Wz = I0Val * Math.exp(-2 * (rVal / w0Val) ** 2)
    return `${Wz.toFixed(3)} watts`
  }

  $: Wz = solveEquation(I0, r, w0)
</script>

<div class="card relative flex flex-1 justify-center gap-4 p-0 md:py-0 {equationTextSize}">
  <math xmlns="http://www.w3.org/1998/Math/MathML">
    <mi>I</mi>
    <mo>=</mo>
    <mi><InlineEdit bind:value={I0} placeholder="I0" /></mi>
    <mo>·</mo>

    <msup>
      <mi>&ExponentialE;</mi>
      <mrow>
        <mrow>
          <mo>(</mo>
          <mrow>
            <mi>-</mi>
            <mi>2</mi>
            <mfrac>
              <msup><mi><InlineEdit bind:value={r} placeholder="r" /></mi><mn>2</mn></msup>
              <msup><mi><InlineEdit bind:value={w0} placeholder="w" /></mi> <mn> 2 </mn></msup>
            </mfrac>
          </mrow>
          <mo>)</mo>
        </mrow>
      </mrow>
    </msup>
    {#if Wz}
      <mi> = {Wz} </mi>
    {/if}
  </math>

  {#if hasValues}
    <button
      class="btn btn-sm variant-ghost-primary absolute right-2 top-2"
      on:click={() => (I0 = r = w0 = '')}
    >
      Reset
    </button>
  {/if}

  {#if debug}
    <button
      class="btn btn-sm variant-ghost-primary absolute bottom-2 right-2"
      on:click={testEquation}
    >
      Test
    </button>
  {/if}
</div>
