<script lang="ts">
  import { soldItemList, appState, sortCondition } from "../stores";
  import type { SortingCondition } from "../utilities/types";
  import SoldItem from "./SoldItem.svelte";

  function overallSortingTextGenerator(sortCondition: SortingCondition) {
    if (sortCondition[0]) {
      return sortCondition[1] ? "From oldest" : "From newest";
    } else {
      return sortCondition[1]
        ? "Alphabetical order"
        : "Reverse alphabetical order";
    }
  }
  $: firstSortingText = $sortCondition[0] ? "Date" : "Name";
  $: secondSortingText = $sortCondition[1] ? "Ascending" : "Descending";
  $: overallSortingText = overallSortingTextGenerator($sortCondition);

  function handleSortChanges(isOrder: boolean) {
    if (isOrder) {
      sortCondition.alternateSortOrder();
    } else {
      sortCondition.alternateSortBy();
    }
    soldItemList.resort($sortCondition);
  }
  // $: soldItemList.resort($sortCondition);
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
    <div class="sort-container">
      <p class="sort-text">Sort Method: <span>{overallSortingText}</span></p>
      <div class="spacer" />
      <div class="sort-button-container">
        <button class="sort-button" on:click={() => handleSortChanges(true)}
          >{secondSortingText}</button
        >
        <button class="sort-button" on:click={() => handleSortChanges(false)}
          >{firstSortingText}</button
        >
      </div>
    </div>
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
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    flex-grow: 1;
    gap: 0.75em;
    overflow-y: auto;
    position: relative;
    padding: 0.75em;
    width: min(100%, 1000px);

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
    --gap-size: 0.75em;
    --minimum-item-width: 200px;
    box-sizing: border-box;
    display: grid;
    grid-template-columns: repeat(
      auto-fill,
      minmax(var(--minimum-item-width), 1fr)
    );
    /* grid-template-rows: repeat(auto-fit, 150px); */
    gap: var(--gap-size);
    /* flex-grow: 1; */
    /* padding: 0.5em; */
    width: 100%;
  }

  .sort-container {
    align-items: center;
    display: flex;
    /* flex-direction: column; */
    gap: 0.5em;
    justify-content: center;
    width: 100%;
  }

  .sort-text,
  .sort-button {
    font-weight: 500;
  }

  .sort-text {
    /* line-height: 2; */
    user-select: none;
    /* text-align: center; */
  }

  .sort-text span {
    font-weight: 400;
  }

  .sort-button-container {
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    gap: 0.25em;
    text-align: left;
    justify-content: flex-end;

    /* border: solid 1px white; */
  }

  .sort-button {
    background-color: rgb(var(--text-on-primary-element-color));
    /* box-sizing: border-box; */
    color: rgb(var(--primary-color));
    border-radius: var(--button-radius);
    cursor: pointer;
    margin: 0;
    padding: 0.2em;
  }
</style>
