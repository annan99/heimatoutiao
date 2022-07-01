<template>
<div>
    <!-- 我的频道 -->
    <div class="channel-container">
        <div class="title">
            <h3>我的频道</h3>
            <van-button plain type="danger" round size="small" @click="isCloseShow=!isCloseShow" >{{isCloseShow ? '完成' : '编辑'}}</van-button>
        </div>
        <van-row>
           <van-col span="6" v-for="(item,index) in channels" :key="item.id">
            <div class="inner" @click="onClick(index)" :style="{color:active===index ? 'red' : ''}">
              {{item.name}}
              <van-icon name="close" v-if="index !==0" v-show="isCloseShow"/>
            </div>
           </van-col>
        </van-row>
    </div>

<!-- 推荐频道 -->
    <div class="channel-container">
        <div class="title">
            <h3>推荐频道</h3>
            <!-- <van-button plain type="danger" round>编辑</van-button> -->
        </div>
        <van-row>
           <van-col span="6" v-for="item in recommendChannels" :key="item.id">
            <div class="inner  van-ellipsis" @click=add(item.id)>
              +{{item.name}}
            </div>
           </van-col>
        </van-row>
    </div>
</div>
</template>

<script>
// import _ from 'lodash'
import {getAllArticleList,saveChannels} from '@/api/home'
import {setItem} from '@/utils/storage'
const CHANNELS='CHANNELS'
export default {
    name:'ChannelPanel',
    props:{
      channels:{
        type:Array,
        required:true
      },
      active:{
        type:Number,
        required:true
      }
    },
  async created () {
    try{
        const res=await getAllArticleList()
        console.log(res);
        this.recommendChannels=res.data.data.channels.filter(item=>this.channels.every(item1=>item1.id!==item.id))
    }catch(err){
        console.log(err);
    }
  },
  data () {
    return {
        recommendChannels:[],
        isCloseShow:false
    }
  },
  methods: {
    add(id){
        var index=this.recommendChannels.findIndex(item=>item.id===id)
        this.channels.push(this.recommendChannels[index])
        this.$toast('添加成功')
        this.recommendChannels.splice(index,1)
    },
    onClick(index){
        if(this.isCloseShow){
            if(index===0) return  //推荐不能删除  排除掉
            // 删除
            const obj=this.channels[index]
            this.channels.splice(index,1)
            this.$toast('删除成功')
            this.recommendChannels.push(obj)
            if(index<this.active){
                this.$emit('del-event',this.active-1)
            }
        }else{
            // 切换高亮active
            this.$emit('change-active',index)
        }
    }
  },
  computed: {},
   watch: {
    channels:{
      // 登陆过，数据放在后台数据库  没有登陆，数据放在本地
      async handler(newVal){  //登陆过
        if(this.$store.state.user && this.$store.state.user.token){
          const arr=[]
          newVal.forEach((item,index)=>{
            arr.push({id:item.id,seq:index})
          })
          console.log(arr);
        //   先把频道数据处理一下
          try{
            const res=await saveChannels(arr)
            console.log(res);
          }catch(err){
            console.log(err);
          }
        }else{  //没有登陆
           setItem(CHANNELS,newVal)
        }
      },
      deep:true  //深度监听
    }
  },
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.channel-container{
    .title{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-left: 24px;
        padding-right: 16px;
        margin-bottom: 16px;
        h3{
          font-size: 32px;
          font-weight: 400;
          color:#333;
        }
        .van-button{
            width: 104px;
            height: 48px;
            color:#f85a5a;
            // border-radius: 20px;
        }
    }
}
.inner{
    width: 160px;
	height: 86px;
	background-color: #f4f5f6;
	border-radius: 6px;
	font-family: MicrosoftYaHei;
	font-size: 28px;
	font-weight: normal;
    color: #222222;
    line-height: 86px;
    text-align: center;
    margin-left: 14px;
    position: relative;
    .van-icon-close{
        position: absolute;
        right: 0;
        top: 0;
        transform: translate(50%,-50%);
    }
}
.van-col{
    margin-bottom: 22px;
}
</style>
