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
        computed: {
            //第一级权限：企业用户账号未填写企业信息时触发
            level_1_access(){
                let acc = JSON.parse(sessionStorage.getItem('allPer'))
                let res = []
                for (let i in acc) {
                    if (acc[i].access == 'pe_report' || acc[i].access == 'enterprise_detail' || acc[i].access == 'enterprise_manager') {
                        res.push(acc[i])
                    }
                }
                return res
            },
            level_2_access(){
                let acc = JSON.parse(sessionStorage.getItem('allPer'))
                let res = []
                for (let i in acc) {
                    if (
                        acc[i].access !== 'third_enterprise_manager' &&
                        acc[i].access !== 'third_enterprise_detail' &&
                        acc[i].access !== 'report_manager' &&
                        acc[i].access !== 'report_detail' &&
                        acc[i].access !== 'warn_alarms' &&
                        acc[i].access !== 'warn_manager' &&
                        acc[i].access !== 'tax' &&
                        acc[i].access !== 'tax_manager' &&
                        acc[i].access !== 'report_look' &&
                        acc[i].access !== 'report_verity' &&
                        acc[i].access !== 'procedure_manager' &&
                        acc[i].access !== 'procedure_detail'
                    ) {
                        res.push(acc[i])
                    }
                }
                return res
            },
            level_3_access() {
                let acc = JSON.parse(sessionStorage.getItem('allPer'))
                return acc
            }
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
            // this.userId = localStorage.getItem('userId')
            this.token = sessionStorage.getItem('token')
            if(!this.token){
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
                    sessionStorage.setItem('has_enterprise_detail', 0)
                    localStorage.setItem('has_enterprise_detail', 0)
                    if(sessionStorage.getItem('has_enterprise_detail') == 0 && !JSON.parse(sessionStorage.getItem('per')).length>0) {
                        sessionStorage.setItem('per',JSON.stringify(this.level_1_access))
                        sessionStorage.setItem('set_level_1',true)
                        alert('权限更新！')
                        this.$router.go(0)
                    }
                } else {
                    this.enterId = res.data.enterprise_info.id
                    localStorage.setItem('has_enterprise_detail', 1)
                    localStorage.setItem('enterId',this.enterId)
                    sessionStorage.setItem('has_enterprise_detail', 1)
                    // sessionStorage.setItem('per',JSON.stringify(this.level_1_access))
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
                    sessionStorage.setItem('has_eia_basic_info', 0);
                    localStorage.setItem('has_eia_basic_info', 0);
                } else if (res.data.count == 0) {
                    localStorage.setItem('has_eia_basic_info', 0);
                    sessionStorage.setItem('has_eia_basic_info', 0);
                    if(!sessionStorage.getItem('set_level_2') && !sessionStorage.getItem('set_level_1')) {
                        sessionStorage.setItem('per',JSON.stringify(this.level_2_access))
                        sessionStorage.setItem('set_level_2',true)
                        this.$router.go(0)
                    }
                } else {
                    localStorage.setItem('has_eia_basic_info', 1);
                    sessionStorage.setItem('has_eia_basic_info', 1);
                    if(!sessionStorage.getItem('set_level_3')) {
                        sessionStorage.setItem('per',JSON.stringify(this.level_3_access))
                        sessionStorage.setItem('set_level_3',true)
                        this.$router.go(0)
                    }
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
