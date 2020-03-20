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
                <img
                        slot="icon"
                        :src="icon2"
                >
            </van-tabbar-item>
            <van-tabbar-item @click="">
                <span>我的</span>
                <img
                        slot="icon"
                        :src="icon3"
                >
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>
<script>
    // import headBar from '@/components/head-bar/head-bar'
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
                    active: require('@/assets/img/icon1.png'),
                    inactive: require('@/assets/img/icon1.png'),
                },
                icon2: require('@/assets/img/icon2.png'),
                icon3: require('@/assets/img/icon3.png'),
            }
        },
        created() {
            this.userId = localStorage.getItem('userId')
            if(!this.userId){
                this.$router.push({name:'登录'})
            }
        },
        mounted() {
        },
        methods: {}
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
