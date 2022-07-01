<template>
<van-cell-group>
<van-pull-refresh v-model="refreshing" @refresh="onRefresh" ref="pullrefresh">
<van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad"
>
    <!-- <van-cell v-for="(item,index) in articleList" :key="index" :title="item.title" value="内容" label="描述信息" /> -->
    <ArticleItem v-for="(item,index) in articleList" :key="index" :article="item"></ArticleItem>
</van-list>
</van-pull-refresh>
</van-cell-group>
</template>

<script>
import ArticleItem from '@/components/ArticleItem.vue'
import {getArticleList} from '@/api/home'
// import { login } from '@/api/user'
let ele=null  //全局
let scrollTop=0
export default {
    name:'ArticleList',
    props:{
      id:{
        type:Number,
        required:true,
        
      }
    },
  created () {
    this.getArticleList()
  },
  mounted(){   //给有滚动条的pullrefresh绑定滚动事件记住最新滚动位置
    // 记住滚动条滚动的距离
    // console.log(this.$refs.pullrefresh);
    // 组件最终渲染成html dom  $el就是渲染好的跟标签
    ele=this.$refs.pullrefresh.$el
    this.$refs.pullrefresh.$el.addEventListener('scroll',function(){
      // console.log(this.scrollTop);
      scrollTop=this.scrollTop
    })
  },
  // mounted只能执行一次，所以不能卸载mounted中
  activated(){
    ele.scrollTop=scrollTop
  },
  data () {
    return {
        timestamp:Date.now(),
        articleList:[],
        loading: false,
        finished: false,
        refreshing: false,
        
    }
  },
  methods: {
    async getArticleList(){
        if(this.refreshing){
            this.articleList=[]
            this.refreshing=false
        }
       try{
         const res=await getArticleList({channel_id:this.id,timestamp:this.timestamp})
         console.log('res',res);
         this.timestamp=res.data.data.pre_timestamp
        //  若数据全部加载完毕，则直接将finished设置成true
         if(this.timestamp===null){
            this.finished=true
         }
         this.articleList.push(...res.data.data.results)
        //  数据更新完毕后，将loading设置成false
         this.loading=false
       }catch(err){
        console.log(err);
       }
    },
    onLoad(){
       this.getArticleList()
    },
     onRefresh(){
        console.log('下拉刷新');
        this.finished=false  //清空列表数据
        this.loading=true  //重新加载，true代表加载中
        this.timestamp=Date.now()
        this.getArticleList()  //重新调用获取数据
     }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {ArticleItem}
}
</script>

<style scoped lang='less'>
.van-cell-group{
    margin-top: 174px;
}
</style>
