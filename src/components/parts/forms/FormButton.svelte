<script lang="ts">
  export let disabled = false;
  export let isSubmit = false;
</script>

<div
  class="form-button"
  class:disabled-button={disabled}
  type={isSubmit ? "submit" : "button"}
>
  <slot />
</div>

<style>
</style>
