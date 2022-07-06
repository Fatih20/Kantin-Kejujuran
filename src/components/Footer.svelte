<script lang="ts">
  import type {
    PossibleFooterState,
    PossibleInputProblem,
  } from "../utilities/types";
  import { priceDenominator } from "../utilities/utilities";
  import {
    useQuery,
    useMutation,
    useQueryClient,
  } from "@sveltestack/svelte-query";
  import { getBalance, incrementBalance } from "../utilities/storeAPI";
  import type { AxiosError } from "axios";

  const queryClient = useQueryClient();

  const balanceQuery = useQuery<number, AxiosError>("balance", getBalance, {
    refetchInterval: 30000,
  });
  const mutateBalance = useMutation(
    "balance",
    async (incrementor: number) => {
      await incrementBalance(incrementor);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("balance");
        reset();
      },
    }
  );

  let footerState = "default" as PossibleFooterState;
  let inputtedNumber: number | undefined = undefined;
  let firstStart = true;
  let warningText = "";

  let validInput = true;
  let inputProblem = "none" as PossibleInputProblem;

  let operating = false;

  function reset() {
    operating = false;
    firstStart = true;
    inputtedNumber = undefined;
    footerState = "default";
    warningText = "";
  }

  $: {
    if (footerState === "take" && inputtedNumber > $balanceQuery.data) {
      inputProblem = "overdraw";
    } else if (inputtedNumber === null) {
      inputProblem = "NaN";
    } else if (inputtedNumber < 0) {
      inputProblem = "negative";
    } else if (inputtedNumber === undefined) {
      inputProblem = "undefined";
    } else {
      inputProblem = "none";
    }
  }

  $: {
    if (inputProblem === "overdraw") {
      warningText = "You can't withdraw more than the canteen balance";
    } else if (inputProblem === "NaN" || inputProblem === "negative") {
      warningText = "Please enter a positive number";
    } else {
      warningText = "";
    }
  }

  $: validInput = inputProblem === "none" || inputProblem === "undefined";

  async function handleOperate() {
    operating = true;
    if (!validInput) {
      return;
    }

    const incrementor =
      footerState === "give" ? inputtedNumber : -inputtedNumber;
    try {
      await $mutateBalance.mutateAsync(incrementor);
    } catch (error) {
      console.log(error);
    }

    // if (completeOperation) {
    //   reset();
    // }
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

<main class:input-invalid-main={footerState !== "default" && !validInput}>
  <p class="warning-text" class:visible={!validInput}>{warningText}</p>
  <div class="footer-container">
    {#if footerState === "default"}
      <button on:click={() => (footerState = "take")}>
        <i class="fa-solid fa-right-from-bracket fa-rotate-270 money-icon" />
      </button>
      <div class="money-container">
        <div class="money-container-second">
          {#if $balanceQuery.status === "success"}
            <i class="fa-solid fa-money-bill-wave money-icon" />
            <p class="store-balance">{priceDenominator($balanceQuery.data)}</p>
          {:else if $balanceQuery.status === "loading"}
            <i class="fa-solid fa-spinner spinner-icon" />
          {/if}
        </div>
      </div>
      <button on:click={() => (footerState = "give")}>
        <i class="fa-solid fa-right-to-bracket fa-rotate-90 money-icon" />
      </button>
    {:else}
      <button class="cancel-button" on:click={reset} class:invalid={operating}>
        <i class="fa-solid fa-share fa-flip-horizontal money-icon" /></button
      >
      <div class="input-container">
        <p class:invalid={operating}>Rp</p>
        <input
          class="input-operator"
          type="number"
          min="0"
          placeholder={"0"}
          disabled={operating}
          bind:value={inputtedNumber}
          on:keydown={({ key }) => {
            if (key == "Enter") {
              handleOperate();
              return;
            }
          }}
        />
      </div>
      <button
        class:invalid={!validInput || operating}
        disabled={!validInput || operating}
        on:click={handleOperate}
      >
        <i
          class={`money-icon fa-solid fa-right-${
            footerState === "give" ? "to" : "from"
          }-bracket fa-rotate-${footerState === "give" ? "90" : "270"}`}
        />
      </button>
    {/if}
  </div>
</main>

<style>
  main {
    align-items: center;
    align-self: flex-start;
    background-color: rgb(var(--primary-color));
    border-top: solid 2px rgb(var(--primary-border-color));
    bottom: 0;
    box-sizing: border-box;
    color: rgb(var(--text-on-primary-element-color));
    display: flex;
    flex-direction: column;
    /* gap: 0; */
    justify-content: center;
    padding: 0.5em var(--side-edge-gap);
    width: 100%;
  }

  .input-invalid-main {
    gap: 0.5em;
  }

  .warning-text {
    font-weight: 600;
    text-align: center;
    display: none;
  }

  .visible {
    display: initial;
  }

  .footer-container {
    align-items: center;
    display: flex;
    max-width: var(--headfoot-max-width);
    height: 2em;
    gap: 1.5em;
    justify-content: center;
    width: 100%;

    /* border: solid 1px white; */
  }

  .money-container {
    align-items: center;
    display: flex;
    flex-grow: 1;
    gap: 0.5em;
    justify-content: flex-start;
    overflow-x: auto;
    height: 100%;
  }

  .money-container-second {
    align-items: center;
    display: flex;
    gap: 0.5em;
    justify-content: center;
    flex-grow: 1;
    height: 100%;
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
    font-size: 1.25em;
    animation: spinning 1s linear 0s infinite;
  }

  .store-balance {
    font-weight: 600;
  }
  button {
    background-color: rgba(0, 0, 0, 0);
    border: none;
    color: white;
    cursor: pointer;
    display: flex;
    margin: 0;
    padding: 0;
  }

  .invalid {
    opacity: 0.5;
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
    height: 100%;
  }

  .input-container p {
    font-size: 1.25em;
    font-weight: 600;
  }

  .input-operator {
    color: rgb(var(--primary-color));
    flex-grow: 1;
    font-weight: 700;
    margin: 0;
    outline: none;
    width: 100%;
  }
</style>
