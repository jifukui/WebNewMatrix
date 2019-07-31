<template>
  <div class="wrapper">
    <div id="portsInfo">
      <div style="width:230px">
        <span class="title titleML">Port List</span>
        <div class="listBoard">
          <p
            v-for="(items, index) in portList"
            class="portList"
            :key="index"
            :class="{ activePort: items.index == isActive }"
            @click="selectPortInfo(items.index)"
          >
            Port {{ items.index }}-{{ items.title }}
          </p>
        </div>
      </div>
      <div style="width:570px">
        <div class="information">
          <span class="title">Information - Port {{ isActive }}</span>
          <table class="box">
            <tr
              v-for="(item, index) in staticData"
              :key="index"
              class="staticTr">
              <td width="35%">{{ item.id }}:</td>
              <td width="65%">{{ item.value }}</td>
            </tr>
            <tr 
              v-for="(item, index) in setData" 
              :key="index" 
              class="staticTr">
              <td width="35%" v-if="item.type === 'static'">{{ item.id }}:</td>
              <td width="65%" v-if="item.type === 'static'">
                {{ item.value }}<span v-show="item.id == 'Temperature'"> ℃</span
                ><span v-show="item.id == 'Voltage'"> V</span>
              </td>
              <td width="35%" v-if="item.type === 'staticList'">{{ item.id }}:</td>
              <td width="65%" v-if="item.type === 'staticList'">
                <span
                  v-for="(items, index) in item.value"
                  :key="index"
                  v-show="items.value == item.oldvalue"
                  >{{ items.name }}</span
                >
              </td>
              <td width="35%" v-if="item.type === 'list'">{{ item.id }}:</td>
              <td width="65%" v-if="item.type === 'list'">
                <select v-model="item.lastervalue">
                  <option
                    v-for="(item, index) in item.value"
                    :key="index"
                    :value="item.value"
                    >{{ item.name }}</option
                  >
                </select>
              </td>
              <td width="35%" v-if="item.type === 'slider'">{{ item.id }}:</td>
              <td width="65%" v-if="item.type === 'slider'">
                <div class="block">
                  <el-slider
                    :min="item.value.min"
                    :max="item.value.max"
                    show-input
                    :show-input-controls="false"
                    @change="change(item)"
                    v-model="item.lastervalue"
                    input-size="mini"
                  ></el-slider>
                </div>
              </td>
              <td width="35%" v-if="item.type === 'switch'">{{ item.id }}:</td>
              <td width="65%" v-if="item.type === 'switch'">
                <el-switch
                  v-model="item.lastervalue"
                  active-color="#13ce66"
                  inactive-color="#ccc"
                  :active-text="item.value.on_text"
                  :inactive-text="item.value.off_text"
                ></el-switch>
              </td>
              <td width="35%" v-if="item.type === 'inputOnlySetNum'">{{ item.id }}:</td>
              <td width="65%" v-if="item.type === 'inputOnlySetNum'">
                <input
                  type="text"
                  v-text="item.oldvalue"
                  v-model="item.lastervalue"
                  @blur="inpNum(item, item.value.min, item.value.max)"
                />
              </td>
              <td width="35%" v-if="item.type === 'inputNum'">{{ item.id }}:</td>
              <td width="65%" v-if="item.type === 'inputNum'">
                <input
                  type="text"
                  v-text="item.oldvalue"
                  v-model="item.lastervalue"
                  @blur="inpNum(item,item.value.min,item.value.max)"
                />
              </td>
              <td width="35%" v-if="item.type === 'buttonR'">{{ item.id }}:</td>
              <td width="65%" v-if="item.type === 'buttonR'">
                <el-button
                  class="btn"
                  type="primary"
                  @click="clickBtn(isActive, 1)">
                    Repower
                </el-button>
                <el-button
                  class="btn"
                  type="primary"
                  @click="clickBtn(isActive, 2)">
                    Factory
                </el-button>
              </td>
            </tr>
            
            <tr v-show="isNeedSave">
              <td width="35%" style="font-size:16px;">Save Changes:</td>
              <td width="65%">
                <el-button class="btn" type="primary" @click="saveBtn(isActive)">Save Changes</el-button>
              </td>
            </tr>
          </table>
        </div>
      </div>
      <!-- <div
        style="width:570px"
        v-loading="loading"
        v-show="portInfoLoadding"
      >
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      slider: 50,
      portList: [],
      isActive: -1,
      staticData: [],
      value: "",
      setData: "",
      setData2: "",
      // loading: true,
      isNeedSave: true
      // portInfoLoadding: true,
      // saveLoading: false,
    };
  },
  watch: {},
  computed: {},
  methods: {
    inpNum(item, min, max) {
      console.log(item.lastervalue);
      console.log(min);
      console.log(max);
      let r = /^([1-9]\d*|[0]{1,1})$/;
      if (!r.test(item.lastervalue)) {
        this.$alert("Data type error", "Prompt information", {
          confirmButtonText: "OK",
          callback: action => {}
        });
        item.lastervalue = item.oldvalue;
        return false;
      }
      if (item.lastervalue < min || item.lastervalue > max) {
        this.$alert("Data out of range", "Prompt information", {
          confirmButtonText: "OK",
          callback: action => {}
        });
        item.lastervalue = item.oldvalue;
        return false;
      }
    },
    inpNum2(item) {
      let r = /^([1-9]\d*|[0]{1,1})$/;
      if (!r.test(item.lastervalue)) {
        this.$alert("Data type error", "Prompt information", {
          confirmButtonText: "OK",
          callback: action => {}
        });
        item.lastervalue = item.oldvalue;
        return false;
      }
    },
    change(item) {
      console.log("===============", Math.floor(item.lastervalue));
      return (item.lastervalue = Math.floor(item.lastervalue));
    },
    clickBtn(index, info) {
      let confirmValue = "";
      if (info == 1) {
        confirmValue = "RESET port to repower ? <br/>Press OK to confirm";
      } else if (info == 2) {
        confirmValue =
          "RESET port to factory default ? <br/>Press OK to confirm";
      }
      let that = this;
      that
        .$confirm(confirmValue, "Prompt information", {
          confirmButtonText: "Ok",
          cancelButtonText: "Cancel",
          type: "warning",
          closeOnClickModal: false,
          dangerouslyUseHTMLString: true
        })
        .then(() => {
          var data = {
            cmd: "SetPortInfo",
            PortInfo: [
              {
                index: index,
                sid: 36,
                value: info
              }
            ]
          };
          console.log("The data is " + JSON.stringify(data));
          this.$axios
            .post("/cgi-bin/ligline.cgi", data)
            .then(function(response) {
              if (response.data.status == "SUCCESS") {
                that.$alert("Save success", "Prompt information", {
                  confirmButtonText: "OK",
                  callback: action => {}
                });
              } else if (response.data.status == "ERROR") {
                that.$alert(response.data.error, "Prompt information", {
                  confirmButtonText: "OK",
                  callback: action => {}
                });
              }
            })
            .catch(function(error) {
              console.log(error);
            });
        })
        .catch(() => {
          let sendata = {
            resetSure: "取消重置信息"
          };
          console.log(sendata);
        });
    },
    getPortList(index) {
      let that = this;
      let aoData = {
        cmd: "video_info"
      };
      this.$axios
        .post("/cgi-bin/ligline.cgi", aoData)
        .then(function(response) {
          if (response.data.status == "SUCCESS") {
            that.portList = response.data.echo.result.Port;
            that.$store.state.portInfo = that.portList;
            for (let j = 0; j < that.portList.length; j++) {
              if (that.portList[j].Dir == "Out") {
                that.portList[j].title = "out" + that.portList[j].index;
              } else {
                that.portList[j].title = "in" + that.portList[j].index;
              }
            }
            if (index) {
              that.selectPortInfo(index);
            } else {
              that.selectPortInfo(that.portList[0].index);
            }
          } else if (response.data.status == "ERROR") {
            that.$alert(response.data.error, "Prompt information", {
              confirmButtonText: "OK",
              callback: action => {}
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    selectPortInfo(index) {
      let that = this;
      if (window.portSetTimeout) {
        window.clearInterval(window.portSetTimeout);
      }
      // that.loading = true;
      // that.portInfoLoadding = true;
      // that.staticData = [];
      that.isActive = index;
      let aoData = {
        cmd: "GetPortInfo",
        PortInfo: {
          index: index
        }
      };
      this.$axios
        .post("/cgi-bin/ligline.cgi", aoData)
        .then(function(response) {
          if (response.data.status == "SUCCESS") 
          {
            // that.staticData = [];
            let responseInfo = response.data.echo.result.Info;
            let setInfo = response.data.echo.result.Setting;
            if (setInfo.length == 0) 
            {
              that.isNeedSave = false;
            } 
            else 
            {
              that.isNeedSave = true;
            }
            if (responseInfo["Port Index"] == that.isActive) 
            {
              let staticAoData = [];
              for (var i in responseInfo) 
              {
                let ht = {
                  id: i,
                  value: responseInfo[i]
                };
                staticAoData.push(ht);
              }
              //console.log("staticAoData "+staticAoData);
              that.staticData = staticAoData;
              //console.log("that.staticData"+that.staticData);
              let value = [];
              let setData = [];
              value = that.$conf.PortInitAv(setInfo, responseInfo.Direction);
              setData = that.$conf.PortInfoAv.info;
              that.value = value;
              that.setData = setData;
              // that.loading = false;
              // that.portInfoLoadding = false;
            }
          } 
          else if (response.data.status == "ERROR") 
          {
            that.$alert(response.data.error, "Prompt information", 
            {
              confirmButtonText: "OK",
              callback: action => {
                // that.loading = false;
              }
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    saveBtn(index) {
      var data = {};
      let that = this;
      data.cmd = "SetPortInfo";
      data.PortInfo = [];
      data.PortInfo = this.$conf.PortAvOK(
        this.$conf.PortInfoAv.info, 
        index
      );
      if (data.PortInfo.length == 0) {
        that.$alert(
          "Please set relevant parameters before saving.",
          "Prompt information",
          {
            confirmButtonText: "OK",
            callback: action => {}
          }
        );
        return false;
      }
      console.log("The data is " + JSON.stringify(data));
      this.$axios
        .post("/cgi-bin/ligline.cgi", data)
        .then(function(response) {
          if (response.data.status == "SUCCESS") {
            that.$alert("Save success", "Prompt information", {
              confirmButtonText: "OK",
              callback: action => {
                // that.loading = true;
                window.portSetTimeout = setTimeout(function() {
                  that.getPortList(that.isActive);
                }, 2000);
              }
            });
          } else if (response.data.status == "ERROR") {
            that.$alert(response.data.error, "Prompt information", {
              confirmButtonText: "OK",
              callback: action => {
                that.getPortList(that.isActive);
              }
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  created() {
    this.portList = this.$store.state.portInfo;
    if (this.portList.length != 0) {
      for (let j = 0; j < this.portList.length; j++) {
        if (this.portList[j].Dir == "Out") {
          this.portList[j].title = "out" + this.portList[j].index;
        } else {
          this.portList[j].title = "in" + this.portList[j].index;
        }
      }
      this.selectPortInfo(this.portList[0].index);
    }
  },
  mounted() {
    this.portList = this.$store.state.portInfo;
    if (this.portList.length == 0) {
      this.getPortList();
    }
  }
};
</script>
<style>
.information .el-tabs {
  height: auto;
}
.information .el-tabs__content {
  height: auto;
}
.information .el-tab-pane {
  height: auto;
}
</style>
<style scoped>
@import "../../style/common";
.wrapper {
  width: 800px;
  margin: 0 auto;
  height: calc(100% - 10px);
}
#portsInfo {
  padding: 10px 5px 0;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  height: calc(100% - 10px);
  background-color: white;
  border-radius: 5px;
}
p {
  font-size: 14px;
  line-height: 30px;
}
.he40 {
  height: 40px;
}
.he30 {
  height: 30px;
}
.line40 {
  line-height: 40px;
}
.padtop10 {
  padding-top: 10px;
}
.magtop10 {
  margin-top: 10px;
}
.listBoard {
  width: auto;
  height: calc(100% - 34px);
  overflow: auto;
  padding: 5px;
  -webkit-overflow-scrolling: auto;
  border: 1px solid black;
}
.information {
  padding: 0 10px;
  width: auto;
  height: calc(100% - 10px);
  overflow: auto;
  -webkit-overflow-scrolling: auto;
  font-size: 0;
}
.box {
  width: 100%;
  margin-left: 10px;
  font-size: 14px;
}
.staticTr {
  line-height: 30px;
}
.staticTr td {
  font-size: 14px;
}
.left,
.right {
  display: inline-block;
  width: 200px;
  float: left;
}
.btn {
  width: 150px;
  height: 30px;
  padding: 0px 20px;
  margin-bottom: 4px;
}
.portList {
  cursor: pointer;
}
.activePort {
  background-color: #409eff;
  color: #ffffff;
}

@media (min-width: 1025px) {
  .portList:hover {
    background-color: #409eff;
    color: #ffffff;
  }
}
.titleML {
  margin-left: 4px;
}
.block {
  width: 92%;
}
.boxtable {
  border: 1px solid #ccc;
}
.PaddingContent {
  padding-left: 15px;
  font-size: 14px !important;
}
</style>