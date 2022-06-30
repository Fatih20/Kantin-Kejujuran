<script lang="ts">
  import Header from "./Header.svelte";
  import Shelf from "./Shelf.svelte";
  import Footer from "./Footer.svelte";
</script>

<main>
  <Header />
  <Shelf />
  <Footer />
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
