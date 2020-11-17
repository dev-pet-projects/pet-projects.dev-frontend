import Vue from 'vue'
import Vuex from 'vuex'

import ls from '~/plugins/localStorageService'
import idbs from '~/plugins/indexedDBService'
import GithubRepo from '~/plugins/github-repo'

Vue.use(Vuex)

export const state = () => ({
  orgRepos: [],
  dataBaseFields: ['orgRepos'],
})

export const mutations = {
  setState(state, { field, data }) {
    Vue.set(state, field, data)
  },
  setOrgRepos(state, orgReposFromApi) {
    state.orgRepos = orgReposFromApi
  },
}

export const actions = {
  checkStorage({ state, commit }) {
    state.dataBaseFields.forEach(async (field) => {
      try {
        let data = await idbs.checkStorage(field)

        //   npm install -g typescript-language-serverIndexedDB did not find the data, try localStorage
        if (data === undefined) data = ls.checkStorage(field)

        console.log('data before api call: ', data)
        console.log('field: ', field)
        // LocalStorage did not find the data, fetch it from API
        if (data === null) {
          GithubRepo.getRepositories().then((response) => {
            data = response.data
            console.log('data api call: ', data)
            commit('setOrgRepos', data)
          })
        } else {
          commit('setOrgRepos', data)
        }
      } catch (e) {
        // The value in storage was invalid or corrupt so just set it to blank
        commit('setOrgRepos', [])
      }
    })
  },
  async saveOrgRepos({ state }) {
    try {
      await Promise.all(
        state.dataBaseFields.map((field) => {
          idbs.saveToStorage(field, state)
          console.log('saveOrgRepos:idbs', field, state)
        })
      )
    } catch (e) {
      state.dataBaseFields.forEach((field) => {
        ls.saveToStorage(field, state)
        console.log('saveOrgRepos:ls', field, state)
      })
    }
  },
}
