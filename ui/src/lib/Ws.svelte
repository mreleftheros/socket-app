<script>
	import { setContext, getContext, onDestroy } from "svelte";
  import { chat } from '../store/chat';  
  
  let ws = new WebSocket(`wss://${window.location.hostname}`);
  const auth = getContext('auth');
  $: id = $chat.messages.length > 0 ? Math.max(...$chat.messages.map(msg => msg.id)) + 1 : 0;

  ws.onopen = () => {
    send('SET_WS', {
      _id: $auth._id,
      username: $auth.username
    })
  }

  ws.onmessage = ({data}) => {
    data = JSON.parse(data);
    const { type, payload } = data;

    switch (type) {
      case 'SET_WS':
        if (payload.error) {
          ws.close();
        }
        break;
      case 'SET_MESSAGE':
        const { username, message } = payload;
        return chat.setMessage(id, username, message);
      case 'SET_ONLINE':
        const {online} = payload;
        return chat.setOnline(online);
    }
  }

  ws.onerror = () => ws.close();

  ws.onclose = () => ws = null;

  const send = (type, payload) => ws.send(JSON.stringify({type, payload}));

  setContext('ws', {
    ws,
    onSend: send
  });

  onDestroy(() => ws.close())
</script>

<slot />