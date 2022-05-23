<script>
  export let onClose = null;
  import Button from './Button.svelte';
  import { scale } from 'svelte/transition';
</script>

<div class="window" in:scale>
  <slot />
  <div class="close">
    <Button text="X" bg="firebrick" onClick={onClose} />
  </div>
</div>

<style>
  .window {
    position: relative;
    width: 100%;
    max-width: 80rem;
    height: 60rem;
    background-color: rgba(0, 0, 128, 0.75);
    color: #fff;
    padding: 0.5rem;
    margin: 1rem auto;
    border-radius: 0.5rem;
  }

  .close {
    position: absolute;
    top: 0.5%;
    left: 99.5%;
    transform: translate(-80%, -10%) scale(0.75);
  }

  @media only screen and (min-width: 50rem) {
    .close {
      transform: translate(-80%, -10%) scale(0.5);
    }
  }
</style>
