<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->
<script lang="ts">
  import { dev } from '$app/environment'
  import InlineEdit from '$lib/InlineEdit.svelte'

  export let equationTextSize = 'text-xl'
  const debug = dev

  let P0 = ''
  let r = ''

  $: hasValues = P0 || P0

  function testEquation() {
    P0 = '1.0'
    r = '0.05'
  }

  function solveEquation(P0: string, r: string) {
    const P0Val = parseFloat(P0)
    const rVal = parseFloat(r)

    if (isNaN(P0Val) || isNaN(rVal)) {
      return
    }

    if (rVal === 0) return

    const PDaverageVal = P0Val / (Math.PI * rVal * rVal)
    return `${PDaverageVal.toFixed(1)} Watts/mm^2`
  }

  $: PDaverage = solveEquation(P0, r)
</script>

<div class="card relative flex flex-1 justify-center gap-4 p-6 md:py-10 {equationTextSize}">
  <div class="flex items-center font-serif">
    <span class:bg-green-300={debug} class="mr-3"> PD<sub>average</sub> = </span>

    <div class="flex flex-col">
      <div class="flex justify-center gap-1.5">
        <InlineEdit bind:value={P0} placeholder="P0" />
      </div>

      <hr class="m-1 !border-t-2 !border-black/60" />

      <div class="flex justify-center gap-1.5">
        <span />
        <span> π </span>
        <span> · </span>
        <InlineEdit bind:value={r} placeholder="r" />
        <span class="relative bottom-1 right-1.5">²</span>
        <span />
      </div>
    </div>

    {#if PDaverage}
      <span class="ml-3 mr-3" class:bg-yellow-300={debug}>
        = {PDaverage}
      </span>
    {/if}
  </div>

  {#if hasValues}
    <button
      class="btn btn-sm variant-ghost-primary absolute right-2 top-2"
      on:click={() => (P0 = r = '')}
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
