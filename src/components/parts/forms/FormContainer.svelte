<div class="form-container">
  <slot />
</div>

<style>
  .form-container {
    align-items: center;
    background-color: rgb(var(--primary-color));
    box-sizing: border-box;
    border-radius: var(--button-radius);
    color: rgb(var(--text-on-primary-element-color));
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 1em;
  }
</style>
