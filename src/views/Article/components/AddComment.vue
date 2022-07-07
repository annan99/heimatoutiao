<template>

    <van-field
  v-model.trim="message"
  rows="2"
  autosize
  type="textarea"
  maxlength="50"
  placeholder="请输入留言"
  show-word-limit
   class="add-field"
    ref="field"
>
<!--  class="btn" -->
   <template #extra>
    <!-- 输入框没有内容时按钮被禁掉 -->
    <van-button @click="onclick" type="default" :disabled="message.length===0" class="btn">发布</van-button>
   </template>
    </van-field>
</template>

<script>
import {addComment} from '@/api/comment'
export default {
    props:{
        target:{
            type:[String,Number],
            required:true
        },
        // 如果是对文章进行评论不用传，对评论进行评论要传
        art_id:{
          type:[String,Number]
        }
    },
  created () {},
  data () {
    return {
        message:''
    }
  },
  methods: {
    async onclick(){
        try{
           const res=await addComment({target:this.target,content:this.message,art_id:this.art_id})
           console.log(res);
           this.$emit('add-comment',res.data.data.new_obj)
        }catch(err){
            console.log(err);
        }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {},
  mounted(){
    // 组件最终会变成dom结构，$el可以获取这个组件的根标签dom
    this.$refs.field.$el.querySelector('textarea').focus()
  }
}
</script>

<style scoped lang='less'>
.add-field{
    align-items: center;
    .btn{
        border: none;
    }
}
</style>
