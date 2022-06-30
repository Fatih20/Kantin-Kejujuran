<script lang="ts">
  import { storeBalance } from "../stores";
  import { priceDenominator } from "../utilities/utilities";
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
  <div class="money-container">
    <i class="fa-solid fa-money-bill-wave money-icon" />
    <p class="store-balance">{priceDenominator($storeBalance)}</p>
  </div>
</main>

<style>
  main {
    align-items: center;
    align-self: flex-start;
    background-color: rgb(var(--primary-color));
    color: rgb(var(--text-on-primary-element-color));
    height: 50px;
    display: flex;
    justify-content: center;
    width: 100%;
  }

  .money-container {
    align-items: center;
    display: flex;
    gap: 0.5em;
    justify-content: center;
    height: 100%;
  }

  .store-balance {
    font-weight: 600;
  }

  .money-icon {
    font-size: 1.5em;
  }
</style>
