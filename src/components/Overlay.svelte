<script lang="ts">
  import { overlayEventText } from "../config/settings";
  import { overlayState } from "../stores";
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

<main>
  {#if $overlayState["state"] === "ongoing"}
    <div class="icon-container">
      <i class="fa-solid fa-spinner" />
    </div>
  {/if}
  <h2 class={$overlayState["state"]}>
    {overlayEventText[$overlayState["event"]][$overlayState["state"]]}
  </h2>
</main>

<style>
  main {
    align-items: center;
    box-sizing: border-box;
    background-color: rgba(0, 0, 0, 0.5);
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    left: 0;
    padding: 1em;
    position: fixed;
    right: 0;
    top: 0;
    width: 100%;
    z-index: 10000;
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

  .icon-container {
    font-size: 3em;
    animation: spinning 1s linear 0s infinite;
  }

  h2 {
    display: inline-block;
    border-radius: var(--button-radius);
    font-size: 1.5em;
    padding: 4px 8px;
    transition: opacity 0.25s ease-in-out;
    text-align: center;
  }

  .success {
    background-color: rgb(var(--success-color-bg));
    color: rgb(var(--success-color-fg));
  }

  .fail {
    background-color: rgb(var(--warning-color-bg));
    color: rgb(var(--warning-color-fg));
  }
</style>
