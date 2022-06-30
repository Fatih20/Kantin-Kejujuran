<script lang="ts">
  import NewItemForm from "./NewItemForm.svelte";

  let addingNewItem = false;
</script>

<main>
  <div
    class="absolute-container"
    class:absolute-container-active={addingNewItem}
    on:click={() => (addingNewItem = false)}
  >
    {#if addingNewItem}
      <div class="spacer" />
      <NewItemForm />
      <div class="spacer" />
    {:else}
      <div class="spacer" />
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
    background-color: rgb(var(--primary-color));
    border-radius: var(--button-smaller-radius);
    color: rgb(var(--text-on-primary-element-color));
    cursor: pointer;
    font-weight: 600;
    transition: all 0.25s ease-in-out;
    /* font-size: 1em; */
    margin: 0;
    pointer-events: all;
    padding: 7px;
    /* width: 75px; */
  }
</style>
