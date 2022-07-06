<script lang="ts">
  import {
    maxDescriptionLength,
    maxNameLength,
    successTextDuration,
  } from "../config/settings";

  import {
    useMutation,
    useQuery,
    useQueryClient,
  } from "@sveltestack/svelte-query";

  import { fade } from "svelte/transition";

  import { appState } from "../stores";
  import { uploadImage } from "../utilities/photosAPI";
  import type {
    ISoldItem,
    ISoldItemLite,
    PossibleNameProblem,
  } from "../utilities/types";
  import { fillItemInfo, validImageChecker } from "../utilities/utilities";
  import { addItem } from "../utilities/storeAPI";
  import Spacer from "./parts/Spacer.svelte";
  import FormContainer from "./parts/forms/FormContainer.svelte";
  import MainOfForm from "./parts/forms/MainOfForm.svelte";
  import InputContainer from "./parts/forms/InputContainer.svelte";
  import InputElement from "./parts/forms/InputContainer.svelte";
  import ButtonContainer from "./parts/forms/ButtonContainer.svelte";
  import InputWarning from "./parts/forms/InputWarning.svelte";
  import ResultText from "./parts/forms/ResultText.svelte";
  import Title from "./parts/forms/Title.svelte";

  const queryClient = useQueryClient();

  let showingResultText = false;
  let justFailed = false;

  let isSubmitting = false;

  let imageInputKey = {};

  let name: string = "";
  let price: number | null | undefined = undefined;
  let description: string = "";
  let imageFilename: string | null = null;
  let imageList: FileList | null = null;

  let nameProblem = "empty" as PossibleNameProblem;
  let descriptionProblem = "empty" as PossibleNameProblem;

  let nameJustStarted = true;
  let priceJustStarted = true;
  let descriptionJustStarted = true;
  let imageJustStarted = true;

  let nameWarningText = "";
  let descriptionWarningText = "";
  let priceWarningText = "";
  let imageWarningText = "";

  let dataValid = false;

  $: dataValid = [nameValid, priceValid, descriptionValid, imageValid].every(
    (validity) => validity === true
  );

  $: {
    if (name !== "") {
      nameJustStarted = false;
    }
  }

  $: {
    if (description !== "") {
      descriptionJustStarted = false;
    }
  }

  $: {
    if (name === "") {
      nameProblem = "empty";
    } else if (name.length > maxNameLength) {
      nameProblem = "long";
    } else {
      nameProblem = "none";
    }
  }

  $: {
    if (description === "") {
      descriptionProblem = "empty";
    } else if (description.length > maxDescriptionLength) {
      descriptionProblem = "long";
    } else {
      descriptionProblem = "none";
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

  $: {
    if (descriptionProblem === "none") {
      descriptionWarningText = "";
    } else if (descriptionProblem === "empty") {
      descriptionWarningText = "Please enter a description";
    } else if (descriptionProblem === "long") {
      descriptionWarningText = "Description entered is too long";
    }
  }

  $: {
    if (!priceValid) {
      priceWarningText = "Please enter a positive number";
    } else {
      priceWarningText = "";
    }
  }

  $: {
    if (price !== undefined) {
      priceJustStarted = false;
    } else {
      priceJustStarted = true;
    }
  }

  $: {
    if (!imageValid) {
      imageWarningText = "Not an acceptable image";
    } else {
      imageWarningText = "";
    }
  }

  $: {
    if (imageFilename !== null) {
      imageJustStarted = false;
    } else {
      imageJustStarted = true;
    }
  }

  $: {
    if (!validImageChecker(imageFilename)) {
      imageWarningText = "Invalid type of image";
    } else if (imageFilename === null) {
      imageWarningText = "Please upload an image";
    }
  }

  $: nameValid = nameProblem === "none";
  $: priceValid = price > 0 && price !== null;
  $: descriptionValid = descriptionProblem === "none";
  $: imageValid = validImageChecker(imageFilename) && imageList !== null;

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
    imageInputKey = {};
    name = "";
    price = undefined;
    description = "";
    imageFilename = null;
    imageList = null;

    nameJustStarted = true;
    priceJustStarted = true;
    descriptionJustStarted = true;
    imageJustStarted = true;
  }

  async function handleSubmit(e) {
    isSubmitting = true;
    e.preventDefault();
    const { isError, retrievedData } = await uploadImage(imageList[0]);
    if (!isError) {
      const { url: imagelink } = retrievedData;
      const newSoldItem = {
        name,
        price,
        description,
        imagelink,
      } as ISoldItemLite;
      try {
        await $mutateItems.mutateAsync(fillItemInfo(newSoldItem));
      } catch (error) {
        console.log(error);
      }
    } else {
      justFailed = true;
    }
    isSubmitting = false;
    showingResultText = true;
    setTimeout(() => {
      showingResultText = false;
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
    <Title>What's the item?</Title>
    <form on:submit={handleSubmit}>
      <InputElement>
        <label for="image-input">Any photo of it? (JPG or PNG)</label>
        <InputContainer>
          {#key imageInputKey}
            <input
              id="image-input"
              name="image-input"
              type="file"
              accept="image/png, image/jpeg"
              bind:value={imageFilename}
              bind:files={imageList}
              disabled={isSubmitting}
            />
          {/key}
          <InputWarning valid={imageValid || imageJustStarted}>
            {imageWarningText}
          </InputWarning>
        </InputContainer>
      </InputElement>
      <InputElement>
        <label for="name-input"
          >What's its name? ({`${name.length} / ${maxNameLength}`})</label
        >
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
        <label for="price-input">What is it worth? (Rp)</label>
        <InputContainer>
          <input
            id="price-input"
            name="price-input"
            type="number"
            min="0"
            bind:value={price}
            disabled={isSubmitting}
          />
          <InputWarning valid={priceValid || priceJustStarted}>
            {priceWarningText}
          </InputWarning>
        </InputContainer>
      </InputElement>
      <InputElement>
        <label for="description-input"
          >Describe it ({`${description.length} / ${maxDescriptionLength}`})</label
        >
        <InputContainer>
          <textarea
            id="description-input"
            name="description"
            type="text"
            min="0"
            bind:value={description}
            rows="5"
            cols="20"
            disabled={isSubmitting}
          />
          <InputWarning valid={descriptionValid || descriptionJustStarted}>
            {descriptionWarningText}
          </InputWarning>
        </InputContainer>
      </InputElement>
      <ButtonContainer>
        <button
          class="form-button"
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
          class="form-button"
          type="submit"
          class:disabled-button={!dataValid}
          disabled={!dataValid}
        >
          Sell
        </button>
      </ButtonContainer>
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

  textarea {
    resize: vertical;
    margin: 0;
    max-width: 100%;
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
</style>
