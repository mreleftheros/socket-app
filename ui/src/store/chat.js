import { writable } from 'svelte/store';

const _chat = writable({
  messages: [],
  online: [],
});

const setMessage = (id, username = 'All', message) =>
  _chat.update(c => ({
    ...c,
    messages: [...c.messages, { id, username, message }],
  }));

const removeFirstMessage = () =>
  _chat.update(c => ({ ...c, messages: c.messages.slice(1) }));

const setOnline = online => _chat.update(c => ({ ...c, online }));

const reset = () =>
  _chat.set({
    messages: [],
    online: [],
  });

export const chat = {
  subscribe: _chat.subscribe,
  setMessage,
  removeFirstMessage,
  reset,
  setOnline,
};
