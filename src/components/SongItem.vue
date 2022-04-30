<template>
  <div>
      <van-cell-group>
          <van-cell center :title="name" :label="author+' - '+name" :key="id">
            <template #right-icon>
                <van-icon name="play-circle-o" size="0.8rem" @click="playFn"/>
            </template>
          </van-cell>
      </van-cell-group>
  </div>
</template>

<script>
export default {
    props:{
        name:String,
        author:String,
        id:Number
    },
    methods:{
        playFn(){
            this.$router.push({
                path:"/play",
                query:{
                    id:this.id
                }
                }
            )
        }
    }
}
</script>

<style>

</style>