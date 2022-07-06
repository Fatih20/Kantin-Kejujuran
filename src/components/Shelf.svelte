<script lang="ts">
  import { onMount } from "svelte";
  import { useQuery, useQueryClient } from "@sveltestack/svelte-query";

  import { sortCondition } from "../stores";
  import type {
    ISoldItem,
    ISoldItemRaw,
    ShelfState,
    SortingCondition,
    SortingTextObject,
  } from "../utilities/types";
  import { capitalize, compareFunctionGenerator } from "../utilities/utilities";
  import SoldItem from "./parts/shelf/SoldItem.svelte";
  import type { AxiosError } from "axios";
  import { getAllItems } from "../utilities/storeAPI";
  import SeenItem from "../components/parts/shelf/SeenItem.svelte";
  import Spacer from "./parts/Spacer.svelte";
  import SortingShelf from "../components/parts/shelf/SortingShelf.svelte";

  const queryClient = useQueryClient();

  const itemsQuery = useQuery<ISoldItemRaw[], AxiosError>(
    "items",
    getAllItems,
    { refetchInterval: 5000 }
  );

  $: sortedItems =
    $itemsQuery.data === undefined
      ? []
      : $itemsQuery.data.sort(
          compareFunctionGenerator($sortCondition[0], $sortCondition[1])
        );

  let shelfState = "all" as ShelfState;
  let seenItem: ISoldItem;

  let currentBuyItemFunction;

  const sortingText = {
    date: {
      ascending: "From oldest",
      descending: "From newest",
    },
    name: {
      ascending: "Alphabetical order",
      descending: "Reverse alphabetical order",
    },
    price: {
      ascending: "From least expensive",
      descending: "From most expensive",
    },
  } as SortingTextObject;

  $: firstSortingText = capitalize($sortCondition[0]);
  $: secondSortingText = capitalize($sortCondition[1]);
  $: overallSortingText = sortingText[$sortCondition[0]][$sortCondition[1]];

  function seeItem(e: CustomEvent) {
    shelfState = "one";
    const { detail } = e;
    const { soldItem, buyItemFunction } = detail as {
      soldItem: ISoldItem;
      buyItemFunction: () => void;
    };
    currentBuyItemFunction = buyItemFunction;

    seenItem = soldItem;
  }

  function handleCloseSeeItem() {
    shelfState = "all";
    seenItem = {} as ISoldItem;
    currentBuyItemFunction = undefined;
  }

  function handleSortChanges(isOrder: boolean) {
    if (isOrder) {
      sortCondition.alternateSortOrder();
    } else {
      sortCondition.cycleSortBy();
    }
  }
</script>

<main>
  {#if shelfState === "one"}
    <div class="absolute-container" on:click={handleCloseSeeItem}>
      <!--     <Spacer /> -->
      <SeenItem
        item={seenItem}
        handleBuyClick={async () => {
          await currentBuyItemFunction();
          handleCloseSeeItem();
        }}
      />
    </div>
  {/if}
  {#if $itemsQuery.status === "loading"}
    <Spacer />
    <i class="fa-solid fa-spinner spinner-icon" />
    <Spacer />
  {:else if $itemsQuery.status === "error"}
    <Spacer />
    <h2 class="empty-text">Error getting items. Try reloading</h2>
    <Spacer />
  {:else if $itemsQuery.status === "success"}
    {#if $itemsQuery.data.length === 0}
      <Spacer />
      <h2 class="empty-text">No items are currently sold</h2>
      <Spacer />
    {:else}
      <SortingShelf
        {overallSortingText}
        {firstSortingText}
        {secondSortingText}
        {handleSortChanges}
      />
      <div class="shelf">
        {#each sortedItems as soldItem (soldItem.id)}
          <SoldItem on:seeItem={seeItem} {soldItem} />
        {/each}
      </div>
    {/if}
  {/if}
</main>

<style>
  main {
    --padding-of-items-container: 0.75em;
    --padding-of-shelf-main: 0.75em;
    align-items: center;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    flex-grow: 1;
    gap: 0.75em;
    overflow-y: auto;
    position: relative;
    padding: var(--padding-of-shelf-main) var(--side-edge-gap);
    width: min(100%, 1000px);
  }

  .absolute-container {
    align-items: center;
    box-sizing: border-box;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    justify-content: center;
    left: 0;
    right: 0;
    position: fixed;
    padding: var(--padding-of-shelf-main) var(--side-edge-gap);
    top: 0;
    transition: all 0.25s ease-in-out;
    z-index: 1000;
  }

  @keyframes spinning {
    0% {
      transform: rotate(0deg);
    }

    50% {
      transform: rotate(180deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }

  .spinner-icon {
    font-size: 2em;
    animation: spinning 1s linear 0s infinite;
  }

  .empty-text {
    color: rgba(var(--primary-color), 0.75);
    text-align: center;
  }

  .shelf {
    --gap-size: 0.75em;
    box-sizing: border-box;
    display: grid;
    justify-items: center;
    grid-template-columns: repeat(
      auto-fill,
      minmax(var(--card-min-width), 1fr)
    );
    gap: var(--gap-size);
    width: 100%;

    /* border: solid 1px white; */
  }
</style>
