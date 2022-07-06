<script lang="ts">
  import {
    buyingProcess,
    justFailedBuying,
    showBuyingResultText,
  } from "../../../stores";
  import type { ISoldItemRaw } from "../../../utilities/types";
  import { priceDenominator } from "../../../utilities/utilities";
  import { createEventDispatcher } from "svelte";
  export let soldItem: ISoldItemRaw;
  const { name, price, imagelink } = soldItem;
  import { useMutation, useQueryClient } from "@sveltestack/svelte-query";
  import useIsLoggedIn from "../../../utilities/useMe";
  import { isLoggedInProcessor } from "../../../utilities/utilities";
  import { buyItem } from "../../../utilities/storeAPI";
  import { showBuyingResultDuration } from "../../../config";

  const isLoggedInRaw = useIsLoggedIn();

  $: isLoggedIn = isLoggedInProcessor($isLoggedInRaw);

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
      await buyItem(boughtItem);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("items");
        justFailedBuying.set(false);
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
    try {
      await $mutateItems.mutateAsync(soldItem);
    } catch (error) {
      console.log(error);
    }
  }
</script>

<main on:click={() => handleSeeItem()} class:logged-in={isLoggedIn}>
  <div class="image-container">
    <img src={imagelink} alt="product" class="image" />
  </div>
  <div class="text-container">
    <p class="title">{name}</p>
    <h4>{priceDenominator(price)}</h4>
  </div>
  <!-- <Spacer /> -->
  {#if isLoggedIn}
    <button on:click|stopPropagation={() => handleBuyingItem()}>
      Buy Item
    </button>
  {/if}
</main>

<style>
  main {
    background-color: rgb(var(--secondary-color));
    border-radius: var(--button-radius);
    box-sizing: border-box;
    color: rgb(var(--text-on-secondary-element-color));
    cursor: pointer;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr 1fr 2fr 1fr;
    flex-direction: column;
    gap: 0.5em;
    height: 250px;
    max-width: var(--card-max-width);
    padding: var(--padding-of-items-container);
    word-break: break-word;
    width: 100%;

    border: solid 1px white;
  }

  .logged-in {
    grid-template-rows: repeat(5, 1fr);
    height: 300px;
  }

  .text-container {
    align-items: flex-start;
    display: flex;
    flex-direction: column;
    grid-row: 4 / 5;
    justify-content: center;
  }

  .title {
    font-size: 1.1em;
  }

  button {
    background-color: rgb(var(--text-on-primary-element-color));
    border-radius: var(--button-smaller-radius);
    border: none;
    color: rgb(var(--primary-color));
    font-weight: 600;
    grid-row: 5 / 6;
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
