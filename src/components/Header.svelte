<script lang="ts">
  import {
    appState,
    isLoggingOut,
    showLogoutResultText,
    justFailedLogout,
  } from "../stores";
  import useIsLoggedIn from "../utilities/useMe";
  import { useQueryClient } from "@sveltestack/svelte-query";
  import { isLoggedInProcessor } from "../utilities/utilities";
  import Spacer from "./parts/Spacer.svelte";
  import { logout } from "../utilities/userAPI";
  import { showBuyingResultDuration } from "../config";

  const isLoggedInRaw = useIsLoggedIn();
  const queryClient = useQueryClient();

  $: isLoggedIn = isLoggedInProcessor($isLoggedInRaw);

  $: disableLoginButton = $appState === "login" || $appState === "register";

  $: disableAddButton = $appState === "add" || !isLoggedIn;

  async function handleAuthenticationClick() {
    if (isLoggedIn) {
      isLoggingOut.set(true);
      try {
        const { data } = await logout();
        if (data.message !== "Logout successful") {
          justFailedLogout.set(true);
          return;
        }
        await queryClient.invalidateQueries("isLoggedIn");
      } catch (error) {
        justFailedLogout.set(true);
        console.log(error);
      }

      showLogoutResultText.set(true);
      isLoggingOut.set(false);
      if (!$justFailedLogout) {
        window.location.reload();
      } else {
        await setTimeout(() => {
          showLogoutResultText.set(false);
        }, showBuyingResultDuration);
      }
    } else {
      appState.set("login");
    }
  }
</script>

<head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" />
  <link
    href="https://fonts.googleapis.com/css2?family=Kalam:wght@300;400;700&display=swap"
    rel="stylesheet"
  />
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

<main class:header-in-add={$appState === "add"}>
  <div class="header-container">
    <button
      class="header-button login-button"
      class:header-button-disabled={disableLoginButton}
      disabled={disableLoginButton}
      on:click={handleAuthenticationClick}
    >
      <!-- class:fa-flip-horizontal={} -->
      {#if isLoggedIn}
        <i class="fa-solid fa-person-booth fa-flip-horizontal" />
      {:else}
        <i class="fa-solid fa-person-booth" />
      {/if}
    </button>
    <Spacer />
    <h1 class="title" on:click={() => appState.set("startPage")}>HC</h1>
    <Spacer />
    <button
      class="header-button add-button"
      on:click={() => appState.set("add")}
      class:header-button-disabled={disableAddButton}
      disabled={disableAddButton}
    >
      <i class="fa-solid fa-plus" />
    </button>
  </div>
</main>

<style>
  main {
    align-items: center;
    align-self: flex-start;
    background-color: rgb(var(--primary-color));
    box-sizing: border-box;
    border-bottom: solid 2px rgb(var(--primary-border-color));
    color: rgb(var(--text-on-primary-element-color));
    display: flex;
    /* height: 50px; */
    justify-content: center;
    padding: 0 var(--side-edge-gap);
    width: 100%;

    /* border: solid 1px white; */
  }

  .header-container {
    align-items: center;
    display: flex;
    justify-content: space-between;
    max-width: var(--headfoot-max-width);
    width: 100%;
  }

  .header-in-add {
    justify-content: center;
  }

  .title {
    /* align-self: center; */
    cursor: pointer;
    font-family: "Kalam", cursive;
    font-size: 1.75em;
    user-select: none;

    /* border: solid 1px black; */
  }

  .header-button {
    align-self: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0);
    border: none;
    color: rgb(var(--text-on-primary-element-color));
    display: flex;
    justify-content: center;
    font-size: 1.25em;
    margin: 0;
    padding: 0;
    width: 30px;
    transition: transform 0.25s ease-in-out;

    /* border: solid 1px black; */
  }

  .add-button:hover {
    transform: rotate(180deg);
  }

  .header-button-disabled {
    /* display: none; */
    opacity: 0;
  }
</style>
