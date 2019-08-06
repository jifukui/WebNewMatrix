<template>
    <div id="contentView">
        <div class="contentLoading" v-loading="loading" v-show="swtichView" element-loading-background="#ededed">

        </div>
        <div class="content" v-show="!swtichView">
            <section class="videoOrAudio">
                <videoOrAudio @switch_type="selectType"></videoOrAudio>
            </section>
            <section class="switchView" v-show="isVorA">
                <Switchview class="switchViewInfo"  :isShowV="isVorA" @closeLoading="closeLoading"></Switchview>
            </section>
            <section class="switchView" v-show="!isVorA">
                <SwitchMode :isShowA="isVorA" class="switchViewInfo" @closeLoading="closeLoading"></SwitchMode>
            </section>
        </div>
    </div>
</template>

<script>
import VideoOrAudio from "./switchView/videoOrAudio";
import Switchview from "./switchView/switchView";
import SwitchMode from "./switchView/switchMode";
export default {
    name: "SwtichContent",
    data() {
        return {
            isVorA: this.$store.state.switchVideo,
            switchInfo: true,
            loading: true,
            swtichView: true
        };
    },
    components: {
        VideoOrAudio,
        Switchview,
        SwitchMode
    },
    watch: {},
    methods: {
        selectType: function(data) {
            this.closeLoading(true);
            if (data == "video") {
                this.isVorA = true;
                this.$store.state.switchVideo=true; 
            } else if (data == "audio") {
                this.isVorA = false;
                this.$store.state.switchVideo=false;
            }
        },
        closeLoading(data) {
            //console.log("data is "+data);
            var that = this;
            that.loading = data;
            that.swtichView = data;
        }
    },
    created() {
        this.loading = true;
    },
    mounted() {}
};
</script>

<style scoped>
@import "../style/common";
#contentView {
    height: 100%;
}
.content {
    /* display: flex;
    justify-content: space-between;
    flex-direction: row; */
    height: 100%;
}
.contentLoading {
    width: 100%;
    height: 100%;
}
.videoOrAudio {
    margin-right: 10px;
    height: 40px;
    width: 300px;
    min-width: 300px;
}
.switchView {
    width: 100%;
    height: calc(100% - 50px);
}
.switchViewInfo {
    width: auto;
    height: 100%;
    overflow: auto;
    /* overflow-y: scroll;
    overflow-x: scroll; */
    -webkit-overflow-scrolling: auto;
    position: static;
}
</style>
