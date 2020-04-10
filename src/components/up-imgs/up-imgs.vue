<template>
  <div>
    <Modal title="多图合并上传" v-model="showImg">
      <Input style="margin-bottom: 15px"  type="text" placeholder="请输入文件名" v-model="files_name"></Input>
      <div style="display: flex;flex-wrap: wrap">
        <div  class="posting-uploader-item" v-for="(item, index) in fileList" :key="index">
          <p class="num">{{index+1}}</p>
          <img :src="item.content" alt="图片" class="img" style="width: 80px;height: 80px"/>
          <van-icon name="close" @click="delImg(index)" class="del-icon" size="18"/>
        </div>
        <van-uploader multiple :after-read="afterRead" style="margin-top: 24px"/>
      </div>

      <div slot="footer">
        <Button type="text" size="large" @click="cancle">取消</Button>
        <Button  type="primary" size="large" @click="pdfImg">合并上传</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  import {uploadImg} from '@/lib/API/comment'
  import {Notify, Toast} from "vant"

  export default {
    name: "up-imgs",
    props: {
      // showImg: Boolean,
    },
    data() {
      return {
        files_name:'',
        files_url:'',
        showImg:true,
        dd:{
          content:[],
        },
        fileList:[],
      }
    },
    methods:{
      cancle(){
        this.$emit('cancle')
      },
      addImgs(){
        this.showImg =true
        this.fileList = []
        this.dd.content =[]
      },
      afterRead(file) {
        this.fileList.push(file)
        this.dd.content.push({image:file.content,width:300})
      },
      delImg(index){
        this.fileList.splice(index,1);
        this.dd.content.splice(index,1)
      },
      pdfImg(){
        const pdfDocGenerator = pdfMake.createPdf(this.dd);
        pdfDocGenerator.getDataUrl((dataUrl) => {
          let filename =Math.ceil(Math.random()*10)+'.pdf'
          this.dataURLtoFile(dataUrl,filename)
        });
      },
      dataURLtoFile(dataurl, filename) {
        //将base64转换为文件
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while(n--){
          u8arr[n] = bstr.charCodeAt(n);
        }
        let file = new File([u8arr], filename, {type:mime});
        this.uploadImg(file)
      },

      async uploadImg(params){
        if(!this.files_name||this.fileList.length==0){
          Notify({ type: 'warning', message: '文件不能为空' });
          return;
        }
        Toast.loading({
          message: '合并中...',
          forbidClick: true,
          loadingType: 'spinner',
          duration: 0
        })
        let res = await uploadImg({
          file:params
        })
        if(res){
          this.files_url = res.url
          this.$toast('上传成功')
          this.showImg =false
          this.$emit('adddata1',this.files_name,this.files_url)
        }
      },
    }
  }
</script>

<style lang="less" scoped>
  .ivu-input-wrapper{
    width: 100%;
  }
  .posting-uploader-item{
    position: relative;
    margin:0 40px 20px 0;
    .num{
      font-size: 32px;
      font-weight: 500;
      text-align: center;
    }
    .img{
      border-radius: 10px;
    }
    .del-icon{
      position: absolute;
      top: 20px;
      left: -15px;
      z-index: 99;
    }
  }
</style>
