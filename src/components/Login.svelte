<script lang="ts">
  import { maxIDLength, successTextDuration } from "../config";

  import {
    useMutation,
    useQuery,
    useQueryClient,
  } from "@sveltestack/svelte-query";

  import { fade } from "svelte/transition";

  import { appState } from "../stores";
  import type {
    ISoldItem,
    ISoldItemLite,
    PossibleNameProblem,
  } from "../utilities/types";
  import { addItem } from "../utilities/storeAPI";
  import Spacer from "./parts/Spacer.svelte";
  import FormContainer from "./parts/forms/FormContainer.svelte";
  import MainOfForm from "./parts/forms/MainOfForm.svelte";
  import InputContainer from "./parts/forms/InputContainer.svelte";
  import InputElement from "./parts/forms/InputContainer.svelte";
  import ButtonContainer from "./parts/forms/ButtonContainer.svelte";
  import Title from "./parts/forms/Title.svelte";
  import InputWarning from "./parts/forms/InputWarning.svelte";
  import ResultText from "./parts/forms/ResultText.svelte";

  const queryClient = useQueryClient();

  let showingResultText = false;
  let justFailed = false;

  let isSubmitting = false;

  $: redirectText =
    $appState === "login"
      ? "Don't have an account yet?"
      : "Already have an account?";

  let name: string = "";
  let password: string = "";

  let nameProblem = "empty" as PossibleNameProblem;
  let passwordProblem = "empty" as "empty" | "none";

  let nameJustStarted = true;
  let passwordJustStarted = true;

  let nameWarningText = "";
  let passwordWarningText = "";

  let dataValid = false;

  $: dataValid = [nameValid].every((validity) => validity === true);

  $: {
    if (name !== "") {
      nameJustStarted = false;
    }
  }

  $: {
    if (name === "") {
      nameProblem = "empty";
    } else if (name.length > maxIDLength) {
      nameProblem = "long";
    } else {
      nameProblem = "none";
    }
  }

  $: {
    if (nameProblem === "none") {
      nameWarningText = "";
    } else if (nameProblem === "empty") {
      nameWarningText = "Please enter a name";
    } else if (nameProblem === "long") {
      nameWarningText = "Name entered is too long";
    }
  }

  $: nameValid = nameProblem === "none";
  $: passwordValid = passwordProblem === "none";

  const mutateItems = useMutation(
    "items",
    async (addedItem: ISoldItem) => {
      await addItem(addedItem);
    },
    {
      onSuccess: () => {
        justFailed = false;
        queryClient.invalidateQueries("items");
        reset();
      },
      onError: () => {
        justFailed = true;
      },
    }
  );

  function reset() {
    appState.set("trade");
  }

  async function handleSubmit(e) {
    isSubmitting = true;
    e.preventDefault();
    try {
    } catch (error) {
      console.log(error);
    }

    isSubmitting = false;
    showingResultText = true;
    setTimeout(() => {
      reset();
    }, successTextDuration);
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

<MainOfForm on:click={(e) => e.stopPropagation()}>
  <FormContainer>
    <Title>{$appState === "login" ? "Login" : "Register"}</Title>
    <form on:submit={handleSubmit}>
      <InputElement>
        <label for="name-input">Student ID</label>
        <InputContainer>
          <input
            id="name-input"
            name="name-input"
            bind:value={name}
            disabled={isSubmitting}
          />
          <InputWarning valid={nameValid || nameJustStarted}>
            {nameWarningText}
          </InputWarning>
        </InputContainer>
      </InputElement>
      <InputElement>
        <label for="password-input">Password</label>
        <InputContainer>
          <input
            id="password-input"
            name="password-input"
            bind:value={password}
            disabled={isSubmitting}
          />
          <InputWarning valid={passwordValid || passwordJustStarted}>
            {passwordWarningText}
          </InputWarning>
        </InputContainer>
      </InputElement>
      <ButtonContainer>
        <button
          class="form-button return-button"
          type="button"
          on:click={() => appState.set("trade")}
        >
          Back
        </button>
        {#if showingResultText}
          {#if justFailed}
            <ResultText isSuccess={false}>
              Adding new item failed. Try again.
            </ResultText>
          {:else}
            <ResultText isSuccess={true}>Item succesfully added.</ResultText>
          {/if}
        {:else}
          <Spacer />
        {/if}
        <button
          class="form-button submit-button"
          type="submit"
          class:disabled-button={!dataValid}
          disabled={!dataValid}
        >
          {$appState === "login" ? "Login" : "Register"}
        </button>
      </ButtonContainer>
      <p class="redirect">
        {redirectText}
        <span
          on:click={() => {
            if ($appState === "login") {
              appState.set("register");
            } else {
              appState.set("login");
            }
          }}>{$appState === "login" ? "Register" : "Login"}</span
        >
      </p>
    </form>
  </FormContainer>
</MainOfForm>

<style>
  form {
    padding-top: 0.75em;
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1em;

    /* border: solid 1px white; */
  }

  label {
    font-weight: 400;
    margin: 0;
  }

  input {
    margin: 0;
    width: 100%;
  }

  .form-button {
    background-color: rgba(var(--primary-color), 0);
    border-radius: var(--button-smaller-radius);
    border: none;
    color: rgb(var(--text-on-primary-element-color));
    font-weight: 600;
    transition: all 0.25s ease-in-out;
    margin: 0;
    user-select: none;
    padding: 7px;
  }

  .form-button:hover {
    background-color: rgb(var(--text-on-primary-element-color));
    color: rgb(var(--primary-color));
  }

  .disabled-button {
    --border-color: var(--disabled-color);
    color: rgba(var(--text-on-disabled-element-color), 0.5);
    cursor: initial;
  }

  .disabled-button:hover {
    background-color: rgba(var(--primary-color), 0);
    color: rgba(var(--text-on-disabled-element-color), 0.5);
  }

  .redirect span {
    cursor: pointer;
  }
</style>
