<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->
<script lang="ts">
  import { dev } from '$app/environment'
  import InlineEdit from '$lib/InlineEdit.svelte'

  export let equationTextSize = 'text-xl'
  const debug = dev

  let D = ''
  let f = ''
  let lambda = ''

  $: hasValues = D || f || lambda

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

<div class="{equationTextSize} card relative flex flex-1 justify-center gap-4 p-6 md:py-10">
  <div class="flex items-center font-serif">
    <span class:bg-green-300={debug} class="mr-3"> ss = </span>

    <div class="flex flex-col">
      <div class="flex gap-1.5">
        <span> 4 </span>
        <span> · </span>
        <InlineEdit bind:value={lambda} placeholder="λ" />
        <span> · </span>
        <InlineEdit bind:value={f} placeholder="f" />
      </div>

      <hr class="m-1 !border-t-2 !border-black/60" />

      <div class="flex justify-center gap-1.5">
        <span> π </span>
        <span> · </span>
        <InlineEdit bind:value={D} placeholder="D" />
      </div>
    </div>

    {#if ss}
      <span class="ml-3 mr-3" class:bg-yellow-300={debug}>
        = {ss}
      </span>
    {/if}
  </div>

  {#if hasValues}
    <button
      class="btn btn-sm variant-ghost-primary absolute right-2 top-2"
      on:click={() => (D = f = lambda = '')}
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
