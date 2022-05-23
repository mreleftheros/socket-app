<script>
  import { onMount, getContext } from 'svelte';
  import Button from './Button.svelte';

  const auth = getContext('auth');
  const ws = getContext('ws');
  let inputRef;
  let message = '';
  $: if (!message && inputRef) {
    inputRef.focus();
  }

  const handleSubmit = () => {
    if (!message) return;
    $ws.send(
      JSON.stringify({
        type: 'SET_MESSAGE',
        payload: {
          _id: $auth._id,
          username: $auth.username,
          message,
        },
      })
    );

    message = '';
  };

  onMount(() => {
    inputRef.focus();
  });
</script>

<form class="form" on:submit|preventDefault={handleSubmit}>
  <input
    class="input"
    type="text"
    bind:this={inputRef}
    bind:value={message}
    placeholder="Enter your message..."
  />
  <Button type="submit" text="Enter" bg="orangered" disabled={!message} />
</form>

<style>
  .form {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .input {
    flex: 1;
    outline: none;
    font-size: 2rem;
    padding: 0.5rem;
  }

  @media only screen and (min-width: 50rem) {
    .form {
      flex-direction: row;
    }
  }
</style>
