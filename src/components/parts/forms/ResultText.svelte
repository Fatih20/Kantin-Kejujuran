<script lang="ts">
  import { fade } from "svelte/transition";
  export let isSuccess: boolean;
</script>

<p
  class={`result-text ${isSuccess ? "success-text" : "fail-text"}`}
  transition:fade
>
  <slot />
</p>

<style>
  .result-text {
    border-radius: var(--button-radius);
    display: inline-block;
    font-weight: 500;
    flex-grow: 1;
    transition: opacity 0.25s ease-in-out;
    text-align: center;
    padding: 3px 6px;
    width: 100%;
  }

  .success-text {
    background-color: rgb(var(--success-color-bg));
    color: rgb(var(--success-color-fg));
  }

  .fail-text {
    background-color: rgb(var(--warning-color-bg));
    color: rgb(var(--warning-color-fg));
  }
</style>
