<script lang="ts">
  import { appState } from "../stores";
</script>

<head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" />
  <link
    href="https://fonts.googleapis.com/css2?family=Kalam:wght@300;400;700&display=swap"
    rel="stylesheet"
  />
</head>

<main>
  <div id="content-container">
    <h1 id="title">Honest<br />Canteen</h1>
    <div id="button-container">
      <button
        class="option-container"
        on:click={async () => {
          appState.set("trade");
        }}
      >
        <h3 class="start-button-title">Start Trading</h3>
      </button>
    </div>
  </div>
</main>

<style>
  main {
    align-items: center;
    background-color: rgb(var(--primary-color));
    bottom: 0;
    color: rgb(var(--text-on-primary-element-color));
    display: flex;
    flex-direction: column;
    height: 100vh;
    justify-content: center;
    left: 0;
    width: 100%;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 100;
  }
  main * {
    color: rgb(var(--text-on-primary-element-color));
  }
  #content-container {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1.5em;
    height: 300px;
  }
  #button-container {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 1.5em;
  }
  #button-container button {
    margin: 0;
  }

  .option-container {
    align-items: center;
    background-color: rgba(var(--primary-color), 0);
    border: none;
    box-sizing: content-box;
    border-radius: var(--button-radius);
    color: rgb(var(--text-on-primary-element-color));
    cursor: pointer;
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    justify-content: center;
    padding: 0.25em;
    text-align: center;
    transition: all 0.25s ease-in-out;
  }

  .option-container:hover {
    background-color: rgb(var(--text-on-primary-element-color));
  }

  .option-container:hover .start-button-title {
    color: rgba(var(--primary-color), 1);
  }

  #title {
    font-family: "Kalam", cursive;
    text-align: center;
    font-size: 4em;
    font-weight: 700;
    line-height: 1.25em;
  }

  .start-button-title {
    font-size: 1.75em;
    font-weight: 700;
    transition: all 0.1s ease-in-out;
    width: 100%;
  }
</style>
