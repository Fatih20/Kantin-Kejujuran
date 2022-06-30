<script lang="ts">
  import { storeBalance } from "../stores";
  import type { PossibleFooterState } from "../utilities/types";
  import { priceDenominator } from "../utilities/utilities";

  let footerState = "default" as PossibleFooterState;
  let inputtedNumber: number;
  let validInput = true;

  $: {
    if (footerState === "take" && inputtedNumber > $storeBalance) {
      validInput = false;
    } else {
      validInput = true;
    }
  }

  function handleOperate() {
    let completeOperation = true;
    if (!validInput) {
      return;
    }
    if (footerState === "give") {
      storeBalance.add(inputtedNumber);
    } else if (footerState === "take") {
      storeBalance.subtract(inputtedNumber);
    }

    if (completeOperation) {
      inputtedNumber = 0;
      footerState = "default";
    }
  }
</script>

<head>
  <script
    src="https://kit.fontawesome.com/31a5898fa1.js"
    crossorigin="anonymous"></script>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta2/css/all.min.css"
    integrity="sha512-YWzhKL2whUzgiheMoBFwW8CKV4qpHQAEuvilg9FAn5VJUDwKZZxkJNuGM4XkWuk94WCrrwslk8yWNGmY1EduTA=="
    crossorigin="anonymous"
    referrerpolicy="no-referrer"
  />
</head>

<main>
  {#if !validInput}
    <p class="warning-text">You can't withdraw more than the canteen balance</p>
  {/if}
  <div class="footer-container">
    {#if footerState === "default"}
      <button class="money-button" on:click={() => (footerState = "take")}>
        <i class="fa-solid fa-right-from-bracket fa-rotate-270 money-icon" />
      </button>

      <div class="money-container">
        <i class="fa-solid fa-money-bill-wave money-icon" />
        <p class="store-balance">{priceDenominator($storeBalance)}</p>
      </div>
      <button class="money-button" on:click={() => (footerState = "give")}>
        <i class="fa-solid fa-right-to-bracket fa-rotate-90 money-icon" />
      </button>
    {:else}
      <button
        class="operate-button cancel-button"
        on:click={() => (footerState = "default")}
      >
        <i class="fa-solid fa-share fa-flip-horizontal money-icon" /></button
      >
      <div class="input-container">
        <p>$</p>
        <input
          class="input-operator"
          type="number"
          placeholder={"0"}
          bind:value={inputtedNumber}
          on:keydown={({ key }) => {
            if (key == "Enter") {
              handleOperate();
            }
          }}
        />
      </div>
      <button class="operate-button" on:click={handleOperate}>
        {#if footerState === "give"}
          <i class="fa-solid fa-right-to-bracket fa-rotate-90 money-icon" />
        {:else if footerState === "take"}
          <i class="fa-solid fa-right-from-bracket fa-rotate-270 money-icon" />
        {/if}
      </button>
    {/if}
  </div>
</main>

<style>
  main {
    align-items: center;
    align-self: flex-start;
    background-color: rgb(var(--primary-color));
    bottom: 0;
    box-sizing: border-box;
    color: rgb(var(--text-on-primary-element-color));
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: fixed;
    padding: 1em;
    width: 100%;
  }

  .footer-container {
    align-items: center;
    display: flex;
    gap: 1.5em;
    justify-content: center;
    width: 100%;
    max-width: 300px;
  }

  .money-container {
    align-items: center;
    display: flex;
    flex-grow: 1;
    gap: 0.5em;
    justify-content: center;
    overflow-x: auto;
    height: 100%;

    /* border: solid 1px black; */
  }

  .store-balance {
    /* font-size: 1.25em; */
    font-weight: 600;
  }

  .money-button,
  .operate-button {
    background-color: rgba(0, 0, 0, 0);
    border: none;
    color: white;
    cursor: pointer;
    /* display: none; */
    display: flex;
    margin: 0;
    padding: 0;
    /* width: 50px; */
  }

  .money-icon {
    font-size: 1.25em;
  }

  .cancel-button {
    font-weight: 800;
  }

  .input-container {
    align-items: center;
    display: flex;
    flex-grow: 1;
    gap: 0.25em;
    justify-content: center;
  }

  .input-container p {
    font-size: 1.25em;
    font-weight: 600;
  }

  .input-operator {
    padding: 0;
    margin: 0;
    width: 100%;
    flex-grow: 1;
    margin: 0;
  }
</style>
