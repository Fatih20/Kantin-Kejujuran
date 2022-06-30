<script lang="ts">
  import { maxDescriptionLength, maxNameLength } from "../config";

  import { soldItemList } from "../stores";
  import type { ISoldItemLite, PossibleNameProblem } from "../utilities/types";

  let name: string = "";
  let price: number | null = null;
  let description: string = "";

  let nameProblem = "empty" as PossibleNameProblem;
  let descriptionProblem = "empty" as PossibleNameProblem;

  let nameJustStarted = true;
  let priceJustStarted = true;
  let descriptionJustStarted = true;

  let nameWarningText = "";
  let descriptionWarningText = "";

  let dataValid = false;

  $: dataValid = nameValid && priceValid && descriptionValid;

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

  $: nameValid = nameProblem === "none";
  $: priceValid = price > 0 && price !== null;
  $: descriptionValid = descriptionProblem === "none";
  // let imageLink : string;

  function reset() {
    name = "";
    price = null;
    description = "";

    nameJustStarted = true;
    priceJustStarted = true;
    descriptionJustStarted = true;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newSoldItem = { name, price, description } as ISoldItemLite;
    soldItemList.insert(newSoldItem);
    reset();
  }
</script>

<main on:click={(e) => e.stopPropagation()}>
  <form on:submit={handleSubmit}>
    <div class="input-element">
      <label for="name-input"
        >Item Name ({`${name.length} / ${maxNameLength}`})</label
      >
      <div class="name-input-container">
        <input id="name-input" name="name" bind:value={name} />
        <p
          class="name-warning"
          class:name-not-valid-warning={!nameValid && !nameJustStarted}
        >
          {nameWarningText}
        </p>
      </div>
    </div>
    <div class="input-element">
      <label for="price-input">Item Price</label>
      <div class="price-input-container">
        <input
          id="price-input"
          name="price"
          type="number"
          min="0"
          bind:value={price}
          on:keydown={() => (priceJustStarted = false)}
        />
        <p
          class="name-warning"
          class:name-not-valid-warning={!priceValid && !priceJustStarted}
        >
          Please enter a positive number
        </p>
      </div>
    </div>
    <div class="input-element">
      <label for="description-input"
        >Item Description ({`${description.length} / ${maxDescriptionLength}`})</label
      >
      <div class="description-input-container">
        <textarea
          id="description-input"
          name="description"
          type="text"
          min="0"
          bind:value={description}
          rows="5"
        />
        <p
          class="name-warning"
          class:name-not-valid-warning={!descriptionValid &&
            !descriptionJustStarted}
        >
          {descriptionWarningText}
        </p>
      </div>
    </div>
    <button
      class="submit-button"
      type="submit"
      class:submit-button-disabled={!dataValid}
      disabled={!dataValid}
    >
      Add Item
    </button>
  </form>
</main>

<style>
  main {
    align-items: center;
    background-color: rgb(var(--primary-color));
    border-radius: var(--button-radius);
    box-sizing: border-box;
    /* border: solid 2px white; */
    color: rgb(var(--text-on-primary-element-color));
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    justify-content: flex-start;
    padding: 0.5em 1em;
    width: 100%;
    max-width: 300px;
    min-height: 100px;
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
    font-weight: 500;
  }

  .name-input-container {
    align-content: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.25em;
    width: 100%;
  }
  .name-input-container input {
    width: 100%;
  }
  .name-warning {
    display: none;
    color: rgb(var(--warning-color-bg));
  }
  .name-not-valid-warning {
    display: inline;
  }

  .submit-button {
    background-color: rgb(var(--text-on-primary-element-color));
    border-radius: var(--button-smaller-radius);
    color: rgb(var(--primary-color));
    cursor: pointer;
    font-weight: 600;
    transition: all 0.25s ease-in-out;
    /* font-size: 1em; */
    margin: 0;
    /* width: 75px; */
    padding: 7px;
  }

  textarea {
    width: 100%;
    max-width: 100%;
  }
  .submit-button-disabled {
    --border-color: var(--disabled-color);
    background-color: rgb(var(--disabled-color));
    color: rgb(var(--text-on-disabled-element-color));
  }
</style>
