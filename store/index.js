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
  async saveOrgRepos({ state }) {
    try {
      await Promise.all(
        state.orgRepos.map((field) => {
          idbs.saveToStorage('orgRepos', field)
        })
      )
    } catch (error) {
      state.dataBaseFields.map((field) => {
        ls.saveToStorage(field, state[field]())
      })
    }
  },
  checkStorage({ state, commit, dispatch }) {
    state.dataBaseFields.forEach(async (field) => {
      try {
        await idbs.checkStorage(field).then((data) => {
          //   npm install -g typescript-language-serverIndexedDB did not find the data, try localStorage
          if (data === undefined) data = ls.checkStorage(field)
          // LocalStorage did not find the data, fetch it from API
          if (Array.isArray(data) && data.length === 0) {
            GithubRepo.getRepositories().then((response) => {
              data = response.data
              commit('setOrgRepos', data)
              dispatch('saveOrgRepos')
            })
          } else {
            commit('setOrgRepos', data)
          }
        })
      } catch (error) {
        // The value in storage was invalid or corrupt so just set it to blank
        commit('setOrgRepos', [])
      }
    })
  },
}
