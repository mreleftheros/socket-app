<script>
  export let text = '',
    type = 'button',
    onClick = null,
    disabled = false,
    bg = '#111',
    color = '#fff';
</script>

<button
  class="btn"
  {type}
  on:click={onClick}
  class:disabled
  style={`background-color: ${bg}; color: ${color};`}
>
  {text}
</button>

<style>
  .btn {
    cursor: pointer;
    border: 0;
    border-radius: 0.5rem;
    font-size: 1.8;
    padding: 0.3rem 0.5rem;
    transition: transform 0.15s ease;
  }

  .disabled {
    cursor: auto;
    opacity: 0.5;
  }

  .btn:hover:not(.disabled) {
    transform: scale(0.975);
  }

  @media only screen and (min-width: 50rem) {
    .btn {
      padding: 0.5rem 1.5rem;
    }
  }
</style>
