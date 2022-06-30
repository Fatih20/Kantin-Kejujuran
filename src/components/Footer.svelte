<script lang="ts">
  import { storeBalance } from "../stores";
  import type { PossibleFooterState } from "../utilities/types";
  import { priceDenominator } from "../utilities/utilities";

  let footerState = "default" as PossibleFooterState;
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
  <div class="footer-container">
    <button class="money-button" on:click={() => console.log("Withdrawing")}>
      Take
      <!-- <i class="fa-solid fa-inbox-in money-icon" /> -->
    </button>

    <div class="money-container">
      <i class="fa-solid fa-money-bill-wave money-icon" />
      <p class="store-balance">{priceDenominator($storeBalance)}</p>
    </div>
    <button class="money-button">Give</button>
  </div>
</main>

<style>
  main {
    align-items: center;
    align-self: flex-start;
    background-color: rgb(var(--primary-color));
    box-sizing: border-box;
    color: rgb(var(--text-on-primary-element-color));
    height: 50px;
    display: flex;
    justify-content: center;
    padding: 1em;
    width: 100%;
  }

  .footer-container {
    align-items: center;
    display: flex;
    gap: 1em;
    justify-content: center;
    width: 100%;
    max-width: 400px;
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
    font-weight: 600;
  }

  .money-button {
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
    font-size: 1.5em;
  }
</style>
