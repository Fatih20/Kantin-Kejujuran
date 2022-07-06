<script lang="ts">
  import {
    appState,
    isLoggingOut,
    showLogoutResultText,
    justFailedLogout,
    isDeletingAccount,
    justFailedDeletingAccount,
    showDeleteAccountResultText,
  } from "../stores";
  import useIsLoggedIn from "../utilities/useMe";
  import { useQueryClient, useMutation } from "@sveltestack/svelte-query";
  import { isLoggedInProcessor } from "../utilities/utilities";
  import Spacer from "./parts/Spacer.svelte";
  import { logout, deleteAccount } from "../utilities/userAPI";
  import { showBuyingResultDuration } from "../config";

  const isLoggedInRaw = useIsLoggedIn();
  const queryClient = useQueryClient();

  $: isLoggedIn = isLoggedInProcessor($isLoggedInRaw);

  $: disableLoginButton = $appState === "login" || $appState === "register";

  $: disableAddButton = $appState === "add" || !isLoggedIn;

  let showDropdownAccount = false;

  const logoutMutation = useMutation(
    "isLoggedIn",
    async () => {
      return await logout();
    },
    {
      onSuccess: async () => {
        await setTimeout(() => {
          showLogoutResultText.set(false);
        }, showBuyingResultDuration);
        window.location.reload();
      },
      onError: () => {
        justFailedLogout.set(true);
      },
      onSettled: () => {
        showLogoutResultText.set(true);
        isLoggingOut.set(false);
      },
    }
  );

  const deleteAccountMutation = useMutation(
    "isLoggedIn",
    async () => {
      return await deleteAccount();
    },
    {
      onSuccess: async () => {
        await setTimeout(() => {
          showDeleteAccountResultText.set(false);
        }, showBuyingResultDuration);
        window.location.reload();
      },
      onError: () => {
        justFailedDeletingAccount.set(true);
      },
      onSettled: () => {
        showDeleteAccountResultText.set(true);
        isDeletingAccount.set(false);
      },
    }
  );

  async function handleLogout() {
    isLoggingOut.set(true);
    $logoutMutation.mutateAsync();
  }

  async function handleDeleteAccount() {
    isDeletingAccount.set(true);
    $deleteAccountMutation.mutateAsync();
  }

  async function handleAuthenticationClick() {
    showDropdownAccount = !showDropdownAccount;
    // if (isLoggedIn) {
    //   isLoggingOut.set(true);
    //   $mutateIsLoggedIn.mutateAsync();
    // } else {
    //   appState.set("login");
    // }
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
    <div class="dropdown-account-container">
      <button
        class="header-button user-button"
        class:header-button-disabled={disableLoginButton}
        disabled={disableLoginButton}
        on:click={handleAuthenticationClick}
      >
        <i class="fa-solid fa-user" />
        <!-- class:fa-flip-horizontal={} -->
        <!-- {#if isLoggedIn}
          <i class="fa-solid fa-person-booth fa-flip-horizontal" />
        {:else}
          <i class="fa-solid fa-person-booth" />
        {/if} -->
      </button>
      <div
        class="dropdown-account"
        class:dropdown-account-visible={showDropdownAccount}
      >
        {#if isLoggedIn}
          <p on:click|stopPropagation={handleDeleteAccount}>Delete Account</p>
          <p on:click|stopPropagation={handleLogout}>Log Out</p>
        {:else}
          <p
            on:click|stopPropagation={() => {
              showDropdownAccount = false;
              appState.set("register");
            }}
          >
            Register
          </p>
          <p
            on:click|stopPropagation={() => {
              showDropdownAccount = false;
              appState.set("login");
            }}
          >
            Sign In
          </p>
          <!-- <i class="fa-solid fa-person-booth" /> -->
        {/if}
      </div>
    </div>
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
    --dropdown-gap-to-header: 10px;
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
    height: 100%;

    /* border: solid 1px white; */
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

  .dropdown-account-container {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    height: 100%;

    /* border: solid 1px white; */
  }

  .dropdown-account {
    align-items: flex-start;
    background-color: rgb(var(--primary-color));
    border-radius: var(--button-radius);
    display: none;
    flex-direction: column;
    gap: 0.25em;
    justify-content: center;
    padding: 0.25em;
    position: absolute;
    left: 0;
    top: calc(100% + var(--dropdown-gap-to-header));
    /* transform: translate(0, -20px); */
    width: 100px;
    z-index: 1;
  }

  .dropdown-account-visible {
    display: flex;
    transform: none;
  }
</style>
