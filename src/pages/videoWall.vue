<template>
  <div class="wrapper">
    <div class="group">
      <div
        class="avBtn"
        v-for="(items, index) in groupList"
        :key="index"
        :class="{ activeBtn: items.index == isGroupSelect }"
        @click="selectGroup(items.index)"
      >
        {{ items.title }}
      </div>
    </div>

    <div class="proInfoConfigure">
      <div class="set_content">
        <div style="width:150px">
          <span class="title titleML">Inputs</span>
          <div class="set_content_one_box">
            <button
              class="s_c_o_b_block"
              v-for="(item, index) in inputdata"
              @click="selectInput(item.index, item.title)"
              :class="{ eBtn: item.index == isActive }"
              :key="index"
              :disabled="selecting"
            >
              {{ item.title }}
            </button>
          </div>
        </div>
        <div style="width:650px;">
          <span class="title titleML">Group{{ isGroupSelect }} Video Wall</span>
          <div>
            <span class="title titleML">In Resolution:1920*1080</span>
            <span class="title titleML right"
              >Out Resolution:
              <select name="" id="" v-model="outRes" @change="getOutRes">
                <option
                  v-for="(item, index) in options"
                  :value="item.value"
                  :key="index"
                >
                  {{ item.name }}</option
                >
              </select></span
            >
            <div class="wallView">
              <table
                border="1"
                cellspacing="0"
                style="width:100%;height:100%;box-sizing: border-box;"
              >
                <tr>
                  <td class="outPortWall">
                    <div class="inp">
                      <p>
                        Out Resolution:&nbsp;
                        <span>{{ outRes | optionTxt(options) }}</span>
                      </p>
                      <p v-for="(item, index) in list[0].data[0]" :key="index">
                        {{ item.title }}:&nbsp;
                        <span class="inpSpan"
                          ><input
                            style=" width: 100px;"
                            type="text"
                            v-model="item.value"
                        /></span>
                      </p>
                    </div>
                    <select
                      class="outSignal"
                      @change="chooseMedicine()"
                      v-model="out[0]"
                    >
                      <option
                        v-for="(item, index) in outData"
                        :key="index"
                        :value="item.value"
                        >{{ item.name }}</option
                      >
                    </select>
                  </td>
                  <td class="outPortWall">
                    <div class="inp">
                      <p>
                        Out Resolution:&nbsp;
                        <span>{{ outRes | optionTxt(options) }}</span>
                      </p>
                      <p v-for="(item, index) in list[0].data[1]" :key="index">
                        {{ item.title }}:&nbsp;
                        <span class="inpSpan"
                          ><input
                            style=" width: 100px;"
                            type="text"
                            v-model="item.value"
                        /></span>
                      </p>
                    </div>
                    <select
                      name=""
                      id=""
                      class="outSignal"
                      @change="chooseMedicine1()"
                      v-model="out[1]"
                    >
                      <option
                        v-for="(item, index) in outData"
                        :key="index"
                        :value="item.value"
                        >{{ item.name }}</option
                      >
                    </select>
                  </td>
                </tr>
                <tr>
                  <td class="outPortWall">
                    <div class="inp">
                      <p>
                        Out Resolution:&nbsp;
                        <span>{{ outRes | optionTxt(options) }}</span>
                      </p>
                      <p v-for="(item, index) in list[0].data[2]" :key="index">
                        {{ item.title }}:&nbsp;
                        <span class="inpSpan"
                          ><input
                            style=" width: 100px;"
                            type="text"
                            v-model="item.value"
                        /></span>
                      </p>
                    </div>
                    <select
                      name=""
                      id=""
                      class="outSignal"
                      @change="chooseMedicine2()"
                      v-model="out[2]"
                    >
                      <option
                        v-for="(item, index) in outData"
                        :key="index"
                        :value="item.value"
                        >{{ item.name }}</option
                      >
                    </select>
                  </td>
                  <td class="outPortWall">
                    <div class="inp">
                      <p>
                        Out Resolution:&nbsp;
                        <span>{{ outRes | optionTxt(options) }}</span>
                      </p>
                      <p v-for="(item, index) in list[0].data[3]" :key="index">
                        {{ item.title }}:&nbsp;
                        <span class="inpSpan"
                          ><input
                            style=" width: 100px;"
                            type="number"
                            v-model="item.value"
                        /></span>
                      </p>
                    </div>
                    <select
                      name=""
                      id=""
                      class="outSignal"
                      @change="chooseMedicine3()"
                      v-model="out[3]"
                    >
                      <option
                        v-for="(item, index) in outData"
                        :key="index"
                        :value="item.value"
                        >{{ item.name }}</option
                      >
                    </select>
                  </td>
                </tr>
              </table>

              <!-- <div :class="isfull == true ? 'inputViewFull' : 'inputViewCenter'">
              <img
                src="../../static/img/view.png"
                alt=""
                class="inputbackground"
              />
            </div> -->
            </div>
            <div class="typeSelectList">
              <div class="typeSelect">
                <div
                  class="avBtn"
                  v-for="(items, index) in list"
                  :key="index"
                  :class="{ activeBtn: items.index == isSelect }"
                  @click="selectType(items.index)"
                >
                  {{ items.title }}
                </div>
                <el-button type="primary" @click="saveInfo" class="btn"
                  >Save</el-button
                >
              </div>
            </div>
          </div>
        </div>
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
      isGroupSelect: 1,
      groupList: [],
      outRes: "",
      options: [
        {
          name: "640x480x60",
          value: 0
        },
        {
          name: "1024x768x60",
          value: 1
        },
        {
          name: "1280x1024x60",
          value: 2
        },
        {
          name: "1680x1050x60",
          value: 5
        },
        {
          name: "1600x1200x60",
          value: 6
        },
        {
          name: "1920x1080x60",
          value: 7
        },
        {
          name: "1280x720x60",
          value: 11
        },
        {
          name: "720x480x60",
          value: 13
        },
        {
          name: "800x600x60",
          value: 14
        },
        {
          name: "1280x960x60",
          value: 15
        },
        {
          name: "1920x1200x60",
          value: 17
        },
        {
          name: "3840x2160x60",
          value: 50
        },
        {
          name: "3840x2160x30",
          value: 52
        }
      ],
      isActive: 0,
      out: [0, 0, 0, 0],
      isSelect: 0,
      isfull: true,
      inputdata: [],
      list: [
        {
          title: "Full",
          index: "0",
          data: [
            [
              {
                title: "Output Hor-Position",
                sid: 50,
                value: 0
              },
              {
                title: "Output Ver-Position",
                sid: 51,
                value: 0
              },
              {
                title: "Output Hor-Size",
                sid: 52,
                value: 960
              },
              {
                title: "Output Ver-Size",
                sid: 53,
                value: 540
              }
            ],
            [
              {
                title: "Output Hor-Position",
                sid: 50,
                value: 960
              },
              {
                title: "Output Ver-Position",
                sid: 51,
                value: 0
              },
              {
                title: "Output Hor-Size",
                sid: 52,
                value: 960
              },
              {
                title: "Output Ver-Size",
                sid: 53,
                value: 540
              }
            ],
            [
              {
                title: "Output Hor-Position",
                sid: 50,
                value: 0
              },
              {
                title: "Output Ver-Position",
                sid: 51,
                value: 540
              },
              {
                title: "Output Hor-Size",
                sid: 52,
                value: 960
              },
              {
                title: "Output Ver-Size",
                sid: 53,
                value: 540
              }
            ],
            [
              {
                title: "Output Hor-Position",
                sid: 50,
                value: 960
              },
              {
                title: "Output Ver-Position",
                sid: 51,
                value: 540
              },
              {
                title: "Output Hor-Size",
                sid: 52,
                value: 960
              },
              {
                title: "Output Ver-Size",
                sid: 53,
                value: 540
              }
            ]
          ]
        }
      ],
      outData: [],
      a: [0, 0, 0, 0],
      num: 0
    };
  },
  watch: {},
  computed: {},
  filters: {
    optionTxt: function(val, obj) {
      var newObj = {};
      for (var i = 0; i < obj.length; i++) {
        newObj[obj[i].value] = obj[i].name;
      }
      return newObj[val];
    }
  },
  methods: {
    selectGroup(index) {
      this.isGroupSelect = index;
      this.getGroupInfo(index);
    },
    getOutRes() {
      console.log(this.outRes);
      this.$store.state.outRes = this.outRes;
    },
    chooseMedicine() {
      if (this.out[0] != 0) {
        var s = this.out.join(",") + ",";
        let sicf = true;

        for (var i = 0; i < this.out.length; i++) {
          if (
            s.replace(this.out[i] + ",", "").indexOf(this.out[i] + ",") > -1
          ) {
            if (this.out[i] != 0) {
              sicf = false;
            }
          }
        }
        if (sicf == false) {
          this.$alert(
            "The output port cannot be the same",
            "Prompt information",
            {
              confirmButtonText: "OK",
              callback: action => {}
            }
          );
          this.out = JSON.parse(JSON.stringify(this.a));
          this.$store.state.outputs = this.out;
        } else {
          this.a = JSON.parse(JSON.stringify(this.out));
          this.$store.state.outputsA = this.a;
          console.log(this.a);
        }
      }
    },
    chooseMedicine1() {
      if (this.out[1] != 0) {
        var s = this.out.join(",") + ",";
        let sicf = true;

        for (var i = 0; i < this.out.length; i++) {
          if (
            s.replace(this.out[i] + ",", "").indexOf(this.out[i] + ",") > -1
          ) {
            if (this.out[i] != 0) {
              sicf = false;
            }
          }
        }
        if (sicf == false) {
          this.$alert(
            "The output port cannot be the same",
            "Prompt information",
            {
              confirmButtonText: "OK",
              callback: action => {}
            }
          );
          this.out = JSON.parse(JSON.stringify(this.a));
          this.$store.state.outputs = this.out;
        } else {
          this.a = JSON.parse(JSON.stringify(this.out));
          this.$store.state.outputsA = this.a;
          console.log(this.a);
        }
      }
    },
    chooseMedicine2() {
      if (this.out[2] != 0) {
        var s = this.out.join(",") + ",";
        let sicf = true;

        for (var i = 0; i < this.out.length; i++) {
          if (
            s.replace(this.out[i] + ",", "").indexOf(this.out[i] + ",") > -1
          ) {
            if (this.out[i] != 0) {
              sicf = false;
            }
          }
        }
        if (sicf == false) {
          this.$alert(
            "The output port cannot be the same",
            "Prompt information",
            {
              confirmButtonText: "OK",
              callback: action => {}
            }
          );
          this.out = JSON.parse(JSON.stringify(this.a));
          this.$store.state.outputs = this.out;
        } else {
          this.a = JSON.parse(JSON.stringify(this.out));
          this.$store.state.outputsA = this.a;
          console.log(this.a);
        }
      }
    },
    chooseMedicine3() {
      if (this.out[3] != 0) {
        var s = this.out.join(",") + ",";
        let sicf = true;

        for (var i = 0; i < this.out.length; i++) {
          if (
            s.replace(this.out[i] + ",", "").indexOf(this.out[i] + ",") > -1
          ) {
            if (this.out[i] != 0) {
              sicf = false;
            }
          }
        }
        if (sicf == false) {
          this.$alert(
            "The output port cannot be the same",
            "Prompt information",
            {
              confirmButtonText: "OK",
              callback: action => {}
            }
          );
          this.out = JSON.parse(JSON.stringify(this.a));
          this.$store.state.outputs = this.out;
        } else {
          this.a = JSON.parse(JSON.stringify(this.out));
          this.$store.state.outputsA = this.a;
          console.log(this.a);
        }
      }
    },
    selectInput(index, output) {
      this.isActive = index;
      this.selectedSwitchAll();
    },
    getProInfo() {
      let that = this;
      let inputList = [
        {
          title: "CLOSE",
          index: 0
        }
      ];
      let aoData = {
        cmd: "video_info"
      };
      this.$axios
        .post("/cgi-bin/ligline.cgi", aoData)
        .then(function(response) {
          if (response.data.status == "SUCCESS") {
            let proVInfo = response.data.echo.result.Port;
            for (let i = 0; i < proVInfo.length; i++) {
              if (proVInfo[i].Dir == "In") {
                let ht = {
                  title: "In" + proVInfo[i].index,
                  index: proVInfo[i].index
                };
                inputList.push(ht);
              }
            }
            that.inputdata = inputList;
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
    selectType(index) {
      this.isSelect = index;
      if (index == 0) {
        this.isfull = true;
        this.list[0].data = [
          [
            {
              title: "Output Hor-Position",
              sid: 50,
              value: 0
            },
            {
              title: "Output Ver-Position",
              sid: 51,
              value: 0
            },
            {
              title: "Output Hor-Size",
              sid: 52,
              value: 960
            },
            {
              title: "Output Ver-Size",
              sid: 53,
              value: 540
            }
          ],
          [
            {
              title: "Output Hor-Position",
              sid: 50,
              value: 960
            },
            {
              title: "Output Ver-Position",
              sid: 51,
              value: 0
            },
            {
              title: "Output Hor-Size",
              sid: 52,
              value: 960
            },
            {
              title: "Output Ver-Size",
              sid: 53,
              value: 540
            }
          ],
          [
            {
              title: "Output Hor-Position",
              sid: 50,
              value: 0
            },
            {
              title: "Output Ver-Position",
              sid: 51,
              value: 540
            },
            {
              title: "Output Hor-Size",
              sid: 52,
              value: 960
            },
            {
              title: "Output Ver-Size",
              sid: 53,
              value: 540
            }
          ],
          [
            {
              title: "Output Hor-Position",
              sid: 50,
              value: 960
            },
            {
              title: "Output Ver-Position",
              sid: 51,
              value: 540
            },
            {
              title: "Output Hor-Size",
              sid: 52,
              value: 960
            },
            {
              title: "Output Ver-Size",
              sid: 53,
              value: 540
            }
          ]
        ];
      } else if (index == 1) {
        this.isfull = false;
      }
    },
    selectedSwitchAll() {
      let routingData = [];
      let that = this;
      console.log(this.out);
      for (let i = 0; i < this.out.length; i++) {
        if (this.out[i] != 0) {
          let ht = {
            type: "v",
            out: this.out[i],
            in: this.isActive
          };
          routingData.push(ht);
        }
      }

      let aoData = {
        cmd: "routing",
        routing: routingData
      };
      this.$axios
        .post("/cgi-bin/ligline.cgi", aoData)
        .then(function(response) {
          if (response.data.status == "SUCCESS") {
          } else if (response.data.status == "ERROR") {
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    sendData() {
      if (this.out[this.num] != 0) {
        let routingData = [];
        let that = this;
        if (this.num > 3) {
          return false;
        }
        if (that.isSelect == 0) {
          for (let i = 0; i < that.list[0].data[that.num].length; i++) {
            let ht = {
              index: that.out[that.num],
              sid: that.list[0].data[that.num][i].sid,
              value: Number(that.list[0].data[that.num][i].value)
            };
            routingData.push(ht);
          }
          // for (const key in that.list[0].data[this.num]) {
          //   if (that.list[0].data[this.num].hasOwnProperty(key)) {
          //     const element = that.list[0].data[this.num][key];
          //     let ht = {
          //       index: this.out[this.num],
          //       sid: element.sid,
          //       value: element.value
          //     };
          //     routingData.push(ht);
          //   }
          // }
        } else {
          for (const key in that.list[1].data[this.num]) {
            if (that.list[1].data[this.num].hasOwnProperty(key)) {
              const element = that.list[1].data[this.num][key];
              let ht = {
                index: this.out[this.num],
                sid: element.sid,
                value: element.value
              };
              routingData.push(ht);
            }
          }
        }
        routingData.push(
          {
            index: that.out[that.num],
            sid: 45,
            value: that.outRes
          },
          {
            index: that.out[that.num],
            sid: 14,
            value: 1
          }
        );
        console.log(routingData);

        let aoData = {
          cmd: "SetPortInfo",
          PortInfo: routingData
        };
        console.log(aoData);
        this.$axios
          .post("/cgi-bin/ligline.cgi", aoData)
          .then(function(response) {
            if (response.data.status == "SUCCESS") {
              that.num = that.num + 1;
              that.sendData();
            } else if (response.data.status == "ERROR") {
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        this.num = this.num + 1;
        this.sendData();
      }
    },
    saveInfo() {
      let that = this;
      let routingData = {
        groupid: that.isGroupSelect,
        porttype: 0,
        port: that.out
      };
      let aoData = {
        cmd: "SetGroupInfo",
        group: routingData
      };
      console.log(aoData);
      this.$axios
        .post("/cgi-bin/ligline.cgi", aoData)
        .then(function(response) {
          if (response.data.status == "SUCCESS") {
            that.saveSetInfo();
          } else if (response.data.status == "ERROR") {
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    saveSetInfo() {
      let routingData = [];
      let that = this;
      routingData.push({
        index: 405,
        sid: 45,
        value: that.outRes
      });
      let aoData = {
        cmd: "SetPortInfo",
        PortInfo: routingData
      };
      console.log(aoData);
      this.$axios
        .post("/cgi-bin/ligline.cgi", aoData)
        .then(function(response) {
          if (response.data.status == "SUCCESS") {
            that.num = 0;
            that.sendData();
          } else if (response.data.status == "ERROR") {
            that.num = 0;
            that.sendData();
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getGroupPort() {
      let that = this;
      let aoData = {
        cmd: "GetSupportGroupPort",
        porttype: 0
      };
      console.log(aoData);
      this.$axios
        .post("/cgi-bin/ligline.cgi", aoData)
        .then(function(response) {
          if (response.data.status == "SUCCESS") {
            let groupData = response.data.echo.result;
            let groupPort = [];
            for (let i = 0; i < groupData.length; i++) {
              let j = i + 1;
              let ht = {
                title: "Group" + j,
                index: j,
                outIndex: groupData[i]
              };
              groupPort.push(ht);
            }
            that.groupList = groupPort;
            that.getProInfo();
            that.getGroupInfo(that.groupList[0].index);
            console.log(groupData);
          } else if (response.data.status == "ERROR") {
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getGroupInfo(index) {
      this.outData = [
        {
          name: "CLOSE",
          value: 0
        }
      ];
      let that = this;
      let aoData = {
        cmd: "GetGroupInfo",
        group: {
          groupid: index,
          porttype: 0
        }
      };
      console.log(aoData);
      this.$axios
        .post("/cgi-bin/ligline.cgi", aoData)
        .then(function(response) {
          if (response.data.status == "SUCCESS") {
            let groupData = response.data.echo.result;
            if (groupData.length > 0) {
              for (let i = 0; i < groupData.length; i++) {
                if (groupData[i] != "") {
                  let ht = {
                    name: "Out" + groupData[i],
                    value: groupData[i]
                  };
                  that.outData.push(ht);
                }
              }
              that.out = [].concat(groupData);
              console.log(that.out);
            } else {
              that.out = [0, 0, 0, 0];
            }
            that.getGroupInfo1();
          } else if (response.data.status == "ERROR") {
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getGroupInfo1() {
      let that = this;
      let aoData = {
        cmd: "GetGroupInfo",
        group: {
          groupid: 0,
          porttype: 0
        }
      };
      console.log(aoData);
      this.$axios
        .post("/cgi-bin/ligline.cgi", aoData)
        .then(function(response) {
          if (response.data.status == "SUCCESS") {
            let groupData = response.data.echo.result;
            if (groupData.length > 0) {
              for (let i = 0; i < groupData.length; i++) {
                let ht = {
                  name: "Out" + groupData[i],
                  value: groupData[i]
                };
                that.outData.push(ht);
              }
            }
          } else if (response.data.status == "ERROR") {
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  created() {
    this.outRes = this.$store.state.outRes;
    this.out = this.$store.state.outputs;
  },
  mounted() {
    this.getGroupPort();
  }
};
</script>
<style>
.proInfoConfigure .el-tabs__item {
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
.proInfoConfigure .el-tabs {
  height: calc(100% - 10px);
}
.proInfoConfigure .el-tabs__content {
  height: calc(100% - 10px);
}
.proInfoConfigure .el-tab-pane {
  height: calc(100% - 10px);
}
</style>
<style scoped>
@import "../style/common";
.wrapper {
  width: 100%;
  height: 100%;
  overflow: auto;
}
.group {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.set_content {
  width: 820px;
  height: calc(100% - 20px);
  margin: 0 auto;
  overflow: auto;
  padding: 10px;
  background: #fff;
  border-radius: 5px;
  -webkit-overflow-scrolling: auto;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
}
.set_content_one_box {
  width: 150px;
  height: 600px;
  margin-top: 5px;
  /* padding-left: 5px; */
  border: 1px solid #000;
  overflow: auto;
  -webkit-overflow-scrolling: auto;
}
.s_c_o_b_block {
  width: 120px;
  /* height: 45px; */
  margin: 5px auto;
  /* border-radius: 5px; */
  padding-left: 10px;
  color: #fff;
  line-height: 30px;
  display: table;
  background: #4d4d4d;
  font-size: 14px;
  cursor: pointer;
  border: 0;
}
.s_c_o_b_block:hover {
  background: #727272;
}
.eBtn {
  width: 120px;
  /* height: 45px; */
  margin: 5px auto;
  /* border-radius: 5px; */
  padding-left: 10px;
  color: #fff;
  line-height: 30px;
  display: table;
  background: #409eff;
  font-size: 14px;
  border: 0;
  cursor: pointer;
}
.eBtn:hover {
  background: #66b1ff;
}
.titleML {
  margin-left: 4px;
}
.wallView {
  position: relative;
  width: 501px;
  height: 501px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  margin: 10px auto;
}
.typeSelectList {
  width: 501px;
  height: 100px;
  margin: 10px auto;
}
.inputViewFull {
  position: absolute;
  top: 0;
  left: 0;
  width: 500px;
  height: 500px;
}
.inputViewCenter {
  position: absolute;
  top: 125px;
  left: 125px;
  width: 250px;
  height: 250px;
}
.inputbackground {
  width: 100%;
  height: 100%;
  opacity: 0.8;
}
.typeSelect {
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
  margin: 0 10px 10px 0;
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
.activeBtn {
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;
}
.outPortWall {
  /* text-align: center; */
  position: relative;
}
.outSignal {
  position: absolute;
  z-index: 100;
  bottom: 0;
  right: 0;
}
.inp {
  position: absolute;
  z-index: 100;
  top: 10px;
  left: 5px;
}
.inp p {
  margin-top: 10px;
}
.inpSpan {
  float: right;
}
.btn {
  width: 100px;
  height: 32px;
  padding: 0px 20px;
}
.right {
  float: right;
}
</style>