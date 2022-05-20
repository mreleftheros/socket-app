const { getCol, getId } = require('../lib/db');
const col = getCol('user');
const argon = require('argon2');

class User {
  static validate(data) {
    const errors = {};
    let error = '';
    let len = Object.keys(data).length;

    if (len !== 2) {
      error = 'Invalid data.';
    } else if (len === 2) {
      if ('username' in data && 'password' in data) {
        data.username.trim();
        const { username, password } = data;

        if (typeof username !== 'string') {
          errors.usernameError = 'Invalid input.';
        } else if (!username) {
          errors.usernameError = 'Must provide username.';
        } else if (username.length < 4 || username.length > 20) {
          errors.usernameError = 'Username must be between 4-20 characters.';
        }

        if (typeof password !== 'string') {
          errors.passwordError = 'Invalid input.';
        } else if (!password) {
          errors.passwordError = 'Must provide password.';
        } else if (password.length < 6 || password.length > 20) {
          errors.passwordError = 'Password must be between 6-20 characters.';
        }
      } else {
        error = 'Invalid data.';
      }
    }

    if (!error && Object.keys(errors).length > 0) {
      error = 'Validation failed.';
    }

    return {
      errors,
      error,
      data,
    };
  }

  static async check(username) {
    return await col.findOne({ username });
  }

  static async signup(username, password) {
    const hashedPassword = await argon.hash(password);

    const { acknowledged, insertedId } = await col.insertOne({
      username,
      password: hashedPassword,
    });

    if (!acknowledged) throw new Error('Could not save user to the database.');

    return {
      _id: insertedId.toString(),
    };
  }

  static async login(username, password) {
    const result = await col.findOne({ username });
    if (!result) {
      return { error: 'Invalid credentials.' };
    }

    const passwordMatches = await argon.verify(result.password, password);
    if (!passwordMatches) {
      return { error: 'Invalid credentials.' };
    }

    return { _id: result._id.toString() };
  }

  static async getById(id) {
    const result = await col.findOne({ _id: getId(id) });

    return {
      _id: result._id.toString(),
      username: result.username,
    };
  }
}

module.exports = User;
