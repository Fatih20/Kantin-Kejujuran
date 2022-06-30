<script lang="ts">
  import StartPage from "./components/StartPage.svelte";
  import Store from "./components/Store.svelte";
  import { appState } from "./stores";
</script>

<main>
  {#if $appState === "startPage"}
    <StartPage />
  {:else if $appState === "trade"}
    <Store />
  {/if}
</main>

<style>
</style>
