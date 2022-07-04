<script lang="ts">
  import Header from "./Header.svelte";
  import Shelf from "./Shelf.svelte";
  import Footer from "./Footer.svelte";
  import { appState, mockLoginData } from "../stores";
  import NewItemForm from "./NewItemForm.svelte";
  import Login from "./Login.svelte";

  let formKey = {};

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
    {#if $mockLoginData}
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
