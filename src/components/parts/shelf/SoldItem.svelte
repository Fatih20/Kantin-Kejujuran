<script lang="ts">
  import {
    buyingProcess,
    justFailedBuying,
    mockLoginData,
    showBuyingResultText,
  } from "../../../stores";
  import type { ISoldItemRaw } from "../../../utilities/types";
  import { priceDenominator } from "../../../utilities/utilities";
  import { createEventDispatcher } from "svelte";
  export let soldItem: ISoldItemRaw;
  const { name, price, imagelink } = soldItem;
  import {
    useMutation,
    useQuery,
    useQueryClient,
  } from "@sveltestack/svelte-query";
  import { buyItem } from "../../../utilities/storeAPI";
  import { showBuyingResultDuration } from "../../../config";
  import Spacer from "../Spacer.svelte";

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

<main>
  <div class="image-container">
    <img src={imagelink} alt="product" class="image" />
  </div>
  <div class="text-container">
    <p class="title">{name}</p>
    <h4>{priceDenominator(price)}</h4>
  </div>
  <Spacer />
  <div class="button-container">
    <button on:click={() => handleSeeItem()}> See Item </button>
    {#if $mockLoginData}
      <button on:click={() => handleBuyingItem()}> Buy Item </button>
    {/if}
  </div>
</main>

<style>
  main {
    background-color: rgb(var(--secondary-color));
    border-radius: var(--button-radius);
    box-sizing: border-box;
    color: rgb(var(--text-on-secondary-element-color));
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(5, 1fr);
    flex-direction: column;
    gap: 0.25em;
    height: 300px;
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
    font-size: 1.1em;
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
