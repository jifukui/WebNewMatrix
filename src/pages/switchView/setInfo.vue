<template>
  <div class="wrapper">
    <div class="title">Port Information {{title}}</div>
    <div class="boxContent">
      <table class="boxC">
        <tr
          v-for="(item,index) in staticData"
          :key="index"
          class="staticTr">
          <td width="35%">{{item.id}}:</td>
          <td width="65%">{{item.value}}</td>
        </tr>
        <!-- <tr 
          v-for="(item, index) in setData" 
          :key="index" 
          class="staticTr">
          <td width="35%" v-if="item.type === 'static'">{{ item.id }}:</td>
          <td width="65%" v-if="item.type === 'static'">
            {{ item.value }}
            <span v-show="item.id == 'Temperature'"> ℃</span>
            <span v-show="item.id == 'Voltage'"> V</span>
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
        </tr> -->
        <tr
          v-for="(item,index) in dataSet"
          :key="index"
          class="staticTr">
          <td width="35%" v-if="item.type==='static'">{{item.id}}:</td>
          <td width="65%" v-if="item.type==='static'">
            {{item.value}}
            <span v-show="item.id=='Temperature'"> ℃</span>
            <span v-show="item.id=='Voltage'"> V</span>
          </td>
          <td width="35%" v-if="item.type==='list'">{{item.id}}:</td>
          <td width="65%" v-if="item.type==='list'" >
            <select v-model="item.lastervalue">
              <option
                v-for="(item,index) in item.value"
                :key=index
                :value=item.value>
                {{item.name}}
              </option>
            </select>
          </td>
          <td width="35%" v-if="item.type==='slider'">{{item.id}}:</td>
          <td width="65%" v-if="item.type==='slider'">
            <div class="block">
              <el-slider
                :min=item.value.min
                :max=item.value.max
                :debounce='300'
                :show-input-controls=false
                v-model="item.lastervalue"
                @change="change(item)"
                show-input
                input-size="mini">
              </el-slider>
            </div>
          </td>
          <td width="35%" v-if="item.type==='switch'">{{item.id}}:</td>
          <td width="65%" v-if="item.type==='switch'">
            <el-switch
              v-model="item.lastervalue"
              active-color="#13ce66"
              inactive-color="#ccc"
              :active-text="item.value.on_text"
              :inactive-text='item.value.off_text'>
            </el-switch>
          </td>
          <td width="35%" v-if="item.type==='inputNum'">{{item.id}}:</td>
          <td width="65%" v-if="item.type==='inputNum'">
            <input
              type="text"
              v-text="item.oldvalue"
              v-model="item.lastervalue"
              @blur="inpNum(item,item.value.min,item.value.max)">
          </td>
          <td width="35%" v-if="item.type==='inputOnlySetNum'" >{{item.id}}:</td>
          <td width="65%" v-if="item.type==='inputOnlySetNum'">
            <input
              type="text"
              v-text="item.oldvalue"
              v-model="item.lastervalue"
              @blur="inpNum(item,item.value.min,item.value.max)">
          </td>
        </tr>
      </table>
    </div>
    <div>
      <el-button
        class="isOk"
        type="primary"
        value="OK"
        @click="OKBtn">
        Save
      </el-button>
      <el-button
        class="isCancel"
        type="primary"
        value="Cancel"
        @click="CancelBtn">
        Exit
      </el-button>
    </div>
    <!-- <h5 class="tc">{{data}}</h5> -->
  </div>
</template>

<script>
export default {
  components: {},
  props: ["portSetInfo"],
  data() {
    return {
      value: "",
      data: [],
      title: "",
      index: "",
      staticData: [],
      dataSet: []
    };
  },
  watch: {
    portSetInfo: {
      handler(newValue, oldValue) {
        //父组件param对象改变会触发此函数
        this.title = this.portSetInfo.title;
        this.index = this.portSetInfo.index;
        let responseInfo = this.portSetInfo.Info;
        let staticAoData = [];
        for (var i in responseInfo) {
          let ht = {
            id: i,
            value: responseInfo[i]
          };
          staticAoData.push(ht);
        }
        this.staticData = staticAoData;
        this.value = this.$conf.PortInitAv(
          this.portSetInfo.Setting,
          "SnapshotPort"
        );
        this.dataSet = this.$conf.PortInfoAv.info;
      },
      deep: true
    }
  },
  computed: {},
  methods: {
    inpNum(item, min, max) {
      console.log(item.lastervalue);
      console.log(min);
      console.log(max);
      var r = /^[1-9]\d*|0$/;
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
    CancelBtn() {
      this.$emit("closePage", false);
      this.$conf.PortCancel();
    },
    OKBtn() {
      let data = {};
      let that = this;
      data.cmd = "SetPortInfo";
      data.PortInfo = [];
      data.PortInfo = this.$conf.PortAvOK(
        this.$conf.PortInfoAv.info,
        this.index
      );
      if (data.PortInfo.length == 0) {
        that.$alert("Save success", "Prompt information", {
          confirmButtonText: "OK",
          callback: action => {}
        });
        that.$emit("closePage", false);
        that.$conf.PortCancel();
        return false;
      }
      console.log("The data is " + JSON.stringify(data));
      this.$axios
        .post("/cgi-bin/ligline.cgi", data)
        .then(function(response) {
          if (response.data.status == "SUCCESS") {
            that.$alert("Save success", "Prompt information", {
              confirmButtonText: "OK",
              callback: action => {}
            });
            that.$emit("closePage", false);
            that.$conf.PortCancel();
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
    }
  },
  created() {},
  mounted() {
    console.log(this.portSetInfo.Setting);
  }
};
</script>
<style>
.el-switch__input:focus ~ .el-switch__core {
  outline: none;
}
</style>

<style scoped>
@import "../../style/common";
.wrapper {
  height: 520px;
  padding: 20px 45px;
  position: relative;
}
.box {
  /*margin-top: 5px;*/
  height: 35px;
  line-height: 35px;
}
.isOk {
  width: 100px;
  height: 40px;
  position: absolute;
  bottom: 0;
  left: 40px;
}
.isCancel {
  width: 100px;
  height: 40px;
  position: absolute;
  bottom: 0;
  right: 40px;
}
.slider {
  width: 300px;
}
.staticTr {
  line-height: 35px;
}
.boxC {
  width: 100%;
}
.boxContent {
  height: 410px;
  overflow: auto;
  -webkit-overflow-scrolling: auto;
}
</style>