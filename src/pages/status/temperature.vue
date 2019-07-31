<template>
  <div class="wrapper">
    <div id="temperatureInfo">
      <div class="temperatureInformation">
        <el-table
          :data="tableData"
          border
          empty-text="No data"
          style="width: 100%"
        >
          <el-table-column
            prop="name"
            label="Name"
            width="195"
          >
          </el-table-column>
          <el-table-column
            prop="max"
            label="Max(℃)"
            width="195"
          >
          </el-table-column>
          <el-table-column
            prop="value"
            label="Value(℃)"
            width="195"
          >
          </el-table-column>
          <el-table-column label="Status">
            <template slot-scope="scope">
              <span :style="scope.row.status=='WARN'?'color:red':''">{{scope.row.status}}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      tableData: this.$store.state.temperature
    };
  },
  watch: {},
  computed: {},
  methods: {
    getTempList() {
      let that = this;
      let aoData = {
        cmd: "GetTemperatureStatus"
      };
      this.$axios
        .post("/cgi-bin/ligline.cgi", aoData)
        .then(function(response) {
          if (response.data.status == "SUCCESS") {
            that.tableData = response.data.echo.result.value;
            that.$store.state.temperature = response.data.echo.result.value;
          } else if (response.data.status == "ERROR") {
            // that.$alert(response.data.error, "Prompt information", {
            //   confirmButtonText: "OK",
            //   callback: action => {}
            // });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  created() {},
  mounted() {
    let that = this;
    that.getTempList();
    window.myTempInterval = setInterval(function() {
      that.getTempList();
    }, 5000);
    if (window.myVolInterval) {
      window.clearInterval(window.myVolInterval);
    }
    if (window.myFanInterval) {
      window.clearInterval(window.myFanInterval);
    }
  }
};
</script>
<style scoped>
@import "../../style/common";
.wrapper {
  width: 800px;
  margin: 0 auto;
  height: calc(100% - 10px);
}
#temperatureInfo {
  padding-top: 10px;
  height: 100%;
  background-color: white;
  border-radius: 5px;
}
.temperatureInformation {
  width: auto;
  height: calc(100% - 10px);
  overflow: auto;
  padding: 0 10px;
  -webkit-overflow-scrolling: auto;
}
</style>