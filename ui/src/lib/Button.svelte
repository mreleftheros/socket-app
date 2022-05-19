<script>
  export let text = '', type = 'button', onClick = null, disabled = false, bg = '#111', color = '#fff';
</script>

<button class="btn" {type} on:click={onClick} class:disabled style={`background-color: ${bg}; color: ${color};`}>
  {text}
</button>

<style>
  .btn {
    cursor: pointer;
    border: 0;
    border-radius: .5rem;
    padding: .5rem 1.5rem;
    font-size: 1.8rem;
    transition: transform .15s ease;
  }

  .disabled {
    cursor: auto;
    opacity: .5;
  }

  .btn:hover:not(.disabled) {
    transform: scale(0.975);
  }
</style>