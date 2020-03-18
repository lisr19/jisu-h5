<template>
  <div class="head-bar" :class="{auto:size}">
    <div class="left">
      <slot name="left">
        <van-icon name="arrow-left" @click="goBack" size="26px"/>
      </slot>
    </div>
    {{title}}
    <div class="right">
      <slot name="right">
      </slot>
    </div>

  </div>
</template>

<script>
  export default {
    name: "head-bar",
    props: {
      title: String, // 标题
      size: Boolean, // 标题
    },
    data() {
      return {
        isBack:false
      }
    },
    methods:{
      goBack(){
        this.$router.back()//返回上一层
      },
    }
  }
</script>

<style lang="less" scoped>
  .head-bar{
    z-index: 9;
    width: 100%;
    height:114px;
    background:linear-gradient(315deg,rgba(24,148,88,1) 0%,rgba(39,166,101,1) 100%);
    line-height: 120px;
    font-size:28px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(255,255,255,1);
    position: fixed;
    top: 0;
    left: 0;
    .left{
      position: absolute;
      left: 20px;
      top: 12px;
    }
    .right{
      position: absolute;
      right: 20px;
      font-size:28px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(1,122,255,1);
      line-height:40px;
    }
  }
  .auto{
    height:100px;
    line-height: 100px;
  }
</style>
