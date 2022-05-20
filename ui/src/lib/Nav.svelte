<script>
  import NavLink from './NavLink.svelte';
  import Button from './Button.svelte';
  import { getContext } from 'svelte';

  const auth = getContext('auth');
</script>

<nav class="nav">
  <div class="logo-box">
    <NavLink text='Socket App' active />
  </div>
  <ul class="links">
    {#if $auth}
      <li class="link">
        Welcome, <span class="name">{$auth.username}</span>
      </li>
      <li class="link">
        <NavLink to='/profile' text='My Profile' />
      </li>
      <li class="link">
        <Button text='Logout' bg='navy' onClick={auth.logout} />
      </li>
    {:else}
      <li class="link">
        <NavLink to='/login' text='Login' />
      </li>
      <li class="link">
        <NavLink to='/signup' text='Signup' />
      </li>
    {/if}
  </ul>
</nav>

<style>
  .nav {
    display: flex;
    height: 100%;
    width: 90%;
    margin: auto;
    box-shadow: 0px 3px 3px black;
  }

  .logo-box {
    flex-basis: 30rem;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 4rem;
    letter-spacing: .1rem;
    font-family: cursive;
  }

  .links {
    flex: 1;
    display: flex;
    justify-content: end;
    align-items: center;
  }
  
  .link {
    margin: 0 .5rem;
    font-size: 2rem;
    user-select: none;
    font-weight: bold;
  }

  .name {
    font-weight: 900;
    letter-spacing: .1rem;
    color: navy;
  }
</style>