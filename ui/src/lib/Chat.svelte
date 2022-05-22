<script>
  import Messages from './Messages.svelte';
  import Online from './Online.svelte';
  import ChatForm from './ChatForm.svelte';
  import Ws from './Ws.svelte';
</script>

<Ws>
  <div class="box">
    <div class="messages">
      <Messages />
    </div>
    <div class="online">
      <Online />
    </div>
    <div class="chatForm">
      <ChatForm />
    </div>
  </div>
</Ws>

<style>
  .box {
    height: 100%;
    display: grid;
    grid-template-rows: 90% 10%;
    grid-template-columns: 1fr 15rem;
    grid-template-areas:
      'messages online'
      'chatForm online';
  }

  .messages {
    grid-area: messages;
  }

  .online {
    grid-area: online;
  }

  .chatForm {
    grid-area: chatForm;
  }
</style>
