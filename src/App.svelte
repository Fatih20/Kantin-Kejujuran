<script lang="ts">
  import StartPage from "./components/StartPage.svelte";
  import Store from "./components/Store.svelte";
  import { appState, soldItemList } from "./stores";
  import { onMount } from "svelte";
  import {
    getAllItems,
    getBalance,
    incrementBalance,
  } from "./utilities/storeAPI";
  import { QueryClient, QueryClientProvider } from "@sveltestack/svelte-query";

  const queryClient = new QueryClient();

  onMount(async () => {
    // await incrementBalance(500);
    // console.log(await getBalance());
    console.log(await getAllItems());
  });
</script>

<QueryClientProvider client={queryClient}>
  <main>
    {#if $appState === "startPage"}
      <StartPage />
    {:else if $appState === "trade" || $appState === "add"}
      <Store />
    {/if}
  </main>
</QueryClientProvider>

<style>
  main {
    width: 100%;
  }
</style>
