<script>
  import NavLink from './NavLink.svelte';
  import Button from './Button.svelte';
  import { getContext } from 'svelte';

  const auth = getContext('auth');
</script>

<nav class="nav">
  <div class="logo-box">
    <NavLink text="Socket App" active />
  </div>
  <ul class="links">
    {#if $auth}
      <li class="link">
        Welcome, <span class="name">{$auth.username}</span>
      </li>
      <li class="link">
        <NavLink to="/profile" text="My Profile" />
      </li>
      <li class="link both">
        <Button text="Logout" bg="navy" onClick={auth.logout} />
      </li>
    {:else}
      <li class="link">
        <NavLink to="/login" text="Login" />
      </li>
      <li class="link">
        <NavLink to="/signup" text="Signup" />
      </li>
    {/if}
  </ul>
</nav>

<style>
  .nav {
    display: flex;
    height: 100%;
    background-color: rgba(0, 0, 0, .3);
    padding-bottom: 1rem;
  }

  .logo-box {
    display: none;
    flex-basis: 30rem;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 4rem;
    letter-spacing: 0.1rem;
    font-family: cursive;
  }

  .links {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: end;
    align-items: center;
  }

  .link {
    margin: 0 0.5rem;
    font-size: 2rem;
    user-select: none;
    font-weight: bold;
  }

  .name {
    font-weight: 900;
    letter-spacing: 0.1rem;
    color: navy;
  }

  @media only screen and (min-width: 50rem) {
    .nav {
      width: 90%;
      margin: auto;
    }

    .logo-box {
      display: flex;
    }

    .links {
      flex-direction: row;
    }
  }
</style>
