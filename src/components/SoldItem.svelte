<script lang="ts">
  import {
    buyingProcess,
    justFailedBuying,
    showBuyingResultText,
    soldItemList,
  } from "../stores";
  import type { ISoldItemRaw } from "../utilities/types";
  import { priceDenominator } from "../utilities/utilities";
  import { createEventDispatcher } from "svelte";
  export let soldItem: ISoldItemRaw;
  const { name, price, imageLink } = soldItem;
  import {
    useMutation,
    useQuery,
    useQueryClient,
  } from "@sveltestack/svelte-query";
  import { buyItem } from "../utilities/storeAPI";
  import { showBuyingResultDuration } from "../config";

  const queryClient = useQueryClient();
  const dispatch = createEventDispatcher();

  function handleSeeItem() {
    dispatch("seeItem", {
      buyItemFunction: handleBuyingItem,
      soldItem,
    });
  }

  const mutateItems = useMutation(
    async (boughtItem: ISoldItemRaw) => {
      console.log("Entering buy");
      await buyItem(boughtItem);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("items");
        justFailedBuying.set(false);
        console.log("Successfully bought the item");
      },
      onSettled: () => {
        buyingProcess.set(false);
        showBuyingResultText.set(true);
        setTimeout(() => {
          showBuyingResultText.set(false);
        }, showBuyingResultDuration);
      },
      onError: () => {
        justFailedBuying.set(true);
      },
    }
  );

  async function handleBuyingItem() {
    buyingProcess.set(true);
    await $mutateItems.mutateAsync(soldItem);
  }
</script>

<main>
  <div class="image-container">
    <img src={imageLink} alt="product" class="image" />
  </div>
  <div class="text-container">
    <p class="title">{name}</p>
    <h4>{priceDenominator(price)}</h4>
    <!-- <p>{description}</p> -->
  </div>
  <div class="spacer" />
  <div class="button-container">
    <button on:click={() => handleSeeItem()}> See Item </button>
    <button on:click={() => handleBuyingItem()}> Buy Item </button>
  </div>
</main>

<style>
  main {
    /* align-items: center; */
    background-color: rgb(var(--secondary-color));
    border-radius: var(--button-radius);
    box-sizing: border-box;
    color: rgb(var(--text-on-secondary-element-color));
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(5, 1fr);
    /* filter: drop-shadow(0 0 0.75rem rgba(var(--secondary-color), 0.5)); */
    flex-direction: column;
    gap: 0.25em;
    height: 300px;
    /* hyphens: manual; */
    /* justify-content: flex-start; */
    padding: 0.75em;
    word-break: break-word;
  }

  .text-container {
    align-items: flex-start;
    display: flex;
    flex-direction: column;
    grid-row: 4 / 5;
    justify-content: center;
  }

  .title {
    /* margin-bottom: 0.25em; */
    font-size: 1.1em;
    /* font-weight: ; */
  }

  .spacer {
    flex-grow: 1;
  }

  .button-container {
    align-items: flex-end;
    display: flex;
    grid-row: 5 / 6;
    justify-content: center;
    gap: 0.5em;
    width: 100%;
  }

  .button-container button {
    flex-grow: 1;
  }

  button {
    background-color: rgb(var(--text-on-primary-element-color));
    border-radius: var(--button-smaller-radius);
    border: none;
    color: rgb(var(--primary-color));
    font-weight: 600;
    transition: all 0.25s ease-in-out;
    margin: 0;
    padding: 7px;
  }

  .image-container {
    align-items: center;
    background-color: rgb(0, 0, 0);
    border-radius: var(--button-radius);
    display: flex;
    grid-row: 1 / 4;
    justify-content: center;
    overflow: hidden;
    min-height: 0;
    min-width: 0;
    height: 100%;
    width: 100%;
  }

  .image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>
