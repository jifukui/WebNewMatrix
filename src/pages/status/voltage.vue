<template>
  <div class="wrapper">
    <div id="temperatureInfo">
      <div class="temperatureInformation">
        <el-table
          :data="tableData"
          style="width: 100%"
          empty-text="No data"
          border
          :span-method="objectSpanMethod"
          :row-class-name="tableRowClassName"
          @cell-mouse-leave="cellMouseLeave"
          @cell-mouse-enter="cellMouseEnter"
        >
          <el-table-column
            prop="name"
            label="Name"
            width="195"
          >
          </el-table-column>
          <el-table-column
            prop="design"
            label="Standard value(V)"
            width="195"
          >
          </el-table-column>
          <el-table-column
            prop="value"
            label="Value(V)"
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
      tableData: this.$store.state.voltage,
      rowIndex: "-1",
      OrderIndexArr: [],
      hoverOrderArr: [],
      isHover: true
    };
  },
  watch: {},
  computed: {},
  methods: {
    getVolList() {
      let that = this;
      let aoData = {
        cmd: "GetVoltageStatus"
      };
      this.$axios
        .post("/cgi-bin/ligline.cgi", aoData)
        .then(function(response) {
          if (response.data.status == "SUCCESS") {
            that.tableData = response.data.echo.result.value;
            that.$store.state.voltage = response.data.echo.result.value;
            let tabledata = that.tableData;
            that.getSpanArr(tabledata);
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
    },
    getSpanArr(tableData) {
      this.OrderIndexArr = [];
      var OrderObj = {};
      tableData.forEach(function(element, index) {
        element.rowIndex = index;
        if (OrderObj[element.name]) {
          OrderObj[element.name].push(index);
        } else {
          OrderObj[element.name] = [];
          OrderObj[element.name].push(index);
        }
      }, this);
      for (var k in OrderObj) {
        if (OrderObj[k].length > 1) {
          this.OrderIndexArr.push(OrderObj[k]);
        }
      }
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        for (var i = 0; i < this.OrderIndexArr.length; i++) {
          var element = this.OrderIndexArr[i];
          for (var j = 0; j < element.length; j++) {
            var item = element[j];
            if (rowIndex == item) {
              if (j == 0) {
                return {
                  rowspan: element.length,
                  colspan: 1
                };
              } else if (j != 0) {
                return {
                  rowspan: 0,
                  colspan: 0
                };
              }
            }
          }
        }
      }
    },
    tableRowClassName: function({ row, rowIndex }) {
      var arr = this.hoverOrderArr;
      if (arr.length == 0) {
        return "";
      } else {
        for (var i = 0; i < arr.length; i++) {
          if (rowIndex == arr[i]) {
            return "success-row";
          }
        }
      }
    },

    cellMouseEnter: function(row, column, cell, event) {
      if (this.isHover == true) {
        this.rowIndex = row.rowIndex;
        this.hoverOrderArr = [];
        this.OrderIndexArr.forEach(function(element) {
          if (element.indexOf(this.rowIndex) >= 0) {
            this.hoverOrderArr = element;
          }
        }, this);
      }
    },
    cellMouseLeave: function(row, column, cell, event) {
      if (this.isHover == true) {
        this.rowIndex = "-1";
        this.hoverOrderArr = [];
      }
    }
  },
  created() {
    const that = this;
    window.screenWidth = document.body.clientWidth;
    // console.log('1'+window.screenWidth);
    if (window.screenWidth > 1025) {
      that.isHover = true;
    } else {
      that.isHover = false;
    }
  },
  mounted() {
    let that = this;
    that.getVolList();
    window.myVolInterval = setInterval(function() {
      that.getVolList();
    }, 5000);
    if (window.myTempInterval) {
      window.clearInterval(window.myTempInterval);
    }
    if (window.myFanInterval) {
      window.clearInterval(window.myFanInterval);
    }
    window.onresize = function temp() {
      window.screenWidth = document.body.clientWidth;
      // console.log(window.screenWidth);
      if (window.screenWidth > 1025) {
        that.isHover = true;
      } else {
        that.isHover = false;
      }
    };
  }
};
</script>
<style>
.el-table .success-row {
  background: #f5f7fa;
}
@media (max-width: 1025px) {
  .el-table__body tr:hover > td {
    background: white !important;
  }
}
</style>
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