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
    this.checkStorage()
  },
  methods: {
    ...mapActions(['saveOrgRepos', 'checkStorage']),
  },
}
</script>
