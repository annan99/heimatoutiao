<template>
<div>
   <form action="/">
  <van-search
    v-model="searchText"
    show-action
    placeholder="请输入搜索关键词"
    background="#3296fa"
    @cancel="$router.go(-1)"
    @search="onSearch"
    autofocus
    @focus="isSearch=false"
  />
</form>
<SearchHistory v-if="searchText===''" @search=onSearch></SearchHistory>
<template v-else>
    <SearchResult v-if="isSearch" :searchText="searchText"></SearchResult>
    <SearchSuggest v-else :searchText="searchText" @search="onSearch"></SearchSuggest>
</template>
</div>
</template>

<script>
import SearchHistory from './components/SearchHistory.vue'
import SearchSuggest from './components/SearchSuggest.vue'
import SearchResult from './components/SearchResult.vue'
import store from '@/store'

export default {
  created () {},
  data () {
    return {
        searchText:'',
        isSearch:false, //默认false
    }
  },
  methods: {
    // 想实现的需求，在搜索input回车的时候和搜索的时候建议单元格点击
    onSearch(str){
      this.searchText=str
      this.isSearch=true
      this.$store.commit('setSearchHistoryList',str)
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {
    SearchHistory,
    SearchSuggest,
    SearchResult,
  }
}
</script>

<style scoped lang='less'>

</style>
