<script lang="ts">
  import { dev } from '$app/environment'
  import InlineEdit from '$lib/InlineEdit.svelte'
  export let equationTextSize = 'text-xl'
</script>

<div class="card relative flex flex-1 justify-center gap-4 p-0 md:py-0 {equationTextSize}">
  <math xmlns="http://www.w3.org/1998/Math/MathML">
    <mrow>
      <mfrac linethickness="2">
        <mrow>
          <mi>1</mi>
        </mrow>
        <mrow>
          <mi>q</mi>
          <mi>'</mi>
        </mrow>
      </mfrac>
      <mo />
      <mo> = </mo>
      <mo />
      <mfrac linethickness="2">
        <mrow>
          <mi>1</mi>
        </mrow>
        <mrow>
          <mi>R</mi>
          <mi>(</mi>
          <mi>z</mi>
          <mi>)</mi>
        </mrow>
      </mfrac>
      <mo>-</mo>
      <mo>i</mo>
      <mo>∙</mo>
      <mfrac linethickness="2">
        <mrow>
          <mi>M2</mi>
          <mo>∙</mo>
          <mi>λ</mi>
        </mrow>
        <mrow>
          <mi>n</mi>
          <mo>∙</mo>
          <mi>π</mi>
          <mo>∙</mo>
          <msup>
            <mn>w</mn>
            <mn>2</mn>
          </msup>
          <mi>(</mi>
          <mi>z</mi>
          <mi>)</mi>
        </mrow>
      </mfrac>
    </mrow>
  </math>
</div>
