import { openDB } from 'idb'

// const dbPromise = (_) => {
//   if (!('indexedDB' in window)) {
//     throw new Error('Browser does not support IndexedDB')
//   }
//
//   // return openDB('VueDevPetProjectsDB', 1, (upgradeDb) => {
//   //   if (!upgradeDb.objectStoreNames.contains('orgRepos')) {
//   //     upgradeDb.createObjectStore('orgRepos')
//   //   }
//   // })
//
//   return openDB('VueDevPetProjectsDB', 1, {
//     upgrade(db) {
//       db.createObjectStore('orgRepos');
//     },
//   })
// }

const dbPromise = (_) => {
  // if (!('indexedDB' in window)) {
  //   throw new Error('Browser does not support IndexedDB')
  // }
  return openDB('VueDevPetProjectsDB', 1, {
    upgrade(db) {
      // Create a store of objects
      db.createObjectStore('orgRepos', {
        // The 'id' property of the object will be the key.
        keyPath: 'id',
        // If it isn't explicitly set, create a value by auto incrementing.
        autoIncrement: true,
      })
      // Create an index on the 'date' property of the objects.
      // store.createIndex('date', 'date');
    },
  })
}

const checkStorage = async (storeName) => {
  await dbPromise()
    .then((db) => {
      const tx = db.transaction(storeName, 'readonly')
      const store = tx.objectStore(storeName)

      return store.get(storeName)
    })
    .catch((error) => {
      return error
    })
}

const saveToStorage = async (storeName, fields) => {
  await dbPromise()
    .then((db) => {
      // console.log("dbPromise:storeName", storeName)
      // let tx = db.transaction(storeName, 'readwrite')
      // let store = tx.objectStore(storeName)
      //
      // store.put(tasks, storeName)
      //
      // return tx.complete
      const tx = db.transaction(storeName, 'readwrite')
      fields.map((field) => tx.store.add(field))
      return tx.done
    })
    .catch((error) => {
      console.log('dbPromise:error', error)
      return error
    })
}

export default {
  checkStorage,
  saveToStorage,
}
