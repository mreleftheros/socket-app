<script>
  import { beforeUpdate, afterUpdate } from 'svelte';
  import { chat } from '../store/chat';
  import { fly } from 'svelte/transition';

  let div;
  let autoscroll;
  $: if ($chat.messages.length > 20) chat.removeFirstMessage();

  beforeUpdate(() => {
    autoscroll =
      div && div.offsetHeight + div.scrollTop > div.scrollHeight - 20;
  });

  afterUpdate(() => {
    if (autoscroll) div.scrollTo(0, div.scrollHeight);
  });
</script>

<ul class="list" bind:this={div}>
  {#each $chat.messages as message (message.id)}
    <li class="item" in:fly={{ x: -200 }}>
      <span class="username">{message.username}</span>
      :
      <span class="message">{message.message}</span>
    </li>
  {/each}
</ul>

<style>
  .list {
    overflow-y: auto;
    background-color: #fff;
    color: #111;
    height: 100%;
    border-radius: 0.5rem;
  }

  .item {
    margin: 0.5rem auto;
    background-color: rgba(255, 165, 0, 0.5);
    font-size: 1.5rem;
    padding: .5rem 0;
  }

  .username {
    display: inline-block;
    font-weight: 900;
    color: navy;
  }

  @media only screen and (min-width: 50rem) {
    .list {
      padding: 0.5rem;
    }

    .item {
      padding: 1rem;
      border-radius: 1.5rem;
    }
  }
</style>
