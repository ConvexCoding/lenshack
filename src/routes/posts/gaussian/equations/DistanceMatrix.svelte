<script lang="ts">
  import { dev } from '$app/environment'
  import InlineEdit from '$lib/InlineEdit.svelte'
  export let equationTextSize = 'text-xl'
</script>

<div class="card relative flex flex-1 justify-center gap-4 p-0 md:py-0 {equationTextSize}">
  <math xmlns="http://www.w3.org/1998/Math/MathML">
    <mrow>
      <mo>[</mo>
      <mtable>
        <mtr>
          <mtd><mn>1</mn></mtd>
          <mtd><mn>d</mn></mtd>
        </mtr>
        <mtr>
          <mtd><mn>0</mn></mtd>
          <mtd><mn>1</mn></mtd>
        </mtr>
      </mtable>
      <mo>]</mo>
      <mo />
      <mo>Distance</mo>
    </mrow>
  </math>
</div>
