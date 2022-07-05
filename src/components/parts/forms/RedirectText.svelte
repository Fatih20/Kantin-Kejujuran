<script lang="ts">
  export let redirectText: string;
  export let redirectAddress: string;
  export let redirectFunction: () => void;
</script>

<p class="redirect">
  {redirectText}
  <span on:click={redirectFunction}>{redirectAddress}</span>
</p>

<style>
  .redirect {
    font-size: 0.8em;
  }

  .redirect span {
    cursor: pointer;
    color: rgb(var(--secondary-color));
  }
</style>
