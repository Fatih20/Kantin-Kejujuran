<script lang="ts">
  import StartPage from "./components/StartPage.svelte";
  import { appState } from "./stores";
</script>

<main>
  {#if $appState === "startPage"}
    <StartPage />
  {/if}
</main>

<style>
</style>
