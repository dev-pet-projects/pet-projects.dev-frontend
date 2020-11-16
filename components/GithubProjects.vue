<template>
  <div class="content">
    <div class="card"
      v-for="(rep, index) in reposData"
      :key="index"
      @click="onClickRow(rep, index)"
    >
      <div class="card-content">
        <div class="media">
          <div class="media-left">
            <figure class="image is-48x48">
              <span class="tag is-primary">
                {{ rep.language }}
              </span>
            </figure>
          </div>
          <div class="media-content">
            <p class="title is-4">{{ rep.name }}</p>
            <p class="subtitle is-6"><a :href="rep.svn_url" target="_blank">{{ rep.svn_url }}</a></p>
          </div>
        </div>
        <div class="content">
          {{ rep.description }}

          <br><br>
          <span class="tag is-light">
            Since:
            <time :datatime="rep.created_at">{{ dateFormatter(rep.created_at) }}</time>
          </span>
          <span class="tag is-light">
            Last push:
            <time :datetime="rep.pushed_at">{{ dateFormatter(rep.pushed_at) }}</time>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    reposData: { type: Array, required: true },
  },
  data() {
    return {
      repositorySelected: {},
    }
  },
  methods: {
    dateFormatter(date) {
      return date.substring(0, 10)
    },
    onClickRow(repository, _index) {
      this.repositoryLanguages()
      this.repositorySelected = repository
    },
  },
}
</script>

<style>
.row {
  margin-bottom: 20px;
}
table {
  width: 100%;
  table-layout: fixed;
}
.tbl-content {
  height: 300px;
  overflow-x: auto;
  margin-top: 1px;
  border: 1px solid rgba(255, 255, 255, 0.3);
}
th {
  padding: 20px 15px;
  text-align: left;
  font-weight: 500;
  font-size: 12px;
  color: black;
  text-transform: uppercase;
  background-color: #ffcc80;
}
tr {
  background-color: #fcf8f7;
  cursor: pointer;
}
td {
  padding: 15px;
  text-align: left;
  vertical-align: middle;
  font-weight: 300;
  font-size: 12px;
  color: black;
  border-bottom: solid 1px rgba(255, 255, 255, 0.1);
}
</style>
