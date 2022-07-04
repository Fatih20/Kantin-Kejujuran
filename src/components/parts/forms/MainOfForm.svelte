<main>
  <slot />
</main>

<style>
  main {
    align-items: center;
    background-color: rgba(0, 0, 0, 0);
    box-sizing: border-box;
    /* border: solid 2px white; */
    color: rgb(var(--primary-color));
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    justify-content: center;
    padding: 0.5em 1em;
    width: 100%;
  }
</style>
