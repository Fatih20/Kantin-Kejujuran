<script lang="ts">
  import Spacer from "./parts/Spacer.svelte";

  export let overallSortingText: string;
  export let secondSortingText: string;
  export let firstSortingText: string;
  export let handleSortChanges: (boolean) => void;
</script>

<main>
  <p class="sort-text">Sort Method: <span>{overallSortingText}</span></p>
  <Spacer />
  <div class="sort-button-container">
    <button class="sort-button" on:click={() => handleSortChanges(true)}
      >{secondSortingText}</button
    >
    <button class="sort-button" on:click={() => handleSortChanges(false)}
      >{firstSortingText}</button
    >
  </div>
</main>

<style>
  main {
    align-items: center;
    display: flex;
    gap: 0.5em;
    justify-content: center;
    width: 100%;
  }

  .sort-text,
  .sort-button {
    font-weight: 500;
  }

  .sort-text {
    user-select: none;
  }

  .sort-text span {
    font-weight: 400;
  }

  .sort-button-container {
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    gap: 0.25em;
    text-align: left;
    justify-content: flex-end;
  }

  .sort-button {
    background-color: rgb(var(--text-on-primary-element-color));
    color: rgb(var(--primary-color));
    border-radius: var(--button-radius);
    cursor: pointer;
    margin: 0;
    padding: 0.2em;
  }
</style>
