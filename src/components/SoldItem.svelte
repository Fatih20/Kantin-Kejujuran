<script lang="ts">
  export let name: string;
  export let price: number;
  export let description: string;
</script>

<main>
  <p>{name}</p>
  <p>{price}</p>
  <p>{description}</p>
</main>

<style>
  main {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
</style>
