<script>
  import { setContext, getContext, onMount, tick } from 'svelte';
  import { chat } from '../store/chat';
  import { ws } from '../store/ws';

  const auth = getContext('auth');
  $: id =
    $chat.messages.length > 0
      ? Math.max(...$chat.messages.map(msg => msg.id)) + 1
      : 0;

  setContext('ws', ws);

  onMount(() => {
    $ws = new WebSocket(`ws://${window.location.hostname}:8100`);
    let set_ws_msg = JSON.stringify({
      type: 'SET_WS',
      payload: {
        _id: $auth._id,
        username: $auth.username,
      },
    });

    $ws.onopen = () => {
      console.log('opening connection...');
      if ($ws.readyState !== 1) {
        setTimeout(() => $ws.send(set_ws_msg), 500);
      } else {
        console.log('sent');
        $ws.send(set_ws_msg);
      }
    };

    $ws.onmessage = ({ data }) => {
      data = JSON.parse(data);
      const { type, payload } = data;
      console.log('message', data);

      switch (type) {
        case 'SET_WS':
          if (payload.error) {
            socket.close();
          }
          break;
        case 'SET_MESSAGE':
          const { username, message } = payload;
          return chat.setMessage(id, username, message);
        case 'SET_ONLINE':
          const { online } = payload;
          return chat.setOnline(online);
      }
    };

    $ws.onclose = () => ($ws = null);

    return () => $ws.close();
  });
</script>

<slot />
