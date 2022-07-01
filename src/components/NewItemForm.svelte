<script lang="ts">
  import { maxDescriptionLength, maxNameLength } from "../config";

  import { createEventDispatcher } from "svelte";
  import { appState, soldItemList } from "../stores";
  import type { ISoldItemLite, PossibleNameProblem } from "../utilities/types";
  import { validImageChecker } from "../utilities/utilities";

  let dispatch = createEventDispatcher();

  let name: string = "";
  let price: number | null | undefined = undefined;
  let description: string = "";
  let imageFilename: string | null = null;
  let image: FileList | null = null;

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
      nameWarningText = "Description entered is too long";
    }
  }

  $: {
    if (descriptionProblem === "none") {
      descriptionWarningText = "";
    } else if (descriptionProblem === "empty") {
      descriptionWarningText = "Please enter a description";
    } else if (descriptionProblem === "long") {
      descriptionWarningText = "Name entered is too long";
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
      image;
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
  $: imageValid = validImageChecker(imageFilename) && image !== null;
  // let imageLink : string;

  function reset() {
    dispatch("reset");
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newSoldItem = {
      name,
      price,
      description,
      image: image[0],
    } as ISoldItemLite;
    soldItemList.insert(newSoldItem);
    reset();
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

<main on:click={(e) => e.stopPropagation()}>
  <h2>Adding New Item</h2>
  <form on:submit={handleSubmit}>
    <div class="input-element">
      <label for="image-input">Item Image (JPG or PNG)</label>
      <div class="input-container">
        <input
          id="image-input"
          name="image-input"
          type="file"
          accept="image/png, image/jpeg"
          bind:value={imageFilename}
          bind:files={image}
        />
        <p
          class="input-warning"
          class:input-not-valid-warning={!imageValid && !imageJustStarted}
        >
          {imageWarningText}
        </p>
      </div>
    </div>
    <div class="input-element">
      <label for="name-input"
        >Item Name ({`${name.length} / ${maxNameLength}`})</label
      >
      <div class="input-container">
        <input id="name-input" name="name-input" bind:value={name} />
        <p
          class="input-warning"
          class:input-not-valid-warning={!nameValid && !nameJustStarted}
        >
          {nameWarningText}
        </p>
      </div>
    </div>
    <div class="input-element">
      <label for="price-input">Item Price</label>
      <div class="input-container">
        <input
          id="price-input"
          name="price-input"
          type="number"
          min="0"
          bind:value={price}
        />
        <p
          class="input-warning"
          class:input-not-valid-warning={!priceValid && !priceJustStarted}
        >
          {priceWarningText}
        </p>
      </div>
    </div>
    <div class="input-element">
      <label for="description-input"
        >Item Description ({`${description.length} / ${maxDescriptionLength}`})</label
      >
      <div class="input-container">
        <textarea
          id="description-input"
          name="description"
          type="text"
          min="0"
          bind:value={description}
          rows="5"
          cols="20"
        />
        <p
          class="input-warning"
          class:input-not-valid-warning={!descriptionValid &&
            !descriptionJustStarted}
        >
          {descriptionWarningText}
        </p>
      </div>
    </div>
    <div class="button-container">
      <button
        class="return-button"
        type="submit"
        on:click={() => appState.set("trade")}
      >
        <i class="fa-solid fa-arrow-left" />
      </button>
      <div class="spacer" />
      <button
        class="submit-button"
        type="submit"
        class:submit-button-disabled={!dataValid}
        disabled={!dataValid}
      >
        <i class="fa-solid fa-plus" />
      </button>
    </div>
  </form>
</main>

<style>
  main {
    align-items: center;
    background-color: rgb(var(--text-on-primary-element-color));
    box-sizing: border-box;
    /* border: solid 2px white; */
    color: rgb(var(--primary-color));
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    gap: 0.5em;
    justify-content: flex-start;
    padding: 0.5em 1em;
    width: 100%;

    /* border: solid 1px black; */
  }

  form {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.5em;
  }

  .input-element {
    align-items: flex-start;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.5em;
    padding: 0;
    width: 100%;
  }
  label {
    font-weight: 600;
  }

  .input-container,
  .input-container,
  .input-container {
    align-content: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.25em;
    width: 100%;
  }

  input {
    margin: 0;
    width: 100%;
  }
  .input-warning {
    display: none;
    color: rgb(var(--warning-color-bg));
    font-weight: 500;
  }
  .input-not-valid-warning {
    display: inline;
  }

  textarea {
    resize: vertical;
    max-width: 100%;
    width: 100%;
  }
  .button-container {
    align-items: center;
    display: flex;
    justify-content: center;
    width: 100%;
  }

  button {
    background-color: rgb(var(--primary-color));
    border-radius: var(--button-smaller-radius);
    border: none;
    color: rgb(var(--text-on-primary-element-color));
    font-weight: 600;
    transition: all 0.25s ease-in-out;
    /* font-size: 1em; */
    margin: 0;
    /* width: 75px; */
    padding: 7px;
  }

  .spacer {
    flex-grow: 1;
  }
  .submit-button-disabled {
    --border-color: var(--disabled-color);
    background-color: rgb(var(--disabled-color));
    color: rgb(var(--text-on-disabled-element-color));
  }
</style>
