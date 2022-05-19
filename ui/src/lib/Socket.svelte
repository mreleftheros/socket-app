<script>
	import { onMount } from "svelte";

  const auth = true;

	onMount(() => {
    if (auth) {
      const ws = new WebSocket('ws://localhost:8000');
  
      ws.onopen = () => {
        ws.send('hello server');
      }

      ws.onmessage = ({data}) => {
        console.log('received', data);
      }
    }
	})
</script>

<slot />