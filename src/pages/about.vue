<template>
    <div class="wrapper">
        <div class="box">
            <div class="logo"></div>
            <div class="content">
                <p class="font30 coBlue">WEB VERSION 1.0.10</p>
                <p class="font18">Beijing Liguo Electronic Technology Co.</p>
                <p>NO.87 Changqingyuan Road Haidian Dist. Beijing P.R China</p>
                <p>Tel: 010-68423587</p>
                <p>Fax: 010-88413317</p>
                <p>Email: <a class="coBlue" href="mailto:Info@liguodz.com">Info@liguodz.com</a></p>
                <p>Web: <a class="coBlue" target="value" href="http://www.liguo.com.cn/">www.liguo.com.cn</a></p>
            </div>
            <div class="clear"></div>
            <p class="font15">© 2019 - Beijing Liguo Electronic Technology Co. all rights reserved.</p>
        </div>
    </div>
</template>

<script>
export default {
    components: {},
    props: {},
    data() {
        return {};
    },
    watch: {},
    computed: {},
    methods: {},
    created() {},
    mounted() {}
};
</script>

<style scoped>
@import "../style/common";
.wrapper {
    width: 100%;
    height: calc(100% - 20px);
    overflow: auto;
}
.box {
    width: 562px;
    height: 415px;
    padding-top: 60px;
    /*border: 1px solid #409EFF;*/
    margin: 0 auto;
    overflow: auto;
}
.logo {
    width: 140px;
    height: 140px;
    background: url(../../static/img/logo-About.png) ;
    float: left;
}
.content {
    float: left;
}
.content p {
    padding: 7px 0 7px 10px;
}
.font30 {
    font-size: 30px;
}
.font18 {
    font-size: 18px;
}
.font15 {
    font-size: 15px;
}
</style>