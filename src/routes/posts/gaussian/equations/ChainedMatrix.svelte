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
          <mtd><mn>q'</mn></mtd>
        </mtr>
        <mtr>
          <mtd><mn>1</mn></mtd>
        </mtr>
      </mtable>
      <mo>]</mo>
      <mo />
      <mo>=</mo>
      <mo>[</mo>
      <mtable>
        <mtr>
          <mtd><mn>1</mn></mtd>
          <mtd>
            <msub>
              <mn>d</mn>
              <mn>1</mn>
            </msub></mtd
          >
        </mtr>
        <mtr>
          <mtd><mn>0</mn></mtd>
          <mtd><mn>1</mn></mtd>
        </mtr>
      </mtable>
      <mo>]</mo>
      <mo>∙</mo>
      <mo>[</mo>
      <mtable>
        <mtr>
          <mtd><mn>1</mn></mtd>
          <mtd><mn>0</mn></mtd>
        </mtr>
        <mtr>
          <mtd><mn /></mtd>
          <mtd><mn /></mtd>
        </mtr>
        <mtr>
          <mfrac linethickness="2">
            <mrow>
              <mi>-1</mi>
            </mrow>
            <mrow>
              <mi>f</mi>
            </mrow>
          </mfrac>
          <mtd><mn>1</mn></mtd>
        </mtr>
      </mtable>
      <mo>]</mo>
      <mo>∙</mo>
      <mo>[</mo>
      <mtable>
        <mtr>
          <mtd><mn>1</mn></mtd>
          <mtd>
            <msub>
              <mn>d</mn>
              <mn>0</mn>
            </msub></mtd
          >
        </mtr>
        <mtr>
          <mtd><mn>0</mn></mtd>
          <mtd><mn>1</mn></mtd>
        </mtr>
      </mtable>
      <mo>]</mo>
      <mo>∙</mo>
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
    </mrow>
  </math>
</div>
