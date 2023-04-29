<script lang="ts">
  import { dev } from '$app/environment'
  import InlineEdit from '$lib/InlineEdit.svelte'
  import InlineEdit2 from '$lib/InlineEdit2.svelte'

  export let equationTextSize = 'text-xl'
  const debug = dev

  let w0 = ''
  let Z = ''
  let Zr = ''

  $: hasValues = w0 || Z || Zr

  function testEquation() {
    w0 = '0.5'
    Z = '1000'
    Zr = '577.35'
  }

  function solveEquation(w0: string, Z: string, Zr: string) {
    const W0Val = parseFloat(w0)
    const ZVal = parseFloat(Z)
    const ZrVal = parseFloat(Zr)

    if (isNaN(W0Val) || isNaN(ZVal) || isNaN(ZrVal)) {
      return
    }

    if (W0Val === 0) return

    const Wz = W0Val * Math.sqrt(1 + (ZVal / ZrVal) ** 2)
    return `${Wz.toFixed(3)} mm`
  }

  $: Wz = solveEquation(w0, Z, Zr)
</script>

<div class="card relative flex flex-1 justify-center gap-4 p-0 md:py-0 {equationTextSize}">
  <math xmlns="http://www.w3.org/1998/Math/MathML">
    <mrow>
      <mi>w(z)</mi>
      <mo> = </mo>
      <msub>
        <mi>
          <InlineEdit bind:value={w0} placeholder="w₀" />
        </mi>
      </msub>
      <msqrt>
        <mrow>
          <mn>1</mn>
          <mo>+</mo>
          <msup>
            <mrow>
              <mo>(</mo>
              <mrow>
                <mfrac>
                  <mi><InlineEdit bind:value={Z} placeholder="Z" /></mi>
                  <mi><InlineEdit bind:value={Zr} placeholder="Zr" /></mi>
                </mfrac>
              </mrow>
              <mo>)</mo>
            </mrow>

            <mi>2</mi>
          </msup>
        </mrow>
      </msqrt>
      {#if Wz}
        <mi> = {Wz} </mi>
      {/if}
    </mrow>
  </math>

  {#if hasValues}
    <button
      class="btn btn-sm variant-ghost-primary absolute right-2 top-2"
      on:click={() => (w0 = Z = Zr = '')}
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
