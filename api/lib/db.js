const { MongoClient, ObjectId } = require('mongodb');

const client = new MongoClient(process.env.DB);
const _db = 'main';

module.exports = {
  async connect() {
    return await client.connect();
  },
  getCol(col) {
    return client.db(_db).collection(col);
  },
  getId(id) {
    return ObjectId(id);
  },
};
