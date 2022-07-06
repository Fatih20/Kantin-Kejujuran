<script lang="ts">
  import StartPage from "./components/StartPage.svelte";
  import Store from "./components/Store.svelte";
  import Overlay from "./components/Overlay.svelte";
  import { appState, overlayState } from "./stores";
  import { QueryClient, QueryClientProvider } from "@sveltestack/svelte-query";

  const queryClient = new QueryClient();
</script>

<QueryClientProvider client={queryClient}>
  <main>
    {#if $overlayState["event"] !== "none"}
      <Overlay />
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
