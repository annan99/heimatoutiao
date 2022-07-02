<template>
<div>
    <van-cell v-for="(item,index) in list" :key="index" icon="search"
    @click="$emit('search',item)">
      <template #title>
        <span v-html="highlight(item)"></span>
      </template>
    </van-cell>

</div>
</template>

<script>
import {getSuggestList} from '@/api/search'
// 响应式数据写在data中，非响应式的数据写在export default上面，性能提高
let timer=null
export default {
    props:{
      searchText:{
        type:String,
        required:true
      }
    },
  created () {},
  data () {
    return {
        list:[],
    }
  },
  methods: {
    // 因为这块要渲染的不是普通的字符串，而是HTML片段，所以必须要用v-html 他是属性绑定，
    // 过滤器中不能使用属性绑定 所以只能在methods中写
    highlight(str){
      const reg=new RegExp(this.searchText,'g')
      return str.replace(reg,`<span style="color:red">${this.searchText}</span>`)
    }
  },
  computed: {},
  watch: {
    // 防抖
    searchText:{
        handler(newVal){
          clearTimeout(timer)
          timer=setTimeout(async ()=>{
            try{
               const res=await getSuggestList(newVal)
               console.log(res);
               this.list=res.data.data.options
            }catch(err){
                console.log(err);
            }
          },900)
        },
        immediate:true   //立即监听，组件在创建的时候就开始监听
    }
  },
  beforeDestroy(){
    clearTimeout(timer)
  },
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>

</style>
