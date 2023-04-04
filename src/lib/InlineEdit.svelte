<script lang="ts">
  export let value: string
  export let placeholder: string

  const debug = false

  let inputEl: HTMLInputElement
  let editing = false

  // trick to set focus once it binds
  $: inputEl && inputEl.focus()
</script>

{#if editing}
  <input
    bind:this={inputEl}
    class="input bg-white p-0 text-center"
    type="text"
    style:width={`calc(${value.length}*var(--math-text-size))`}
    style:min-width={`calc(2*var(--math-text-size))`}
    {placeholder}
    bind:value
    on:blur={() => (editing = false)}
  />
{:else}
  <button
    class="w-min rounded-lg hover:bg-black/10 {debug ? 'bg-black/10' : ''}"
    on:click={() => (editing = true)}
    on:focus={() => (editing = true)}
  >
    {value || placeholder}
  </button>
{/if}
