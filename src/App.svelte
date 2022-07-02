<script lang="ts">
  import StartPage from "./components/StartPage.svelte";
  import Store from "./components/Store.svelte";
  import { appState, soldItemList } from "./stores";
  import { onMount } from "svelte";
  import { getBalance, incrementBalance } from "./utilities/storeAPI";

  onMount(async () => {
    await incrementBalance(500);
    console.log(await getBalance());
  });
</script>

<main>
  {#if $appState === "startPage"}
    <StartPage />
  {:else if $appState === "trade" || $appState === "add"}
    <Store />
  {/if}
</main>

<style>
  main {
    width: 100%;
  }
</style>
