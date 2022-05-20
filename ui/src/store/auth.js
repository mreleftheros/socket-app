import { writable } from 'svelte/store';

const _auth = writable(null);

const getUser = async () => {
  try {
    const res = await fetch('/api/auth/me');
    const data = await res.json();

    if (!data.error) {
      _auth.set(data);
    } else {
      _auth.set(null);
    }
  } catch (err) {
    console.log(err.message);
    return _auth.set(null);
  }
};

const login = async (username, password) => {
  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();

    if (!data.error) {
      _auth.set(data);
    }

    return data;
  } catch (err) {
    console.log(err.message);
    throw err;
  }
};

const signup = async (username, password) => {
  try {
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();

    if (!data.error) {
      _auth.set(data);
    }

    return data;
  } catch (err) {
    console.log(err.message);
    throw err;
  }
};

const logout = async () => {
  try {
    const res = await fetch('/api/auth/logout');
    const data = await res.json();

    if (data === true) {
      _auth.set(null);
    }

    return data;
  } catch (err) {
    console.log(err.message);
    throw err;
  }
};

export const auth = {
  subscribe: _auth.subscribe,
  getUser,
  login,
  signup,
  logout,
};
