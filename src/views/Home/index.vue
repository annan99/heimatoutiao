<template>
<div>
  <!-- 搜索 -->
    <van-nav-bar fixed>
  <template #title>
    <van-button type="info" icon="search" class="search-btn">搜索</van-button>
  </template>
  </van-nav-bar>

<!-- tab标签栏 -->
  <van-tabs v-model="active" animated>
    <van-tab :title="item.name" v-for="item in channels" :key="item.id">
      <ArticleList :id="item.id"></ArticleList>
    </van-tab>
    <template #nav-right>
      <div class="menu" @click="isChannelPanelShow=true">
        <i class="toutiao toutiao-gengduo"></i>
      </div>
      <div class="menu1"></div>
    </template>
  </van-tabs>

  <van-popup v-model="isChannelPanelShow" position="bottom" :style="{ height: '95%',paddingTop:'1rem' }" closeable close-icon-position="top-left">
    <ChannelPanel :channels="channels" :active="active" @change-active="active=$event;isChannelPanelShow=false" @del-event="active=$event"></ChannelPanel>
  </van-popup>
</div>
</template>

<script>
import ChannelPanel from './components/ChannelPanel.vue'
import ArticleList from '@/components/ArticleList.vue'
import {getMyChannels} from '@/api/home'
import {getItem} from '@/utils/storage'
const CHANNELS='CHANNELS'
export default {
  name:'Home',
  created () {
    this.getMyChannels()
  },
  data () {
    return {
      active:0,
      channels:[],
      isChannelPanelShow:false,
    }
  },
  methods: {
    // 3种情况
    // 1.没有登陆，第一次安装app打开的时候只能去ajax拿数据
    // 2.没有登陆，但是第二次打开可能有频道被编辑或删除 这样的话本地存储有值，从本地存储拿
    // 3.登陆过，直接从ajax拿数据
    // 先判断token，如果有token，去ajax中拿，然后判断本地存储有没有channels数据，若没有就此用ajax拿，否则从本地拿
    // 只要本地存储有数据并且没有登录就从本地存储拿，否则就从ajax拿
    async getMyChannels(){
      const channels=getItem(CHANNELS)
      // 匹配的是未登录并且本地存储中没有频道数据的情况
      if(!(this.$store.state.user && this.$store.state.user.token) && channels){
        this.channels=channels
      }else{
        try{
        const res=await getMyChannels()
        console.log('res',res);
        this.channels=res.data.data.channels
      }catch(err){
        console.log(err);
      }  
      }
      
    }
  },
  computed: {},
 
  filters: {},
  components: {ArticleList,ChannelPanel}
}
</script>

<style scoped lang="less">
.search-btn{
  width: 555px;
	height: 64px;
	background-color: rgba(255, 255, 255,0.2);
	border-radius: 32px;
}
/deep/ .van-nav-bar__title{
  max-width: unset;
}
/deep/ .van-tabs__wrap--scrollable .van-tab{
  padding: 0 69px;
  border-right: 1px solid #edeff3;
}
/deep/ .van-tabs__line{
  width: 31px;
  background-color: #3296fa;
}
.menu{
  min-width: 100px;
  height: 82px;
  background-color: rgba(255, 255, 255,0.9);
  position: fixed;
  right: 0;
  text-align: center;
  line-height: 82px;
  .toutiao{
    font-size: 33px;
  }
}
.menu1{
  min-width: 100px;
  height: 82px;
  background-color: rgba(255, 255, 255,0.9);
}
/deep/ .van-tabs__wrap{
  position: fixed;
  width: 750px;
  top: 92px;
  z-index: 1;
  border-bottom: 1px solid #edeff3;
}
/deep/ .van-pull-refresh{
  height: calc(100vh - 274px);
  overflow: auto;
}
</style>
