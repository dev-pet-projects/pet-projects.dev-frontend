import { openDB } from 'idb'

async function dbPromise() {
  const db = await openDB('VueDevPetProjectsDB', 1, {
    upgrade(db) {
      const store = db.createObjectStore('orgRepos', {
        // The 'id' property of the object will be the key.
        keyPath: 'id',
        // If it isn't explicitly set, create a value by auto incrementing.
        autoIncrement: true,
      })
      store.createIndex('id', 'id')
    },
  })
  return db
}

const checkStorage = async (storeName) => {
  return await dbPromise()
    .then(async (db) => {
      const promise = db.getAllFromIndex(storeName, 'id')
      const data = await promise
      return data
    })
    .catch((error) => {
      return error
    })
}

const saveToStorage = async (storeName, data) => {
  await dbPromise()
    .then((db) => {
      const tx = db.transaction(storeName, 'readwrite')
      tx.store.add(data)
      return tx.done
    })
    .catch((error) => {
      return error
    })
}

export default {
  checkStorage,
  saveToStorage,
}
