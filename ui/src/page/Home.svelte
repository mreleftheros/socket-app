<script>
  import { chat } from '../store/chat';
  import Button from '../lib/Button.svelte';
  import Window from '../lib/Window.svelte';
  import Chat from '../lib/Chat.svelte';

  let isChat = false;
  $: isChat, chat.reset();

  const toggleChat = () => isChat = !isChat;
</script>

<section class="home">
  {#if isChat}
    <Window onClose={toggleChat}>
      <Chat />
    </Window>
  {:else}
    <Button text='🗨 Start Chatting' bg='navy' onClick={toggleChat} />
  {/if}
</section>

<style>
  .home {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
</style>