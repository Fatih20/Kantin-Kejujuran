<script lang="ts">
  import { soldItemList, appState } from "../stores";
  import SoldItem from "./SoldItem.svelte";
</script>

<main>
  <!-- <div
    class="absolute-container"
    on:click={() => console.log("Is clicking container")}
  >
    <div class="spacer" />
    <button
      class="add-new-button"
      on:click={(e) => {
        appState.set("add");
        e.stopPropagation();
      }}>Add new Item</button
    >
  </div> -->
  {#if $soldItemList.length === 0}
    <h2 class="empty-text">No items are currently sold</h2>
  {:else}
    <div class="shelf">
      {#each $soldItemList as soldItem (soldItem.milisecondCreated)}
        <SoldItem {soldItem} />
      {/each}
    </div>
  {/if}
</main>

<style>
  main {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    flex-grow: 1;
    overflow-y: auto;
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

  .empty-text {
    color: rgba(var(--primary-color), 0.75);
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

  .shelf {
    --gap-size: 10px;
    box-sizing: border-box;
    display: grid;
    grid-template-columns: repeat(auto-fill, repeat(3, 33%));
    /* grid-template-rows: repeat(auto-fit, 150px); */
    gap: 10px;
    /* flex-grow: 1; */
    padding: 0.5em;
    width: 100%;
  }
</style>
