<template>
  <div>
      <van-search shape="round" v-model="value" placeholder="请输入搜索关键词" @input="inputFn"/>
      <div class="search_wrap" v-if="this.searchList.length===0">
        <p class="hot_title">热门搜索</p>
        <div class="hot_name_wrap">
            <span class="hot_item" v-for="(obj,index) in hotList" :key="index" @click="Fn(obj.first)">{{obj.first}}</span>
        </div>
      </div>
      <div class="search_wrap" v-else>
        <p class="hot_title">最佳匹配</p>
<van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad">
  <SongItem v-for="obj in searchList" :key="obj.id"
  :name="obj.name"
  :author="obj.ar[0].name"
  :id="obj.id">
  </SongItem>
      <!-- <van-cell-group v-for="obj in searchList" :key="obj.id">
          <van-cell center :title="obj.name" :label="obj.ar[0].name+' - '+obj.name"  >
            <template #right-icon>
                <van-icon name="play-circle-o" size="0.8rem"/>
            </template>
          </van-cell>
      </van-cell-group> -->
</van-list>
      </div>
  </div>
</template>

<script>
import {hotSearchAPI,searchResultListAPI} from "@/api"
import SongItem from "@/components/SongItem.vue"
export default {
  components:{
    SongItem
  },
    data(){
      return {
        value:'',
        hotList:[],
        searchList:[],
        finished:false,
        loading:false,
        page:1,
        timer:null
      }
    },
    async created(){
    const res = await hotSearchAPI({
    })
    this.hotList=res.data.result.hots
    },
    methods:{
      async getResult(){
        return await searchResultListAPI({
          keywords:this.value,
          limit:20,
          offset:(this.page-1)*20
        })
      },
      async Fn(name){
        this.page=1
        this.finished=false
      this.value=name
      const res = await this.getResult()
      this.searchList = res.data.result.songs
      this.loading=false
      },
      async inputFn(){
        this.page=1
        if(this.timer){clearInterval(this.timer)}
        this.timer=setInterval(async() => {
          this.finished=false
        if(this.value.length===0){
          this.searchList=[]
          return
        }
        const res = await this.getResult()
        if(res.data.result.songs===undefined){
          this.searchList=[]
        }
        this.searchList = res.data.result.songs
        this.loading=false
        }, 500);
        
      },
      async onLoad(){
        this.page++;
        const res = await this.getResult()
        if(res.data.result.songs===undefined){
          this.finished=true
          return 
        }
        this.searchList=[...this.searchList,...res.data.result.songs]
        this.loading=false
      }

    }
}
</script>

<style scoped>
/* 搜索容器的样式 */
.search_wrap {
  padding: 0.266667rem;
}

/*热门搜索文字标题样式 */
.hot_title {
  font-size: 0.32rem;
  color: #666;
}

/* 热搜词_容器 */
.hot_name_wrap {
  margin: 0.266667rem 0;
}

/* 热搜词_样式 */
.hot_item {
  display: inline-block;
  height: 0.853333rem;
  margin-right: 0.213333rem;
  margin-bottom: 0.213333rem;
  padding: 0 0.373333rem;
  font-size: 0.373333rem;
  line-height: 0.853333rem;
  color: #333;
  border-color: #d3d4da;
  border-radius: 0.853333rem;
  border: 1px solid #d3d4da;
}
</style>