<template>
  <section class="section">
    <div class="columns is-mobile">
      <github-projects :reposData="reposData" />
    </div>
  </section>
</template>

<script>
import GithubRepo from '~/plugins/github-repo'
import GithubProjects from '~/components/GithubProjects'

export default {
  name: 'HomePage',

  components: {
    Card, GithubProjects
  },
  data () {
    return {
      reposData: []
    }
  },
  created() {
    this.getRepositories()
  },
  methods: {
    getRepositories () {
       // Organisation's repositories
        GithubRepo.getRepositories()
        .then((response) => {
            this.reposData = response.data
        })
    }
  }
}
</script>
