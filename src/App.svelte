<script lang="ts">
  import StartPage from "./components/StartPage.svelte";
  import Store from "./components/Store.svelte";
  import BuyingOverlay from "./components/BuyingOverlay.svelte";
  import {
    appState,
    buyingProcess,
    showBuyingResultText,
    showLogoutResultText,
    isLoggingOut,
  } from "./stores";
  import { QueryClient, QueryClientProvider } from "@sveltestack/svelte-query";

  const queryClient = new QueryClient();
</script>

<QueryClientProvider client={queryClient}>
  <main>
    {#if [$buyingProcess, $showBuyingResultText, $isLoggingOut, $showLogoutResultText].some((element) => element === true)}
      <BuyingOverlay />
    {/if}
    {#if $appState === "startPage"}
      <StartPage />
    {:else if ["add", "trade", "login", "register"].some((possibleState) => possibleState === $appState)}
      <Store />
    {/if}
  </main>
</QueryClientProvider>

<style>
  main {
    width: 100%;
  }
</style>
