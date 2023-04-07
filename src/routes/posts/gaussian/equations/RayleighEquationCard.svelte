<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->
<script lang="ts">
  import { dev } from '$app/environment'
  import InlineEdit from '$lib/InlineEdit.svelte'

  export let equationTextSize = 'text-xl'
  const debug = dev

  let w0 = ''
  let n = ''
  let lambda = ''

  $: hasValues = w0 || n || lambda

  function testEquation() {
    w0 = '0.5'
    n = '1.0'
    lambda = '1.07'
  }

  function solveEquation(w0: string, n: string, lambda: string) {
    const W0Val = parseFloat(w0)
    const nVal = parseFloat(n)
    const lambdaVal = parseFloat(lambda)

    if (isNaN(W0Val) || isNaN(nVal) || isNaN(lambdaVal)) {
      return
    }

    if (lambdaVal === 0) return

    const waist = (Math.PI * W0Val * W0Val) / (lambdaVal / 1000)
    return `${waist.toFixed(3)} mm`
  }

  $: waist = solveEquation(w0, n, lambda)
</script>

<div class="card relative flex flex-1 justify-center gap-4 p-6 md:py-10 {equationTextSize}">
  <div class="flex items-center font-serif">
    <span class:bg-green-300={debug} class="mr-3"> z </span>
    <span class="relative right-2.5 top-1.5"> r </span>
    <span> = </span>
    <span />
    <div class="flex flex-col">
      <div class="flex gap-1.5">
        <span />
        <span> π </span>
        <span> · </span>
        <InlineEdit bind:value={w0} placeholder="w0" />
        <span class="relative bottom-1 right-1.5">²</span>
        <span> · </span>
        <InlineEdit bind:value={n} placeholder="n" />
        <span />
      </div>

      <hr class="m-1 !border-t-2 !border-black/60" />

      <div class="flex justify-center gap-1.5">
        <InlineEdit bind:value={lambda} placeholder="λ" />
      </div>
    </div>

    {#if waist}
      <span class="ml-3 mr-3" class:bg-yellow-300={debug}>
        = {waist}
      </span>
    {/if}
  </div>

  {#if hasValues}
    <button
      class="btn btn-sm variant-ghost-primary absolute right-2 top-2"
      on:click={() => (w0 = n = lambda = '')}
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
