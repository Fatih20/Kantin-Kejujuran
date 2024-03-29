<script lang="ts">
  import {
    useMutation,
    useQuery,
    useQueryClient,
  } from "@sveltestack/svelte-query";

  import { appState } from "../stores";
  import type {
    PossibleAuthenticationErrorManMade,
    PossibleIDProblem,
    PossiblePasswordProblem,
    User,
  } from "../utilities/types";
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
  import RedirectText from "./parts/forms/RedirectText.svelte";

  const queryClient = useQueryClient();
  let isSubmitting = false;

  let name: number | null | undefined = undefined;
  let password: string = "";

  let showPassword = false;

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

  function errorHandling(error: any) {
    justFailed = true;
    if (error.response.status >= 500) {
      failMessage = "Failed to contact the server. Please try again";
    } else if (error.response.status >= 400) {
      const manMadeError = error.response.data
        .error as PossibleAuthenticationErrorManMade;
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
  }

  const mutateIsLoggedIn = useMutation(
    "isLoggedIn",
    async (user: User) => {
      return await login(user);
    },
    {
      onSuccess: async () => {
        justFailed = false;
        failMessage = "";
        await queryClient.invalidateQueries("isLoggedIn");
        appState.set("trade");
      },
      onError: errorHandling,
      onSettled: () => {
        isSubmitting = false;
      },
    }
  );

  async function handleSubmit() {
    isSubmitting = true;
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

<MainOfForm>
  <FormContainer>
    <Title>Login</Title>
    <form on:submit|preventDefault={handleSubmit}>
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
          <div class="input-and-button-container">
            {#if showPassword}
              <input
                id="password-input"
                name="password-input"
                type="text"
                bind:value={password}
                disabled={isSubmitting}
              />
              <button
                class="toggle-visibility-button"
                type="button"
                on:click={() => (showPassword = !showPassword)}
              >
                <i class="fa-solid fa-eye" />
              </button>
            {:else}
              <input
                id="password-input"
                name="password-input"
                type="password"
                bind:value={password}
                disabled={isSubmitting}
              />
              <button
                class="toggle-visibility-button"
                type="button"
                on:click={() => (showPassword = !showPassword)}
              >
                <i class="fa-solid fa-eye-slash" />
              </button>
            {/if}
          </div>
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
          Login
        </button>
      </ButtonContainer>
      <RedirectText
        redirectAddress={"Register"}
        redirectText={"Don't have an account yet?"}
        redirectFunction={() => appState.set("register")}
      />
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

  .input-and-button-container {
    align-items: center;
    display: flex;
    justify-content: center;
    gap: 0.5em;
  }

  .toggle-visibility-button {
    align-items: center;
    background-color: rgba(0, 0, 0, 0);
    border: none;
    color: rgb(var(--text-on-primary-element-color));
    display: flex;
    justify-content: center;
    padding: 0 5px;
    width: 20px;
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
</style>
