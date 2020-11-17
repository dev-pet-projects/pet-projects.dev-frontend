<template>
  <section class="section">
    <div class="columns is-mobile">
      <github-projects :repos-data="orgRepos" />
    </div>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import GithubProjects from '~/components/GithubProjects'

export default {
  name: 'HomePage',

  components: {
    GithubProjects,
  },
  computed: {
    ...mapState(['orgRepos']),
  },
  mounted() {
    this.checkStorage().then((_) => {
      this.saveOrgRepos()
    })
  },
  methods: {
    ...mapActions(['checkStorage', 'saveOrgRepos']),
  },
}
</script>
