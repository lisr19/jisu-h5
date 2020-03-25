<template>
    <div>
        <home v-if="active===0"></home>
        <mater v-if="active===1"></mater>
        <my v-if="active===2"></my>
        <van-tabbar v-model="active" @change="">
            <van-tabbar-item>
                <span>首页</span>
                <img
                        slot="icon"
                        slot-scope="props"
                        :src="props.active ? icon.active : icon.inactive"
                >
            </van-tabbar-item>
            <van-tabbar-item @click="">
                <span>申报</span>
                <img    slot="icon"
                        slot-scope="props"
                        :src="props.active ? icon2.active : icon2.inactive"
                >
            </van-tabbar-item>
            <van-tabbar-item @click="">
                <span>我的</span>
                <img      slot="icon"
                        slot-scope="props"
                        :src="props.active ? icon3.active : icon3.inactive"
                >
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>
<script>
    import {getEnterInfo} from '@/lib/API/comment'
    import {epList} from '@/lib/API/model'
    import {procedureList} from '@/lib/API/otherEia'
    import home from '@/views/home/home'
    import mater from '@/views/material/material'
    import my from '@/views/my/my'

    export default {
        components: {
            home,
            mater,
            my
        },
        data() {
            return {
                active: 0,
                icon: {
                    active: require('@/assets/img/act-icon1.png'),
                    inactive: require('@/assets/img/icon1.png'),
                },
                icon2:{
                    active: require('@/assets/img/act-icon2.png'),
                    inactive: require('@/assets/img/icon2.png'),
                },
                icon3:{
                    active: require('@/assets/img/act-my.png'),
                    inactive: require('@/assets/img/my.png'),
                } ,
            }
        },
        created() {
            this.userId = localStorage.getItem('userId')
            // this.token = sessionStorage.getItem('token')
            if(!this.userId){
                this.$router.push({name:'登录'})
            }
        },
        mounted() {
            // localStorage.setItem('token',this.token)
        },
        activated() {
            // this.getUserDate()
            this.getEnterInfo()
            this.epList()
            this.procedureList() //其他环保手续
        },
        methods: {
            //获取用户信息
            async getUserDate(params) {
                let res = await getUserDate(params)
                if(res.errno ==0){
                    this.userDate = res.data.data[0]
                    console.log(this.userDate);
                } else {
                    this.$toast(res.errmsg)
                }
            },
            //企业账户，获取单个企业统计数据
            async getEnterInfo(){
                let res = await getEnterInfo()
                if(res.errno==100){
                    localStorage.setItem('has_enterprise_detail', 0)
                } else {
                    localStorage.setItem('has_enterprise_detail', 1)
                    this.enterId = res.data.enterprise_info.id
                    localStorage.setItem('enterId',this.enterId)

                }
            },

            //获取企业是否填写环评基本信息
            async epList() {
                let params = {
                    page:1,
                    search:''
                }
                let res = await epList(params)
                if(res.errno) {
                    localStorage.setItem('has_eia_basic_info', 0);
                } else if (res.data.count == 0) {
                    localStorage.setItem('has_eia_basic_info', 0);
                } else {
                    localStorage.setItem('has_eia_basic_info', 1);
                }
            },

            //获取企业是否填写其他环保信息
            async procedureList() {
                let params = {
                    page:1,
                    search:''
                }
                let res = await procedureList(params)
                if(res.errno) {
                    localStorage.setItem('has_eia_other_info', 0);
                } else if (res.data.count == 0) {
                    localStorage.setItem('has_eia_other_info', 0);
                } else {
                    localStorage.setItem('has_eia_other_info', 1);
                }
            },
        }
    }
</script>
<style>
    .van-tabbar--fixed {
        height: 100px;
        border-top: solid 1px #B3B3B3;
    }

    .van-tabbar-item--active {
        color: #22A565
    }
</style>
<style lang="less" scoped>
    .page {
        height: 100%;

        .head-bar {
            height: 170px;
            background: linear-gradient(315deg, rgba(24, 148, 88, 1) 0%, rgba(39, 166, 101, 1) 100%);
        }

        .card {

        }
    }
</style>
