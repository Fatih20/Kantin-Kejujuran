<script lang="ts">
  import FormContainer from "./parts/forms/FormContainer.svelte";
  import MainOfForm from "./parts/forms/MainOfForm.svelte";
  import Title from "./parts/forms/Title.svelte";
  import InputElement from "./parts/forms/InputElement.svelte";
  import InputContainer from "./parts/forms/InputContainer.svelte";
  import InputWarning from "./parts/forms/InputWarning.svelte";
  import type {
    PossibleAuthenticationErrorManMade,
    PossibleIDProblem,
    PossiblePasswordProblem,
    User,
  } from "../utilities/types";
  import { appState } from "../stores";
  import { useMutation, useQueryClient } from "@sveltestack/svelte-query";
  import { register } from "../utilities/userAPI";
  import { IDValidation } from "../utilities/utilities";
  import ResultText from "./parts/forms/ResultText.svelte";
  import ButtonContainer from "./parts/forms/ButtonContainer.svelte";
  import RedirectText from "./parts/forms/RedirectText.svelte";

  const queryClient = useQueryClient();
  let isSubmitting = false;

  let name: number | null | undefined = undefined;
  let password: string = "";
  let passwordSecond: string = "";

  let nameProblem = "empty" as PossibleIDProblem;
  let passwordProblem = "empty" as PossiblePasswordProblem;
  let passwordSecondProblem = "none" as "none" | "different";

  let nameJustStarted = true;
  let passwordJustStarted = true;
  let passwordSecondJustStarted = true;
  let justFailed = false;
  let failMessage = "";

  let nameWarningText = "";
  let passwordWarningText = "";
  let passwordSecondWarningText = "";

  let dataValid = false;

  $: dataValid = [nameValid, passwordValid, passwordSecondValid].every(
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
    if (
      passwordSecond.length >= password.length &&
      passwordSecond !== "" &&
      password !== ""
    ) {
      passwordSecondJustStarted = false;
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
    if (passwordSecond !== password) {
      passwordSecondProblem = "different";
    } else {
      passwordSecondProblem = "none";
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

  $: {
    if (passwordSecondProblem === "none") {
      passwordSecondWarningText = "";
    } else if (passwordSecondProblem === "different") {
      passwordSecondWarningText = "Confirmation is different!";
    }
  }

  $: nameValid = nameProblem === "none";
  $: passwordValid = passwordProblem === "none";
  $: passwordSecondValid = passwordSecondProblem === "none";

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
      return await register(user);
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

  async function handleSubmit(e) {
    isSubmitting = true;
    const user = { student_id: name.toString(), password } as User;
    try {
      await $mutateIsLoggedIn.mutateAsync(user);
    } catch {}
  }
</script>

<MainOfForm>
  <FormContainer>
    <Title>Register</Title>
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
          <input
            id="password-input"
            name="password-input"
            type="password"
            bind:value={password}
            disabled={isSubmitting}
          />
          <InputWarning valid={passwordValid || passwordJustStarted}>
            {passwordWarningText}
          </InputWarning>
        </InputContainer>
      </InputElement>
      <InputElement>
        <label for="password-second-input">Confirm Password</label>
        <InputContainer>
          <input
            id="password-second-input"
            name="password-input"
            type="password"
            bind:value={passwordSecond}
            disabled={isSubmitting}
          />
          <InputWarning
            valid={passwordSecondValid || passwordSecondJustStarted}
          >
            {passwordSecondWarningText}
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
          Register
        </button>
      </ButtonContainer>
      <RedirectText
        redirectAddress={"Login"}
        redirectText={"Already have an account?"}
        redirectFunction={() => appState.set("login")}
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
