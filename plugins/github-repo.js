import GithubApi from '~/plugins/github-api'
import axios from 'axios'

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
    getContributors(repo_name){
        return GithubApi().get('/repos/' + repo_name + '/contributors')
    }
}
