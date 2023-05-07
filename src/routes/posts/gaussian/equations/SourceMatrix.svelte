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
          <mtd><mn>q</mn></mtd>
        </mtr>
        <mtr>
          <mtd><mn>1</mn></mtd>
        </mtr>
      </mtable>
      <mo>]</mo>
      <mo />
      <mo>,</mo>
      <mo />
      <mo>where</mo>
      <mo>q</mo>
      <mo>=</mo>
      <mo>z</mo>
      <mo>+</mo>
      <msub>
        <mi>z</mi>
        <mi>r</mi>
      </msub>
      <mo>∙</mo>
      <mo>i</mo>
    </mrow>
  </math>
</div>
