<template>
    <div>
        <div class='user_img'></div>
        <div class="container_fluid">
            <span class="titleKramer">Kramer&nbsp;&nbsp;</span><span>{{headerInfo}}</span> Flexible I/O Digital Matrix Switcher
        </div>
        <div class="userName" >{{userName}}</div>
    </div>
</template>

<script>
export default {
    props: ["headerInfo"],
    data() {
        return {
            userName: this.$store.state.UserName
        };
    },
    watch:
    {
        "$store.state.UserName":function (value) {
            console.log("User name change ");
            this.userName=value;
        }
    },
    methods: {},
    mounted() {}
};
</script>

<style scoped>
@import "../style/common";
.user_img {
    width: 44px;
    height: 44px;
    background: url(../../static/img/logo.png) no-repeat;
    background-size: 43px;
    margin-left: 8px;
}
.titleKramer{
    color: #ddd;
}
.userName{
    position:absolute;
    right:10px;
    color:#fff;
    font-family: "Arial";
    font-size:16px;
}
</style>
