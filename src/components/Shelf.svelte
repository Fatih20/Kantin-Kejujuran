<script lang="ts">
  import { stop_propagation } from "svelte/internal";

  let addingNewItem = false;
</script>

<main>
  <div
    class="absolute-container"
    class:absolute-container-active={addingNewItem}
    on:click={() => (addingNewItem = false)}
  >
    <div class="spacer" />
    {#if addingNewItem}
      <p>Bruh</p>
    {:else}
      <button
        class="add-new-button"
        on:click={(e) => {
          addingNewItem = true;
          e.stopPropagation();
        }}>Add new Item</button
      >
    {/if}
  </div>
  <h2>A shelf</h2>
</main>

<style>
  main {
    flex-grow: 1;
    overflow-y: scroll;
    position: relative;
    width: 100%;

    /* border: solid 1px black; */
  }

  .absolute-container {
    align-items: center;
    bottom: 0;
    box-sizing: border-box;
    background-color: rgba(0, 0, 0, 0);
    pointer-events: none;
    display: flex;
    flex-direction: column;
    justify-content: center;
    left: 0;
    /* opacity: 0; */
    right: 0;
    position: absolute;
    padding: 0.5em;
    top: 0;
    transition: all 0.25s ease-in-out;
    /* visibility: hidden; */
    z-index: 1000;

    border: solid 1px black;
  }

  .absolute-container-active {
    background-color: rgba(0, 0, 0, 0.5);
    /* display: flex; */
    /* opacity: 1; */
    pointer-events: auto;
    /* visibility: visible; */
  }

  .spacer {
    flex-grow: 1;
  }

  .add-new-button {
    align-self: center;
    pointer-events: all;
  }
</style>
