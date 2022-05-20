<script>
  import { beforeUpdate, afterUpdate } from 'svelte';
  import { chat } from '../store/chat';

  let div;
  let autoscroll;

  beforeUpdate(() => {
		autoscroll = div && (div.offsetHeight + div.scrollTop) > (div.scrollHeight - 20);
	});

	afterUpdate(() => {
		if (autoscroll) div.scrollTo(0, div.scrollHeight);
	});
</script>

<ul class="list" bind:this={div}>
  {#each $chat.messages as message(message.id)}
    <li class="item">
      {message.username}: {message.message}
    </li>
  {/each}
</ul>

<style>
  .list {
    overflow-y: auto;
    background-color: #fff;
    color: #111;
    padding: .5rem;
    height: 100%;
    border-radius: .5rem;
  }

  .item {
    padding: 1rem;
    margin: .5rem auto;
    border-radius: 1.5rem;
    background-color: rgba(255, 165, 0, .5);
    font-size: 1.5rem;
  }
</style>