<script lang="ts">
  import type { ISoldItem } from "../../../utilities/types";
  import useIsLoggedIn from "../../../utilities/useMe";
  import {
    isLoggedInProcessor,
    priceDenominator,
  } from "../../../utilities/utilities";
  export let item: ISoldItem;
  const {
    name,
    price,
    description,
    datecreated,
    milisecondcreated,
    imagelink,
  } = item;

  export let handleBuyClick: () => void;

  const isLoggedIn = useIsLoggedIn();
</script>

<main on:click={(e) => e.stopPropagation()}>
  <div class="title-part-container">
    <h3 class="name">{name}</h3>
    <p class="date">Entered the market on {datecreated}</p>
  </div>
  <div class="image-container">
    <img class="image" src={imagelink} alt="Product chosen" />
  </div>
  <div class="main-item-container">
    <h2 class="price">{priceDenominator(price)}</h2>
    <p class="description">{description}</p>
  </div>
  {#if isLoggedInProcessor($isLoggedIn)}
    <button class="buy-in-see-button" on:click={handleBuyClick}>Buy Item</button
    >
  {/if}
</main>

<style>
  main {
    align-items: flex-start;
    background-color: rgb(var(--secondary-color));
    border-radius: var(--button-radius);
    box-sizing: border-box;
    color: rgb(var(--text-on-secondary-element-color));
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    justify-content: center;
    padding: var(--padding-of-items-container);
    width: min(300px, 100%);
  }

  .image-container {
    align-items: center;
    background-color: rgb(0, 0, 0);
    border-radius: var(--button-radius);
    display: flex;
    justify-content: center;
    overflow: hidden;
    min-height: 0;
    min-width: 0;
    max-height: 250px;
    width: 100%;
  }

  .image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .main-item-container {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
  }

  .date {
    font-size: 0.8em;
  }

  .price {
    font-size: 1.25em;
  }

  .name,
  .price {
    font-weight: 600;
  }

  .buy-in-see-button {
    background-color: rgb(var(--text-on-primary-element-color));
    border-radius: var(--button-smaller-radius);
    box-sizing: border-box;
    border: none;
    color: rgb(var(--primary-color));
    font-weight: 600;
    transition: all 0.25s ease-in-out;
    margin: 0;
    padding: 7px;
  }
</style>
