<script lang="ts">
  export let valid: boolean;
</script>

<div class="input-warning" class:input-not-valid-warning={!valid}>
  <slot />
</div>

<style>
  .input-warning {
    display: none;
    background-color: rgb(var(--warning-color-bg));
    box-sizing: border-box;
    border-radius: var(--button-radius);
    color: rgb(var(--warning-color-fg));
    font-weight: 500;
    padding: 3px 6px;
  }

  .input-not-valid-warning {
    display: inline-block;
  }
</style>
