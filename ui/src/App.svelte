<script>
  import { Router, Route } from 'svelte-routing';
  import Home from './page/Home.svelte';
  import Profile from './page/Profile.svelte';
  import AuthBox from './page/AuthBox.svelte';
  import Auth from './lib/Auth.svelte';
  import Private from './lib/Private.svelte';
  import Nav from './lib/Nav.svelte';
</script>

<Router>
  <Auth>
    <header>
      <Nav />
    </header>
    <main>
      <Route path="/">
        <Private>
          <Home />
        </Private>
      </Route>
      <Route path="/profile">
        <Private>
          <Profile />
        </Private>
      </Route>
      <Route path="/login">
        <AuthBox />
      </Route>
      <Route path="/signup">
        <AuthBox signupMode />
      </Route>
    </main>
    <footer class="footer">
      <p class="footer-text">Copyright &copy; 2022 Socket App</p>
    </footer>
  </Auth>
</Router>

<style>
  .footer {
    display: none;
  }

  @media only screen and (min-width: 50rem) {
    .footer {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #111;
      color: #ddd;
    }

    .footer-text {
      text-align: center;
      user-select: none;
    }
  }
</style>
