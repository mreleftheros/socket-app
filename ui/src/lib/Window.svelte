<script>
  export let onClose = null;
  import Button from './Button.svelte';
</script>

<div class="window">
  <slot />
  <div class="close">
    <Button text='X' bg='firebrick' onClick={onClose} />
  </div>
</div>

<style>
  .window {
    position: relative;
    width: 80rem;
    max-width: 90%;
    height: 40rem;
    background-color: rgba(0, 0, 128, .75);
    color: #fff;
    padding: .5rem;
    margin: 1rem auto;
    border-radius: .5rem;
  }

  .close {
    position: absolute;
    top: .5%;
    left: 99.5%;
    transform: translate(-80%, -10%) scale(0.5);
  }
</style>