<script lang="ts">
  import { soldItemList } from "../stores";

  import type { ISoldItem } from "../utilities/types";

  import { priceDenominator } from "../utilities/utilities";
  import ButtonTemplate from "./ButtonTemplate.svelte";

  export let soldItem: ISoldItem;
  const { name, price, description } = soldItem;
</script>

<main>
  <h2 class="title">{name}</h2>
  <p>{priceDenominator(price)}</p>
  <p>{description}</p>
  <div class="spacer" />
  <button on:click={() => soldItemList.remove(soldItem)}> Buy Item </button>
</main>

<style>
  main {
    /* align-items: center; */
    background-color: rgb(var(--secondary-color));
    border-radius: var(--button-radius);
    box-sizing: border-box;
    color: rgb(var(--text-on-secondary-element-color));
    display: flex;
    filter: drop-shadow(0 0 0.75rem rgba(var(--secondary-color), 0.5));
    flex-direction: column;
    word-break: break-all;
    hyphens: manual;
    justify-content: flex-start;
    padding: 0.5em;
  }

  .title {
    margin-bottom: 0.25em;
  }

  .spacer {
    flex-grow: 1;
  }

  button {
    background-color: rgb(var(--primary-color));
    border-radius: var(--button-smaller-radius);
    border: none;
    color: rgb(var(--text-on-primary-element-color));
    font-weight: 600;
    transition: all 0.25s ease-in-out;
    margin: 0;
    padding: 7px;
  }
</style>
