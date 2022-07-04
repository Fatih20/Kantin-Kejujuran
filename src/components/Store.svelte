<script lang="ts">
  import Header from "./Header.svelte";
  import Shelf from "./Shelf.svelte";
  import Footer from "./Footer.svelte";
  import { appState } from "../stores";
  import NewItemForm from "./NewItemForm.svelte";
  import Login from "./Login.svelte";
  import { isLoggedInProcessor } from "../utilities/utilities";
  import useIsLoggedIn from "../utilities/useMe";

  let formKey = {};
  const isLoggedIn = useIsLoggedIn();
  // $: console.log(isLoggedInProcessor($isLoggedIn));

  function resetForm() {
    formKey = {};
  }
</script>

<main>
  <Header />
  {#if $appState === "add"}
    {#key formKey}
      <NewItemForm on:reset={resetForm} />
    {/key}
  {:else if $appState === "login" || $appState === "register"}
    <Login />
  {:else if $appState === "trade"}
    <Shelf />
    {#if isLoggedInProcessor($isLoggedIn)}
      <Footer />
    {/if}
  {/if}
</main>

<style>
  main {
    align-items: center;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    height: 100vh;
    justify-content: center;
    width: 100%;
  }
</style>
