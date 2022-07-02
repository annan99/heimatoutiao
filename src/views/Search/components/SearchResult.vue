<template>
<div class="container">
    <ArticleItem v-for="(item,index) in list" :key="index" :article="item"></ArticleItem>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
    <van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad"
>
  <van-cell v-for="item in list" :key="item" :title="item" />
</van-list>
    </van-pull-refresh>
</div>
</template>

<script>
import {getSearchResult} from '@/api/search'
import ArticleItem from '@/components/ArticleItem.vue'
export default {
  props:{
    searchText:{
      type:String,
      required:true
    }
  },
  created () {
    this.getSearchResult()
  },
  data () {
    return {
      list:[],
      loading: false,
      finished: false,
      refreshing: false,
    }
  },
  methods: {
    async getSearchResult(){
       try{
         const res=await getSearchResult({page:this.page,per_page:this.per_page,q:this.searchText})
         console.log(res);
         if(res.data.data.results.length===0){
          this.finished=true      //数据加载完毕需要把finish贬称变成ue
          return
         }
         this.list.push(...res.data.data.results)   //新旧数据要合并在一起而不是新数据覆盖旧数据
         this.loading=false
         this.refreshing=false
       }catch(err){
      console.log(err);
       }
    },
     onLoad(){
      // 每次到底部页码值加1，请求下一页数据
      this.page++
      this.getSearchResult()
     },
      onRefresh(){
        this.list=[]
        this.page=1
        this.getSearchResult()
      }
   
  },
  computed: {},
  watch: {},
  filters: {},
  components: {ArticleItem}
}
</script>

<style scoped lang='less'>
.container{
  overflow: auto;
  height: calc(100vh - 108px);
}
</style>
