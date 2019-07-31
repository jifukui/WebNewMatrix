<template>
  <div class="wrapper">
    <!-- <div :class="isVedio==true?'switchVideo':'switchAudio'" @click="selectType"></div>
         -->
    <div
      class="avBtn"
      v-for="(items,index) in list"
      :key="index"
      :class="{active:items.index==isSelect}"
      @click="selectType(items.index)"
    >{{items.title}}</div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      isSelect: this.$store.state.switchVideo?1:2,
      list: [{ title: "VIDEO", index: "1" }, { title: "AUDIO", index: "2" }]
    };
  },
  watch: {},
  computed: {},
  methods: {
    selectType(index) {
      this.isSelect = index;
      if (this.isSelect == 1) {
        this.$emit("switch_type", "video");
      } else {
        this.$emit("switch_type", "audio");
      }
    }
  },
  created() {},
  mounted() {}
};
</script>
<style scoped>
.wrapper {
  display: flex;
  flex-direction: row;
}
.avBtn {
  text-align: center;
  line-height: 32px;
  width: 120px;
  height: 32px;
  border: 1px solid #ddd;
  background: white;
  margin-right: 10px;
  color: black;
  cursor: pointer;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
  box-shadow: 1px 1px 1px #888888;
  -moz-box-shadow: 1px 1px 1px #888888;
  -webkit-box-shadow: 1px 1px 1px #888888;
  -o-box-shadow: 1px 1px 1px #888888;
}
.active {
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;
}
</style>