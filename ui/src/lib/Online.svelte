<script>
  import { chat } from '../store/chat';
</script>

<div class="box">
  <h3 class="title">👥 Online</h3>
  <ul class="list">
    {#each $chat.online as person, i (i)}
      <li class="item">
        <span class="status"> 🟢 </span>
        <div class="username">
          {person}
        </div>
      </li>
    {/each}
  </ul>
</div>

<style>
  .box {
    display: none;
    flex-direction: column;
    height: 100%;
    user-select: none;
  }

  .title {
    margin: 1rem 0;
    text-align: center;
  }

  .list {
    overflow-y: auto;
    flex: 1;
    padding: 0.5rem;
  }

  .item {
    display: flex;
    align-items: center;
    padding: 0.5rem 0.5rem 0.5rem 1rem;
    margin: 0.5rem 0;
    border-radius: 1rem;
    background-color: rgba(255, 165, 0, 0.3);
  }

  .status {
    display: block;
    flex-basis: 2rem;
    font-size: 1rem;
  }

  .username {
    flex: 1;
  }

  @media only screen and (min-width: 50rem) {
    .box {
      display: flex;
    }
  }
</style>
