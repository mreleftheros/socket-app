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
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 1fr minmax(5rem, auto);
    grid-template-areas:
      'messages'
      'chatForm';
    height: 100%;
    width: 100%;
  }

  .messages {
    grid-area: messages;
  }

  .online {
    display: none;
    grid-area: online;
  }

  .chatForm {
    grid-area: chatForm;
  }

  @media only screen and (min-width: 50rem) {
    .box {
      grid-template-columns: 1fr minmax(auto, 15rem);
      grid-template-rows: 90% 10%;
      grid-template-areas:
        'messages online'
        'chatForm online';
    }

    .online {
      display: block;
    }
  }
</style>
