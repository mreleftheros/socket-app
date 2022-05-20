<script>
  import { onMount, getContext } from 'svelte';
  import Button from './Button.svelte';

  const auth = getContext('auth');
  const { onSend } = getContext('ws');
  let inputRef;
  let message = '';
  $: if (!message && inputRef) {
    inputRef.focus()
  }

  const handleSubmit = () => {
    if (!message) return;

    onSend('SET_MESSAGE', {
      _id: $auth._id,
      username: $auth.username,
      message
    });

    message = '';
  }

  onMount(() => {
    inputRef.focus();
  })
</script>

<form class="form" on:submit|preventDefault={handleSubmit}>
  <input class="input" type="text" bind:this={inputRef} bind:value={message} placeholder='Enter your message...'>
  <Button type='submit' text='Enter' bg='orangered' disabled={!message} />
</form>

<style>
  .form {
    display: flex;
  }

  .input {
    flex: 1;
    outline: none;
    font-size: 2rem;
    padding: .5rem;
  }
</style>