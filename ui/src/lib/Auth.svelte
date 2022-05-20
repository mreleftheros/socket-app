<script>
  import { onMount, setContext } from "svelte";
  import { auth } from '../store/auth';
  import { navigate } from 'svelte-routing';

  $: if ($auth) {
    navigate('/', {replace: true});
  } else {
    navigate('/login', {replace: true});
  }

  setContext('auth', auth);

  onMount(() => {
    auth.getUser();
  })
</script>

<slot />