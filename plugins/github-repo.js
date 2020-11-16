import GithubApi from '~/plugins/github-api'

export default {
  getOrgInfo() {
    return GithubApi().get('/orgs/dev-pet-projects')
  },
  getOrgMembers() {
    return GithubApi().get('/orgs/dev-pet-projects/public_members')
  },
  getRepositories() {
    return GithubApi().get('/orgs/dev-pet-projects/repos')
  },
  getContributors(repoName) {
    return GithubApi().get('/repos/' + repoName + '/contributors')
  },
  getRepositoryLanguages(lang_url) {
    return GithubApi().get(lang_url)
  },
}
