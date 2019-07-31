<template>
    <div class="content">
        <div class="proInfo">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="Temperatures" name="first">
                    <section class="portInfo" v-if="activeName=='first'">
                        <Temperature></Temperature>
                    </section>
                </el-tab-pane>
                <el-tab-pane label="Voltages" name="second">
                    <section class="portInfo" v-if="activeName=='second'">
                        <Voltage></Voltage>
                    </section>
                </el-tab-pane>
                <el-tab-pane label="Fans" name="third">
                    <section class="portInfo" v-if="activeName=='third'">
                        <Fan></Fan>
                    </section>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>

</template>

<script>
import Temperature from "./status/temperature";
import Voltage from "./status/voltage";
import Fan from "./status/fan";
export default {
    name: "SwtichContent",
    components: {
        Temperature,
        Voltage,
        Fan
    },
    data() {
        return {
            activeName: "first"
        };
    },
    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
        }
    }
};
</script>
<style>
.el-tabs__item {
    padding: 0 20px;
    height: 40px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    line-height: 40px;
    display: inline-block;
    list-style: none;
    font-size: 20px;
    font-weight: 500;
    color: #303133;
    position: relative;
}
.el-tabs__item:hover{color: #303133;}
.el-tabs__item.is-active{color: #303133;}
.el-tabs {
    height: calc(100% - 10px);
}
.el-tabs__content {
    height: calc(100% - 10px);
}
.el-tab-pane {
    height: calc(100% - 10px);
}
</style>

<style scoped>
@import "../style/common";
.content {
    height: 100%;
}
.proInfo {
    height: calc(100% - 10px);
}
.portInfo {
    overflow: auto;
    height: calc(100% - 10px);
}
</style>
