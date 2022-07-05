<script lang="ts">
  import { maxIDLength, successTextDuration } from "../config";

  import {
    useMutation,
    useQuery,
    useQueryClient,
  } from "@sveltestack/svelte-query";

  import { appState } from "../stores";
  import type {
    ISoldItem,
    PossibleAuthenticationErrorManMade,
    PossibleIDProblem,
    PossiblePasswordProblem,
    User,
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
  import { IDValidation } from "../utilities/utilities";
  import { login, register } from "../utilities/userAPI";

  const queryClient = useQueryClient();
  let isSubmitting = false;

  $: redirectText =
    $appState === "login"
      ? "Don't have an account yet?"
      : "Already have an account?";

  let name: number | null | undefined = undefined;
  let password: string = "";

  let nameProblem = "empty" as PossibleIDProblem;
  let passwordProblem = "empty" as PossiblePasswordProblem;

  let nameJustStarted = true;
  let passwordJustStarted = true;
  let justFailed = false;
  let failMessage = "";

  let nameWarningText = "";
  let passwordWarningText = "";

  let dataValid = false;

  $: dataValid = [nameValid, passwordValid].every(
    (validity) => validity === true
  );

  $: {
    if (name >= 10000 || name < 0) {
      nameJustStarted = false;
    }
  }

  $: {
    if (password !== "") {
      passwordJustStarted = false;
    }
  }

  $: {
    if (name === null) {
      nameProblem = "empty";
    } else if (!IDValidation(name)) {
      nameProblem = "invalid";
    } else {
      nameProblem = "none";
    }
  }

  $: {
    if (nameProblem === "none") {
      nameWarningText = "";
    } else if (nameProblem === "empty") {
      nameWarningText = "Please enter a student ID";
    } else if (nameProblem === "invalid") {
      nameWarningText = "Not a valid student ID";
    }
  }

  $: {
    if (password === "") {
      passwordProblem = "empty";
    } else if (password.length >= 255 && $appState === "register") {
      passwordProblem = "long";
    } else {
      passwordProblem = "none";
    }
  }

  $: {
    if (passwordProblem === "none") {
      passwordWarningText = "";
    } else if (passwordProblem === "empty") {
      passwordWarningText = "Please enter a password";
    } else if (passwordProblem === "long") {
      passwordWarningText = "Password is too long";
    }
  }

  $: nameValid = nameProblem === "none";
  $: passwordValid = passwordProblem === "none";

  $: title = $appState === "login" ? "Login" : "Register";
  $: submitButtonText = $appState === "login" ? "Login" : "Register";
  $: redirectAddress = $appState === "login" ? "Register" : "Login";

  function errorHandling(error: any) {
    justFailed = true;
    if (error.response.status >= 500) {
      failMessage = "Failed to contact the server. Please try again";
    } else if (error.response.status >= 400) {
      const manMadeError = error.response.data
        .error as PossibleAuthenticationErrorManMade;
      console.log(error.response);
      if (manMadeError === "notRegistered") {
        failMessage = "User isn't registered. Please register first.";
      } else if (manMadeError === "registeredAlready") {
        failMessage = "User is already registered. Please login instead.";
      } else if (manMadeError === "wrongPassword") {
        failMessage = "Wrong Student ID or password";
      } else {
        failMessage = "Please try again.";
      }
    }
    console.log(error);
  }

  const mutateIsLoggedIn = useMutation(
    "isLoggedIn",
    async (user: User) => {
      return await ($appState === "login" ? login(user) : register(user));
    },
    {
      onSuccess: async () => {
        justFailed = false;
        failMessage = "";
        await queryClient.invalidateQueries("items");
        appState.set("trade");
      },
      onError: errorHandling,
      onSettled: () => {
        isSubmitting = false;
      },
    }
  );

  function reset() {
    name = undefined;
    password = "";

    nameJustStarted = true;
    passwordJustStarted = true;
    failMessage = "";
    justFailed = false;
  }

  async function handleSubmit(e) {
    isSubmitting = true;
    e.preventDefault();
    const user = { student_id: name.toString(), password } as User;
    try {
      await $mutateIsLoggedIn.mutateAsync(user);
    } catch {}
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
    <Title>{title}</Title>
    <form on:submit={handleSubmit}>
      <InputElement>
        <label for="name-input">Student ID (Must be 5 characters)</label>
        <InputContainer>
          <input
            id="name-input"
            name="name-input"
            type="number"
            min="0"
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
      {#if justFailed}
        <ResultText isSuccess={false}>
          {failMessage}
        </ResultText>
      {/if}
      <ButtonContainer>
        <button
          class="form-button return-button"
          type="button"
          on:click={() => {
            appState.set("trade");
            reset();
          }}
        >
          Back
        </button>
        <button
          class="form-button submit-button"
          type="submit"
          class:disabled-button={!dataValid}
          disabled={!dataValid}
        >
          {submitButtonText}
        </button>
      </ButtonContainer>
      <p class="redirect">
        {redirectText}
        <span
          on:click={() => {
            reset();
            if ($appState === "login") {
              appState.set("register");
            } else {
              appState.set("login");
            }
          }}>{redirectAddress}</span
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

  .redirect {
    font-size: 0.8em;
  }

  .redirect span {
    cursor: pointer;
    color: rgb(var(--secondary-color));
  }
</style>
