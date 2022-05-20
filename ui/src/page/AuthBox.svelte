<script>
  export let signupMode = false;
  import { onMount, getContext } from 'svelte';
  import { navigate } from 'svelte-routing';
  import Button from '../lib/Button.svelte';

  const auth = getContext('auth');
  let inputRef;
  let username = '';
  let password = '';
  let passwordConfirm = signupMode ? '' : null;
  let loading = false;
  let error = '';
  let errors = {
    usernameError: '',
    passwordError: ''
  };

  const handleSubmit = async () => {
    if (!username || !password || loading || (signupMode && !passwordConfirm)) return;

    error = '';
    loading = true;

    if (signupMode) {
      try {
        if (password !== passwordConfirm) {
          throw new Error('Passwords do not match.');
        }
        const data = await auth.signup(username, password);

        if (data.error) {
          error = data.error;
          if (data.usernameError) {
            errors = {...errors, usernameError: data.usernameError};
          }
          if (data.passwordError) {
            errors = {...errors, passwordError: data.passwordError};
          }
        }
      } catch (err) {
        error = err.message;
      } finally {
        loading = false;
      }
    } else {
      try {
        const data = await auth.login(username, password);

        if (data.error) {
          error = data.error;
        } else {
          username = '';
          password = '';
          passwordConfirm = '';
        }
      } catch (err) {
        error = err.message;
      } finally {
        loading = false;
      }
    }
  }

  onMount(() => {
    if ($auth) {
      navigate('/', {replace: true});
    } else {
      inputRef.focus();
    }
  })
</script>

<form class="form" on:submit|preventDefault={handleSubmit} autocomplete="off">
  <h2 class="title">
    {#if signupMode}
      Sign Up
    {:else}
      Login
    {/if}
  </h2>
  <div class="group">
    <label class="label" for="username">Username</label>
    <input class="input" type="text" bind:value={username} id="username" placeholder="Enter username..." bind:this={inputRef}>
    <p class="error">{errors.usernameError}</p>
  </div>
  <div class="group">
    <label class="label" for="password">Password</label>
    <input class="input" type="password" bind:value={password} id="password" placeholder="Enter password...">
    <p class="error">{errors.passwordError}</p>
  </div>
  {#if signupMode}
  <div class="group">
    <label class="label" for="confirmPassword">Confirm Password</label>
    <input class="input" type="password" bind:value={passwordConfirm} id="confirmPassword" placeholder="Enter password again...">
  </div>
  {/if}
  <div class="form-end">
    <p class="error">{error}</p>
    <Button type='submit' text={loading ? 'Submitting...' : 'Submit'} disabled={loading || !username || !password || (signupMode && !passwordConfirm)} />
  </div>
</form>

<style>
  .form {
    display: flex;
    flex-direction: column;
    max-width: 60rem;
    padding: 1rem;
    background-color: rgba(0, 0, 128, .75);
    height: 100%;
    border-radius: .5rem;
    margin: 1rem auto;
    color: #fff;
  }

  .title {
    text-align: center;
    margin: .5rem 0 1rem;
    font-size: 3rem;
    user-select: none;
  }

  .group {
    margin: 1rem 0;
  }

  .label {
    display: block;
    font-size: 2.5rem;
    font-weight: 900;
    padding: 0 0 .5rem 1.5rem;
    letter-spacing: .1rem;
  }

  .input {
    display: block;
    padding: .5rem .5rem .5rem 2rem;
    font-size: 1.8rem;
    width: 75%;
    margin: auto;
    outline: none;
    border-radius: .5rem;
    border: 0;
    border-bottom: solid .5rem rgb(255, 255, 255);
    background-color: transparent;
    color: #fff;
    transform: scale(0.9);
    opacity: .5;
    transition: all .3s ease;
  }

  .input:focus {
    transform: scale(1);
    opacity: 1;
  }

  .form-end {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: end;
    margin-top: auto;
  }

  .error {
    color: firebrick;
    min-height: 3rem;
    margin-bottom: .5rem;
    text-align: center;
    font-size: 2rem;
  }
</style>