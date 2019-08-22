<template>
<!-- 视频页面 -->
  <div class="wrapper">
    <div id="matrix_content">
      <div class="table">
        <div class="tableRow">
          <div class="table_cell">
            <p style="text-align:left;font-size:22px">Video</p>
            <p style="text-align:left">
              Number of Inputs:{{ this.aoDataLength - 1 }}
            </p>
            <p style="text-align:left">
              Number of Outputs:{{ this.aoDataOut.length }}
            </p>
          </div>
          <div class="table_cell1">
            <div
              class="nav_left_content"
              :class="isleftHidden == true ? 'hide' : ''"
            >
              <div
                class="nav_left_content_in"
                @click="turnLeft"
                :class="isleftHidden == true ? 'hide' : ''"
              ></div>
            </div>
          </div>
          <div class="table_cel3 table_cel4">
            <div class="output">Outputs</div>
            <div class="afvBtn">
              AFV
              <input
                title="All"
                id="afvAllBtn"
                class="afv_all"
                type="checkbox"
                :checked="afvAll == true ? 'checked' : false"
                @click="allSelect($event)"
              />
              <!-- <label for="afvAllBtn" class="afv_all">All</label> -->
            </div>
          </div>
          <div class="outPutInfo outPutInfo_title">
            <div
              class="tableCell "
              v-for="(items, index) in aoDataOut.slice(c, d)"
              :key="index"
            >
              <div class="groupHeader groupHeaderSecound">
                <span
                  :class="items.status == 'Off' ? 'signalNo' : 'signal'"
                ></span
                ><span
                  class="port_name"
                  :class="{
                    selected: index == nowIndex1 || index == bg_index2
                  }"
                  @mouseover="showInfo(index, items, 'up')"
                  @mouseleave="hideInfo()"
                  @click="selectPortInfo(items.index)"
                  >{{ items.title }}</span
                >
                <!-- @click="openSet(items.index, 'Out', items.title)" -->
              </div>
            </div>
          </div>
          <div class="outPutInfo outPutInfo_afv">
            <div
              class="tableCellAfv "
              v-for="(items, index) in aoDataOut.slice(c, d)"
              :key="index"
            >
              <div class="groupHeaderAfv">
                <input
                  type="checkbox"
                  :checked="items.switchAfv == true ? true : false"
                  :value="items.index"
                  @change="selectedAfv(items, items.index)"
                />
              </div>
            </div>
          </div>
          <div class="table_celR table_cel5"></div>
          <div class="table_cell">
            <div class="nav_right" :class="isrightHidden == true ? 'hide' : ''">
              <div
                class="nav_right_content"
                @click="turnRight"
                :class="isrightHidden == true ? 'hide' : ''"
              ></div>
            </div>
          </div>
        </div>
        <div class="tableRow1">
          <div class="table_cell1">
            <div class="nav_top" :class="istopHidden == true ? 'hide' : ''">
              <div
                class="nav_top_content_in"
                @click="turnTop"
                :class="istopHidden == true ? 'hide' : ''"
              ></div>
            </div>
          </div>
          <div class="table_cell1"></div>
          <div class="table_cel2"></div>
          <div>
            <div
              v-for="(items, index) in aoDataOut.slice(c, d)"
              :key="index"
            ></div>
          </div>
        </div>
        <div class="tableRow1">
          <div class="table_cel6">Inputs</div>
          <div class="table_cell1"></div>
          <div class="isAll table_cell1">
            <el-checkbox v-model="ckeckVal" @change="clickMe">All</el-checkbox>
          </div>
          <div class="table_cell1" v-if="isSelectAll">
            <div
              v-for="(items, index) in aoDataOut.slice(c, d)"
              :key="index"
              class="table_checkbox"
            >
              <input
                type="checkbox"
                :checked="items.switchSelect == true ? true : false"
                :value="items.index"
                @change="clickSelect(items.switchSelect, items.index)"
              />
            </div>
          </div>
        </div>
        <div
          class="tableRow"
          v-for="(items, index) in aoData.slice(e, f)"
          :key="index"
        >
          <div class="tableCell">
            <div class="groupRow">
              <span
                :class="[
                  { signalNo: items.status == 'Off' },
                  { signal: items.status == 'On' },
                  { signalClose: items.status == 'close' }
                ]"
              ></span
              ><span
                :class="{ selected: index!=0&&index == nowIndex || index == bg_index,port_name:index!=0}"
                @mouseover="showInfo(index, items)"
                @mouseleave="hideInfo()"
                @click="selectPortInfo(items.index)"
                >{{ items.title }}</span
              >
              <!-- @click="openSet(items.index, 'In', items.title)" -->
            </div>
          </div>
          <div class="table_cell1"></div>
          <div class="table_cell">
            <div
              v-if="items.link_status == 'true' && isSelectAll"
              class="link_status"
              :class="{ checked: true }"
              @mouseenter="showPortLink(index)"
              @mouseleave="hidePortLink(index)"
            ></div>
            <div
              v-else-if="isSelectAll"
              class="link_status"
              :class="{ checked: items.checked }"
              :title="aoData[index].title+'>ALL'"
              @click="selectedSwitchAll(items, items.index)"
              @mouseenter="showPortLink(index)"
              @mouseleave="hidePortLink(index)"
            ></div>
          </div>
          <div v-if="showBtn">
            <div
              class="table_cell"
              v-for="(interitems, interindex) in items.sourceGroup.slice(g, h)"
              :key="interindex"
              :class="{
                table_cell_bg:
                  (index == bg_index && interindex <= bg_index2) ||
                  (interindex == bg_index2 && index <= bg_index)
              }"
            >
              <div>
                <div
                  v-if="interitems.link_status == 'no'"
                  class="link_status_no"
                  :title="aoData[index].title+'>'+aoDataOut[interindex].title"
                  @mouseenter="showPortLink(index, interindex)"
                  @mouseleave="hidePortLink(index, interindex)"
                ></div>
                <div
                  v-else-if="interitems.link_status == 'true'"
                  class="link_status"
                  :class="{ checked: true }"
                  :title="aoData[index].title+'>'+aoDataOut[interindex].title"
                  @mouseenter="showPortLink(index, interindex)"
                  @mouseleave="hidePortLink(index, interindex)"
                ></div>
                <div
                  v-else
                  class="link_status"
                  :class="{ checked: interitems.checked }"
                  :title="aoData[index].title+'>'+aoDataOut[interindex].title"
                  @click="
                    selectedSwitch(interitems, items.index, interitems.index)
                  "
                  @mouseenter="showPortLink(index, interindex)"
                  @mouseleave="hidePortLink(index, interindex)"
                ></div>
              </div>
            </div>
          </div>
        </div>
        <div class="tableRow" v-for="i in isEnoughNum" v-if="isEnoughIn">
          <div class="tableCell"></div>
        </div>
        <div class="tableRow1">
          <div class="table_cel7"></div>
          <div></div>
          <div></div>
          <div>
            <div
              v-for="(items, index) in aoData.slice(c, d)"
              :key="index"
            ></div>
          </div>
        </div>
        <div class="tableRow">
          <div class="table_cell">
            <div class="nav_bottom" :class="isdownHidden == true ? 'hide' : ''">
              <div
                class="nav_bottom_content"
                @click="turnDown"
                :class="isdownHidden == true ? 'hide' : ''"
              ></div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="openSetInfo" class="setInfo">
        <div class="setInfo_box">
          <div class="title">Port Information {{title}}</div>
          <div class="boxContent">
            <table class="boxC">
              <tr
                v-for="(item,index) in staticData"
                class="staticTr">
                <td width="35%">{{item.id}}:</td>
                <td width="65%">{{item.value}}</td>
              </tr>
              <tr 
                v-for="(item, index) in setData" 
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
                  <select v-model="item.lastervalue" @change="listchange(item,index)">
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
                  <div class="block fl" style="width:85%">
                    <el-slider
                      style="width:90%"
                      :min="item.value.min"
                      :max="item.value.max"
                      @change="sliderchange(item,index)"
                      v-model="item.lastervalue"
                      input-size="mini"
                    ></el-slider>
                  </div>
                  <input
                    style="width:12%"
                    v-model="item.lastervalue"
                    type="text"
                    @keyup="silderInputInput(item,index)"
                    @change="silderInputChange(item,index)"
                  />
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
              <tr v-show="setData.length!=0">
                <td width="35%" style="font-size:16px;">Refresh:</td>
                <td width="65%">
                  <el-button 
                    class="btn" 
                    type="primary" 
                    @click="PortRefresh" 
                    >Refresh</el-button>
                </td>
              </tr>
            </table>
          </div>
          <div>
            <el-button
              class="isOk"
              type="primary"
              value="OK"
              :disabled= !HaveChange
              @click="saveBtn(isActive)">
              Save
            </el-button>
            <!-- @click="OKBtn" -->
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
        <!-- <SetInfo :portSetInfo="setInfo" @closePage="CancelShow"></SetInfo> -->
      </div>
    </div>
  </div>
</template>

<script>
import SetInfo from "./setInfo";
export default {
  components: {
    SetInfo
  },
  props: ["isShowV"],
  data() {
    return {
      sourceGroup: "",
      proVInfo: "",
      aoDataLength: 1,
      aoData: "",
      aoDataOut: "",
      nowIndex: "100",
      nowIndex1: "100",
      showBtn: true,
      openSetInfo: false,
      isrightHidden: false,
      isleftHidden: true,
      istopHidden: true,
      isdownHidden: false,
      isEnoughIn: false,
      isEnoughNum: [],
      a: 0,
      b: 16,
      c: 0,
      d: 16,
      e: 0,
      f: 17,
      g: 0,
      h: 16,
      bg_index: null,
      bg_index2: null,
      screenWidth: document.body.clientWidth,
      aoDataSelected: [],
      ckeckVal: this.$store.state.switchVideoALL,
      afvAll: this.$store.state.afvAll,
      isSelectAll: this.$store.state.switchVideoALL,
      setInfo: {},
      lastAoDataOutLength: 0,
      lastaoDataLength: 0,
      // 端口设置后加
      slider: 50,
      portList: this.$store.state.portInfo,
      isActive: -1,
      staticData: [],
      value: "",
      setData: "",
      setData2: "",
      // loading: true,
      isNeedSave: true,
      HaveChange:false,
      ChangeFlag:[]
      // portInfoLoadding: true,
      // saveLoading: false,
    };
  },
  watch: {
    screenWidth(val) {
      if (!this.timer) {
        this.screenWidth = val;
        this.timer = true;
        let that = this;
        setTimeout(function() {
          that.timer = false;
        }, 400);
      }
    },
    isShowV: {
      handler(newValue, oldValue) {
        //父组件param对象改变会触发此函数
        if (newValue == false) {
          if (window.myInterval) {
            window.clearInterval(window.myInterval);
          }
          if (window.allSwitchSetInterval) {
            window.clearInterval(window.allSwitchSetInterval);
          }
        } else {
          let that = this;
          if (that.ckeckVal == false) {
            that.getProInfo();
            window.myInterval = setInterval(function() {
              that.getProInfo();
            }, 3000);
          } else {
            that.getProInfo1();
            window.allSwitchSetInterval = setInterval(function() {
              that.getProInfo1();
            }, 3000);
          }
        }
      },
      deep: true
    },
    "$store.state.switchAfv":function(){
      console.log("this.$store.state.switchAfv "+this.$store.state.switchAfv.length);
      if(this.$store.state.switchAfv.length==this.aoDataOut.length)
      {
        this.afvAll = true;
        this.$store.state.afvAll = true;
      }
      else
      {
        this.afvAll = false;
        this.$store.state.afvAll = false;
      }
    },
    ChangeFlag:function(value)
    {
      let that =this;
      console.log("The data is "+JSON.stringify(value));
      let i=0;
      for(i;i<value.length;i++)
      {
        if(value[i]!=0)
        {
          break;
        }
      }
      if(i<value.length)
      {
        that.HaveChange=true;
      }
      else
      {
        that.HaveChange=false;
      }
    }
  },
  computed: {},
  methods: {
    //点击全选按钮
    clickMe() {
      let that = this;
      if (that.ckeckVal) {
        if (window.myInterval) {
          window.clearInterval(window.myInterval);
        }
        that.isSelectAll = true;
        for (let i = 0; i < that.aoData.length; i++) {
          that.aoData[i].link_status = "false";
          for (let j = 0; j < that.aoData[i].sourceGroup.length; j++) {
            that.aoData[i].sourceGroup[j].link_status = "no";
          }
        }
        let ht = [];
        //if(ht.length==0)
        {
          for (let i = 0; i < that.aoDataOut.length; i++) {
            that.aoDataOut[i].switchSelect = true;
            ht.push(that.aoDataOut[i].index);
            // console.log("that.aoDataOut"+that.aoDataOut[i]);
          }
          that.$store.state.switchAll = ht;
          that.$store.state.switchVideoALL=that.isSelectAll;
        }
       
        window.allSwitchSetInterval = setInterval(function() {
          that.getProInfo1();
        }, 3000);
        // console.log("all");
      } else {
        that.isSelectAll = false;
        this.$store.state.switchVideoAll=[];
        that.$store.state.switchVideoALL=that.isSelectAll;
        for (let i = 0; i < that.aoData.length; i++) {
          that.aoData[i].link_status = "false";
          for (let j = 0; j < that.aoData[i].sourceGroup.length; j++) {
            that.aoData[i].sourceGroup[j].link_status = "false";
          }
        }
        that.getProInfo();
        if (window.allSwitchSetInterval) {
          window.clearInterval(window.allSwitchSetInterval);
        }
        window.myInterval = setInterval(function() {
          that.getProInfo();
        }, 3000);
      }
    },
    allSelect(e) {
      let that = this;
      if (e.target.checked) {
        that.afvAll = true;
        let ht = [];
        for (let i = 0; i < that.aoDataOut.length; i++) {
          that.aoDataOut[i].switchAfv = true;
          ht.push(that.aoDataOut[i].index);
        }
        that.$store.state.switchAfv = ht;
        that.$store.state.afvAll = true;
      } else {
        that.afvAll = false;
        for (let i = 0; i < that.aoDataOut.length; i++) {
          that.aoDataOut[i].switchAfv = false;
        }
        that.$store.state.switchAfv.length = 0;
        that.$store.state.afvAll = false;
      }
    },
    clickSelect(ckeckValue, index) {
      let that = this;
      if (ckeckValue == true) {
        for (let i = 0; i < this.aoDataOut.length; i++) {
          if (this.aoDataOut[i].index == index) {
            this.aoDataOut[i].switchSelect = false;
          }
        }
        this.$store.state.switchAll.splice(
          this.$store.state.switchAll.indexOf(index),
          1
        );
        // console.log("dianji:" + this.$store.state.switchAll);
      } else {
        for (let i = 0; i < this.aoDataOut.length; i++) {
          if (this.aoDataOut[i].index == index) {
            this.aoDataOut[i].switchSelect = true;
          }
        }
        this.$store.state.switchAll.push(index);
      }
    },
    selectedSwitch(item, c, d) {
      let aoData = {
        cmd: "routing",
        routing: [
          {
            type: "v",
            out: d,
            in: c
          }
        ]
      };
      for (let i = 0; i < this.aoDataOut.length; i++) {
        if (this.aoDataOut[i].index == d) {
          if (this.aoDataOut[i].switchAfv == true) {
            aoData.routing[0].type = "av";
          }
        }
      }
      let that = this;
      this.$axios
        .post("/cgi-bin/ligline.cgi", aoData)
        .then(function(response) {
          if (response.data.status == "SUCCESS") {
            that.getProInfo();
          } else if (response.data.status == "ERROR") {
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //多切功能
    selectedSwitchAll(items, index) {
      let aoOut = [];
      let routingData = [];
      let that = this;
      that.$store.state.PageLoading=true;
      for (let i = 0; i < this.aoDataOut.length; i++) {
        if (this.aoDataOut[i].switchSelect == true) {
          aoOut.push(this.aoDataOut[i].index);
          let ht = {
            type: "v",
            out: this.aoDataOut[i].index,
            in: index
          };

          if (this.aoDataOut[i].switchAfv == true) {
            ht.type = "av";
          }
          routingData.push(ht);
        }
      }

      let aoData = {
        cmd: "routing",
        routing: routingData
      };
      console.log(aoData);

      this.$axios
        .post("/cgi-bin/ligline.cgi", aoData)
        .then(function(response) 
        {
          if (response.data.status == "SUCCESS") 
          {
            that.getProInfo1();
            that.$store.state.PageLoading=false;
          } 
          else if (response.data.status == "ERROR") 
          {
            that.$store.state.PageLoading=false;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    showInfo(index, item, isPosition) {
      if (this.screenWidth > 1025) {
        if (isPosition == "up") {
          this.nowIndex1 = index;
        } else {
          this.nowIndex = index;
        }
      }
    },
    hideInfo(index) {
      if (this.screenWidth > 1025) {
        this.nowIndex = "100";
        this.nowIndex1 = "100";
      }
    },
    // 端口号点击事件（返回数据）
    openSet(index, dir, title) {
      console.log(dir);
      if (index != 0) {
        let that = this;
        let aoData = {
          cmd: "SnapshotPort",
          PortInfo: {
            index: index,
            Dir: dir,
            type: "Video"
          }
        };
        this.$axios
          .post("/cgi-bin/ligline.cgi", aoData)
          .then(function(response) {
            if (response.data.status == "SUCCESS") {
              let portInfo = response.data.echo.result;
              that.setInfo = portInfo;
              that.setInfo.title = title;
              that.setInfo.index = index;
              that.setInfo.dir = dir;
            } else if (response.data.status == "ERROR") {
            }
          })
          .catch(function(error) {
            console.log(error);
          });
        this.openSetInfo = true;
      }
    },
    turnRight() {
      if (this.b < this.aoDataOut.length) {
        if (this.b == this.aoDataOut.length - 1) {
          this.isrightHidden = true;
        }
        this.a += 1;
        this.b += 1;
        this.c += 1;
        this.d += 1;
        this.g += 1;
        this.h += 1;
        this.isleftHidden = false;
      }
    },
    turnLeft() {
      if (this.a > 0) {
        if (this.a == 1) {
          this.isleftHidden = true;
        }
        this.a -= 1;
        this.b -= 1;
        this.c -= 1;
        this.d -= 1;
        this.g -= 1;
        this.h -= 1;
        this.isrightHidden = false;
      }
    },
    turnTop() {
      if (this.e > 0) {
        if (this.e == 1) {
          this.istopHidden = true;
        }
        this.e -= 1;
        this.f -= 1;
        this.isdownHidden = false;
      }
    },
    turnDown() {
      if (this.f < this.aoDataLength) {
        if (this.f == this.aoDataLength - 1) {
          this.isdownHidden = true;
        }
        this.e += 1;
        this.f += 1;
        this.istopHidden = false;
      }
    },
    showPortLink(a, b) {
      this.bg_index = a;
      this.bg_index2 = b;
    },
    hidePortLink() {
      this.bg_index = null;
      this.bg_index2 = null;
    },
    CancelShow(value) {
      this.openSetInfo = false;
      this.showBtn = true;
    },
    selectedAfv(item, index) {
      if (item.switchAfv == true) 
      {
        this.afvAll = false;
        this.$store.state.afvAll = false;
        item.switchAfv = false;
        this.$store.state.switchAfv.splice(
          this.$store.state.switchAfv.indexOf(index),
          1
        );
      } 
      else 
      {
        item.switchAfv = true;
        this.$store.state.switchAfv.push(index);
      }
    },
    //获取端口信息和切换状态
    getProInfo() {
      let that = this;
      let aoData = {
        cmd: "video_info"
      };
      this.$axios
        .post("/cgi-bin/ligline.cgi", aoData)
        .then(function(response) {
          if (response.data.status == "SUCCESS" && that.isSelectAll == false&&that.isShowV) {
            let proVInfo = response.data.echo.result.Port;
            that.portList=proVInfo;
            that.$store.state.portInfo = proVInfo;
            let sourceGroup = [];
            let switchAfv = that.$store.state.switchAfv;
            let switchAll = that.$store.state.switchAll;

            for (let j = 0; j < proVInfo.length; j++) {
              if (proVInfo[j].Dir == "Out") {
                proVInfo[j].link_status = "false";
                proVInfo[j].switchSelect = false;
                proVInfo[j].switchAfv = false;
                proVInfo[j].title = "OUT" + proVInfo[j].index;
                if (switchAfv != "") {
                  for (let k = 0; k < switchAfv.length; k++) {
                    if (proVInfo[j].index == switchAfv[k]) {
                      proVInfo[j].switchAfv = true;
                    }
                  }
                }
                if (switchAll.length != 0) {
                  for (let m = 0; m < switchAll.length; m++) {
                    if (proVInfo[j].index == switchAll[m]) {
                      proVInfo[j].switchSelect = true;
                    }
                  }
                }
                sourceGroup.push(proVInfo[j]);
              }
            }

            let sourceGroup1 = [
              {
                index: 0,
                Dir: "in",
                type: "v",
                title: "CLOSE",
                status: "close",
                link_status: "false",
                sourceGroup: JSON.parse(JSON.stringify(sourceGroup))
              }
            ];
            for (let i = 0; i < proVInfo.length; i++) {
              if (proVInfo[i].Dir == "In") {
                proVInfo[i].link_status = "false";
                proVInfo[i].title = "IN" + proVInfo[i].index;
                proVInfo[i].sourceGroup = sourceGroup;
                sourceGroup1.push(proVInfo[i]);
              }
            }
            //console.log(sourceGroup1);
            that.aoDataOut = sourceGroup;
            // console.log(that.aoDataOut);
            that.aoData = JSON.parse(JSON.stringify(sourceGroup1));
            //console.log("aoData is"+JSON.stringify(that.aoData));
            that.aoDataLength = that.aoData.length;
            if (that.aoDataLength < 17) {
              that.isEnoughIn = true;
              that.isEnoughNum = 17 - that.aoDataLength;
            }
            // console.log(this.aoDataLength);
            if (
              that.aoDataOut.length != that.lastAoDataOutLength ||
              that.aoDataLength != that.lastaoDataLength
            ) {
              that.isrightHidden = false;
              that.isleftHidden = true;
              that.istopHidden = true;
              that.isdownHidden = false;
              that.a = 0;
              that.b = 16;
              that.c = 0;
              that.d = 16;
              that.e = 0;
              that.f = 17;
              that.g = 0;
              that.h = 16;
              if (that.aoDataOut.length <= 16) {
                that.isrightHidden = true;
              } else {
                that.isrightHidden = false;
              }
              if (that.aoDataLength <= 17) {
                that.isdownHidden = true;
              } else {
                that.isdownHidden = false;
              }
            } else {
              if (that.aoDataOut.length <= 16) {
                that.isrightHidden = true;
              } else if (that.isrightHidden == true) {
                that.isrightHidden = true;
              } else {
                that.isrightHidden = false;
              }
              if (that.aoDataLength <= 17) {
                that.isdownHidden = true;
              } else if (that.isdownHidden == true) {
                that.isdownHidden = true;
              } else {
                that.isdownHidden = false;
              }
            }

            that.lastAoDataOutLength = JSON.parse(
              JSON.stringify(sourceGroup.length)
            );
            that.lastaoDataLength = JSON.parse(
              JSON.stringify(that.aoData.length)
            );
            for (let i = 0; i < proVInfo.length; i++) {
              for (let j = 0; j < that.aoData.length; j++) {
                if (
                  proVInfo[i].Dir == "Out" &&
                  proVInfo[i].switch == that.aoData[j].index
                ) {
                  for (let k = 0; k < that.aoData[j].sourceGroup.length; k++) {
                    if (
                      proVInfo[i].index == that.aoData[j].sourceGroup[k].index
                    ) {
                      that.aoData[j].sourceGroup[k].link_status = "true";
                    }
                  }
                }
              }
            }
            that.$emit("closeLoading", false);
          } else if (response.data.status == "ERROR") {
            /*that.isEnoughIn = true;
            that.isEnoughNum = 18 - that.aoDataLength;
            that.$alert(response.data.error, "Prompt information", {
              confirmButtonText: "OK",
              callback: action => {}
            });*/
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getProInfo1() {
      let that = this;
      let aoData = {
        cmd: "video_info"
      };
      this.$axios
        .post("/cgi-bin/ligline.cgi", aoData)
        .then(function(response) {
          //console.log("getProInfo 1"+that.isSelectAll);
          //console.log("getProInfo 1"+that.$store.state.switchAll.length);
          if (response.data.status == "SUCCESS" && that.isSelectAll == true&&that.isShowV) {
            
            let proVInfo = response.data.echo.result.Port;
            that.portList=proVInfo;
            that.$store.state.portInfo = proVInfo;
            let sourceGroup = [];
            let switchAfv = that.$store.state.switchAfv;
            let switchAll = that.$store.state.switchAll;
            // console.log("ALL:" + switchAll);
            // console.log("111111");
            for (let j = 0; j < proVInfo.length; j++) {
              if (proVInfo[j].Dir == "Out") {
                proVInfo[j].link_status = "no";
                proVInfo[j].switchSelect = false;
                proVInfo[j].switchAfv = false;
                proVInfo[j].title = "OUT" + proVInfo[j].index;
                if (switchAfv != "") {
                  for (let k = 0; k < switchAfv.length; k++) {
                    if (proVInfo[j].index == switchAfv[k]) {
                      proVInfo[j].switchAfv = true;
                    }
                  }
                }
                if (switchAll.length != 0) {
                  // console.log(2222);
                  for (let m = 0; m < switchAll.length; m++) {
                    if (proVInfo[j].index == switchAll[m]) {
                      proVInfo[j].switchSelect = true;
                    }
                  }
                }
                sourceGroup.push(proVInfo[j]);
              }
            }
            let sourceGroup1 = [
              {
                index: 0,
                Dir: "in",
                type: "v",
                title: "CLOSE",
                status: "close",
                link_status: "false",
                sourceGroup: JSON.parse(JSON.stringify(sourceGroup))
              }
            ];
            for (let i = 0; i < proVInfo.length; i++) {
              if (proVInfo[i].Dir == "In") {
                proVInfo[i].link_status = "false";
                proVInfo[i].title = "IN" + proVInfo[i].index;
                proVInfo[i].sourceGroup = sourceGroup;
                sourceGroup1.push(proVInfo[i]);
              }
            }
            // console.log(sourceGroup1);
            that.aoDataOut = sourceGroup;
            // console.log(that.aoDataOut);
            that.aoData = JSON.parse(JSON.stringify(sourceGroup1));
            that.aoDataLength = that.aoData.length;
            if (that.aoDataLength < 17) {
              that.isEnoughIn = true;
              that.isEnoughNum = 17 - that.aoDataLength;
            }
            // console.log(this.aoDataLength);
            if (
              that.aoDataOut.length != that.lastAoDataOutLength ||
              that.aoDataLength != that.lastaoDataLength
            ) {
              that.isrightHidden = false;
              that.isleftHidden = true;
              that.istopHidden = true;
              that.isdownHidden = false;
              that.a = 0;
              that.b = 16;
              that.c = 0;
              that.d = 16;
              that.e = 0;
              that.f = 17;
              that.g = 0;
              that.h = 16;
              if (that.aoDataOut.length <= 16) {
                that.isrightHidden = true;
              } else {
                that.isrightHidden = false;
              }
              if (that.aoDataLength <= 17) {
                that.isdownHidden = true;
              } else {
                that.isdownHidden = false;
              }
            } else {
              if (that.aoDataOut.length <= 16) {
                that.isrightHidden = true;
              } else if (that.isrightHidden == true) {
                that.isrightHidden = true;
              } else {
                that.isrightHidden = false;
              }
              if (that.aoDataLength <= 17) {
                that.isdownHidden = true;
              } else if (that.isdownHidden == true) {
                that.isdownHidden = true;
              } else {
                that.isdownHidden = false;
              }
            }

            that.lastAoDataOutLength = JSON.parse(
              JSON.stringify(sourceGroup.length)
            );
            that.lastaoDataLength = JSON.parse(
              JSON.stringify(that.aoData.length)
            );
            for (let i = 0; i < proVInfo.length; i++) {
              for (let j = 0; j < that.aoData.length; j++) {
                if (
                  proVInfo[i].Dir == "Out" &&
                  proVInfo[i].switch == that.aoData[j].index
                ) {
                  for (let k = 0; k < that.aoData[j].sourceGroup.length; k++) {
                    if (
                      proVInfo[i].index == that.aoData[j].sourceGroup[k].index
                    ) {
                      that.aoData[j].sourceGroup[k].link_status = "true";
                    }
                  }
                }
              }
            }
            that.$emit("closeLoading", false);
          } else if (response.data.status == "ERROR") {
            /*that.isEnoughIn = true;
            that.isEnoughNum = 18 - that.aoDataLength;
            that.$alert(response.data.error, "Prompt information", {
              confirmButtonText: "OK",
              callback: action => {}
            });*/
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // 端口设置方法
    getPortList(index) {
      let that = this;
      let aoData = {
        cmd: "video_info"
      };
      this.$axios
        .post("/cgi-bin/ligline.cgi", aoData)
        .then(function(response) {
          if (response.data.status == "SUCCESS") 
          {
            that.portList = response.data.echo.result.Port;
            console.log(JSON.stringify(that.portList));
            that.$store.state.portInfo = that.portList;
            for (let j = 0; j < that.portList.length; j++) 
            {
              if (that.portList[j].Dir == "Out") 
              {
                that.portList[j].title = "OUT" + that.portList[j].index;
              } 
              else 
              {
                that.portList[j].title = "IN" + that.portList[j].index;
              }
            }
            if (index) 
            {
              that.selectPortInfo(index);
            } 
            else 
            {
              if(that.portList.length>0)
              {
                that.selectPortInfo(that.portList[0].index);
              }
              else
              {
                that.selectPortInfo(-1);
              }
            }
          } 
          else if (response.data.status == "ERROR") 
          {
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
      this.ChangeFlag=new Array();
      let that = this;
      if (window.portSetTimeout) {
        window.clearInterval(window.portSetTimeout);
      }
      // that.loading = true;
      // that.portInfoLoadding = true;
      // that.staticData = [];
      if(index==0)
      {
        return ;
      }
      if(index==-1)
      {
        that.isActive="";
        return ;
      }
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
              let ji=0;
              let i=0;
              i=parseInt(setInfo.length/32);
              console.log("Set Data length is "+setInfo.length);
              for(ji;ji<i;ji++)
              {
                that.ChangeFlagData[ji]=0;
              }
            }
            if (responseInfo["Port Index"] == that.isActive) 
            {
              let staticAoData = [];
              for (var i in responseInfo) 
              {
                let ht = 
                {
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
      this.openSetInfo = true;
    },
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
    sliderchange(item,index) {
      //console.log("===============", Math.floor(item.lastervalue));
      let that=this;
      item.lastervalue = Math.floor(item.lastervalue);
      if(item.lastervalue==item.oldvalue)
      {
        that.ChangeFlagData(index,false);
      }
      else
      {
        that.ChangeFlagData(index,true);
      }
      console.log("silder data is "+JSON.stringify(item));
    },
    listchange(item,index){
      let that=this;
      if(item.oldvalue==item.lastervalue)
      {
        that.ChangeFlagData(index,false);
      }
      else
      {
        that.ChangeFlagData(index,true);
      }
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
          that.$store.state.PageLoading=true;
          this.$axios
            .post("/cgi-bin/ligline.cgi", data)
            .then(function(response) {
              if (response.data.status == "SUCCESS") {
                that.$alert("Save success", "Prompt information", {
                  confirmButtonText: "OK",
                  callback: action => {
                    setTimeout(() => {
                      that.PortRefresh();
                      that.$store.state.PageLoading=false;
                    }, 2000);
                    
                  }
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
            resetSure: "Cancel Reset Information" //取消重置信息
          };
          console.log(sendata);
        });
    },
    PortRefresh(){
      let that=this;
      that.ChangeFlag=new Array();
      console.log("The portList.length "+that.portList.length);
      if(that.portList.length>0)
      {
        if(that.isActive==-1||that.isActive=="")
        {
          that.getPortList();
        }
        else
        {
          let i;
          for(i=0;i<that.portList.length;i++)
          {
            if(that.portList[i].index==that.isActive)
            {
              break;
            }
          }
          if(i<that.portList.length)
          {
            that.getPortList(that.isActive);
          }
          else
          {
            that.getPortList();
          }
        }
      }
      else
      {
        return ;
      }
    },
    // 确定提交按钮
    saveBtn(index) {
      let that=this;
      var data = {};
      let val={}
      data.cmd = "SetPortInfo";
      data.PortInfo = [];
      val=this.$conf.PortAvOK(
        this.$conf.PortInfoAv.info, 
        index
      );

      /*data.PortInfo = this.$conf.PortAvOK(
        this.$conf.PortInfoAv.info, 
        index
      );*/
      if(!val.status)
      {
        that.$message(
          {
            message: val.ErrorText,
            type: "warning"
          }
        );
        return false;
      }
      data.PortInfo=val.data;
      if (data.PortInfo.length == 0) 
      {
        that.$alert(
          "Please set relevant parameters before saving.",
          "Prompt information",
          {
            confirmButtonText: "OK",
            callback: action => {
              that.ChangeFlag=new Array();
            }
          }
        );
        return false;
      }
      that.ChangeFlag=new Array();
      console.log("The data is " + JSON.stringify(data));
      that.$store.state.PageLoading=true;
      this.$axios
        .post("/cgi-bin/ligline.cgi", data)
        .then(function(response) {
          that.$store.state.PageLoading=false;
          that.$conf.PortInfoAv.info=JSON.parse(JSON.stringify(that.$conf.BasePortInfo.info));
          that.setData=that.$conf.PortInfoAv.info;
          if (response.data.status == "SUCCESS") {
            that.$message({
              message: "Save success",
              type: "success"
            });
          } else if (response.data.status == "ERROR") {
            that.$alert("Setting Failed", "Prompt information", {
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
    },
    // 关闭提交按钮
    CancelBtn() {
      this.ChangeFlag=new Array();
      this.$emit("closePage", false);
      this.$conf.PortCancel();
      this.openSetInfo = false;
    },
    silderInputChange(item,index)
    {
      let that=this;
      console.log("have change "+item.id);
      let data;
      data=parseInt(item.lastervalue);
      if(item.lastervalue==item.oldvalue)
      {
        that.ChangeFlagData(index,false);
      }
      else
      {
        that.ChangeFlagData(index,true);
      }
      if(isNaN(data)||data<item.value.min||data>item.value.max)
      {

      }
      else
      {
        item.lastervalue=data;
      }
      console.log("data is "+JSON.stringify(item));
    },
    silderInputInput(item,index)
    {
      let that=this;
      item.lastervalue=item.lastervalue.replace(/\D/g,'');
      if(item.lastervalue==item.oldvalue)
      {
        that.ChangeFlagData(index,false);
      }
      else
      {
        that.ChangeFlagData(index,true);
      }
    },
    ChangeFlagData(index,flag)
    {
      let that=this;
      let i=parseInt(index/32);
      let n=index%32;
      let data=JSON.parse(JSON.stringify(that.ChangeFlag));
      if(flag)
      {
        data[i]|=(1<<n);
      }
      else
      {
        data[i]&=(~(1<<n));
      }
      that.ChangeFlag=data;
    }
  },
  created() {
    this.portList = this.$store.state.portInfo;
    this.getProInfo();
  },
  mounted() {
    //获取端口信息
    let that = this;
    if (that.isShowV == true) 
    {
      if (that.ckeckVal) 
      {
        that.getProInfo1();
        that.portList = that.$store.state.portInfo;
        window.allSwitchSetInterval = setInterval(function() 
        {
          that.getProInfo1();
        }, 3000);
      } 
      else 
      {
        that.getProInfo();
        that.portList = that.$store.state.portInfo;
        window.myInterval = setInterval(function() {
          that.getProInfo();
        }, 3000);
      }
    }
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth;
        that.screenWidth = window.screenWidth;
      })();
    };
  }
};
</script>
<style>
.el-checkbox__label {
  display: inline-block;
  padding-left: 5px;
  line-height: 19px;
  font-size: 14px;
}
</style>

<style scoped>
@import "../../style/common";
.hide {
  visibility: hidden;
}
#matrix_content {
  width: 810px;
  padding: 10px 10px 0 0;
  height: 750px;
  min-height: 750px;
  margin: 0 auto;
  position: relative;
}
.ProTitle {
  text-align: center;
  font-size: 20px;
  margin-bottom: 10px;
}
.table {
  display: table;
  /* border-collapse: collapse; */
  table-layout: fixed;
}
.tableRow {
  display: table-row;
  height: 25px;
}
.tableRow1 {
  display: table-row;
  /* height: 10px; */
}
.tableCell,
.table_cell {
  width: 30px;
  height: 30px;
  display: table-cell;
  vertical-align: middle;
  box-sizing: border-box;
  text-align: center;
}
.tableCellAfv {
  width: 30px;
  height: 10px;
  display: table-cell;
  vertical-align: middle;
  box-sizing: border-box;
  text-align: center;
  background-color: white;
}
.table_checkbox {
  display: table-cell;
  width: 30px;
  height: 30px;
  box-sizing: border-box;
  text-align: center;
}
.table_cel2 {
  width: 50px;
  /* height: 10px; */
  display: table-cell;
  vertical-align: middle;
  box-sizing: border-box;
}
.table_cel3 {
  width: 65px;
  height: 160px;
  display: table-cell;
  vertical-align: middle;
  box-sizing: border-box;
  background-color: white;
}
.table_celR {
  width: 45px;
  height: 160px;
  display: table-cell;
  vertical-align: middle;
  box-sizing: border-box;
  background-color: white;
}
.table_cel4 {
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  border-right: 1px solid white;
}
.output {
  text-align: center;
  transform: translate(0, 100%) rotate(-90deg);
  transform-origin: 0 0;
  font-size: 20px;
  line-height: 50px;
}
.table_cel5 {
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  border-left: 1px solid white;
}
.table_cel6 {
  text-align: center;
  line-height: 50px;
  font-size: 20px;
  background-color: white;
  width: 180px;
  height: 50px;
  display: table-cell;
  vertical-align: middle;
  box-sizing: border-box;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
.table_cel7 {
  background-color: white;
  width: 180px;
  height: 10px;
  display: table-cell;
  vertical-align: middle;
  box-sizing: border-box;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
.table_cell1 {
  /* width: 10px; */
  display: table-cell;
  position: relative;
}
.tableCell {
  background-color: white;
}
.selected {
  color: blue;
}
.groupHeader {
  text-align: center;
  transform: translate(0, 85%) rotate(-65deg);
  transform-origin: 1px 0;
  white-space: nowrap;
  width: 0;
  /* margin-bottom: 5px; */
  line-height: 30px;
}

.groupHeaderSecound {
  height: 145px;
  box-sizing: border-box;
}
.groupHeaderAfv {
  width: 30px;
  height: 20px;
  box-sizing: border-box;
}
.groupRow {
  width: 180px;
  /* cursor: pointer; */
  height: 30px;
  box-sizing: border-box;
  padding-left: 20px;
  text-align: left;
  line-height: 30px;
}
.groupRowFirst {
  width: 75px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (min-width: 1025px) {
  .link_status,
  .link_status_no {
    width: 29px;
    height: 29px;
    cursor: pointer;
    margin: auto;
    display: block;
    /* // box-sizing: border-box; */
    background: url(../../../static/img/yuan2.png) no-repeat;
    -webkit-border-radius: 15px;
    -moz-border-radius: 15px;
    border-radius: 15px;
    z-index: 99;
  }
  .link_status_no {
    background: url(../../../static/img/yuan3.png) no-repeat;
    cursor: no-drop;
  }
  .checked {
    background: url(../../../static/img/yuan4.png) no-repeat;
  }
}

@media (max-width: 1025px) {
  .link_status,
  .link_status_no {
    width: 29px;
    height: 29px;
    cursor: pointer;
    margin: auto;
    display: block;
    box-sizing: border-box;
    -webkit-border-radius: 15px;
    -moz-border-radius: 15px;
    border-radius: 15px;
    box-shadow: 1px 1px 1px 0 #777;
    -moz-box-shadow: 1px 1px 1px 0 #777;
    -webkit-box-shadow: 1px 1px 1px 0 #777;
    -o-box-shadow: 1px 1px 1px 0 #777;
    background-color: white;
    z-index: 99;
  }
  .link_status_no {
    background-color: #ccc;
    cursor: no-drop;
  }
  .checked {
    background-color: #009a61;
  }
}

.nav_left_content {
  display: block;
  width: 0;
  height: 0;
  cursor: pointer;
  border-top: 60px solid transparent;
  border-right: 30px solid #4d4d4d;
  border-bottom: 60px solid transparent;
  position: absolute;
  top: 23px;
  left: -30px;
}
.nav_left_content_in {
  display: block;
  width: 0;
  height: 0;
  cursor: pointer;
  border-top: 56px solid transparent;
  border-right: 27px solid white;
  border-bottom: 56px solid transparent;
  position: absolute;
  top: -56px;
  left: 2px;
}
.nav_right {
  width: 0;
  height: 0;
  border-top: 60px solid transparent;
  border-left: 30px solid #4d4d4d;
  border-bottom: 60px solid transparent;
  position: relative;
}
.nav_right_content {
  display: block;
  width: 0;
  height: 0;
  cursor: pointer;
  border-top: 56px solid transparent;
  border-left: 27px solid white;
  border-bottom: 56px solid transparent;
  position: absolute;
  top: -56px;
  left: -29px;
}
.nav_top {
  width: 0;
  height: 0;
  border-left: 60px solid transparent;
  border-right: 60px solid transparent;
  border-bottom: 30px solid #4d4d4d;
  position: absolute;
  top: -30px;
  left: 30px;
}
.nav_top_content_in {
  display: block;
  width: 0;
  height: 0;
  cursor: pointer;
  border-left: 56px solid transparent;
  border-right: 56px solid transparent;
  border-bottom: 27px solid white;
  position: absolute;
  top: 2px;
  left: -56px;
}
.nav_bottom {
  width: 0;
  height: 0;
  border-left: 60px solid transparent;
  border-right: 60px solid transparent;
  border-top: 30px solid #4d4d4d;
  position: relative;
  left: 30px;
}
.nav_bottom_content {
  display: block;
  cursor: pointer;
  width: 0;
  height: 0;
  border-left: 56px solid transparent;
  border-right: 56px solid transparent;
  border-top: 27px solid white;
  position: absolute;
  top: -29px;
  left: -56px;
}
.nav_bottom_content:hover {
  border-top: 27px solid #ededed;
}
.nav_left_content_in:hover {
  border-right: 27px solid #ededed;
}
.nav_top_content_in:hover {
  border-bottom: 27px solid #ededed;
}
.nav_right_content:hover {
  border-left: 28px solid #ededed;
}

.port_name {
  cursor: pointer;
}
.setInfo {
  width: 577px;
  height: 560px;
  overflow-y:auto;
  border: 1px solid #ccc;
  position: absolute;
  top: 185px;
  left: 190px;
  background-color: white;
  z-index: 100;
}
.bottom_btn {
  text-align: center;
  width: 475px;
  position: absolute;
  bottom: 20px;
}
.btn {
  width: 100px;
  height: 30px;
  line-height: 0;
}
.btn:first-child {
  margin-right: 50px;
}
button,
.afv_all {
  cursor: pointer;
}
.table_cell_bg {
  background-color: #909399;
}
.signal {
  display: inline-block;
  width: 12px;
  height: 12px;
  background: #009a61;
  -webkit-border-radius: 6px;
  -moz-border-radius: 6px;
  border-radius: 6px;
  margin-right: 10px;
  text-align: center;
}
.signalNo {
  display: inline-block;
  width: 12px;
  height: 12px;
  background: #ccc;
  -webkit-border-radius: 6px;
  -moz-border-radius: 6px;
  border-radius: 6px;
  margin-right: 10px;
  text-align: center;
}
.afvStatus {
  display: inline-block;
  width: 12px;
  height: 12px;
  background: #ccc;
  -webkit-border-radius: 6px;
  -moz-border-radius: 6px;
  border-radius: 6px;
  text-align: center;
  cursor: pointer;
}
.afvStatusT {
  display: inline-block;
  width: 12px;
  height: 12px;
  background: #009a61;
  -webkit-border-radius: 6px;
  -moz-border-radius: 6px;
  border-radius: 6px;
  text-align: center;
  cursor: pointer;
}
.signalClose {
  cursor:default;
  display: inline-block;
  width: 12px;
  height: 12px;
  background: black;
  -webkit-border-radius: 6px;
  -moz-border-radius: 6px;
  border-radius: 6px;
  margin-right: 10px;
  text-align: center;
}
.isAll {
  width: 58px;
  text-align: center;
  line-height: 50px;
}
.afvBtn {
  position: absolute;
  top: 155px;
  left: 196px;
}
.outPutInfo {
  width: 480px;
  background-color: white;
}
.outPutInfo_title {
  height: 145px;
}
.outPutInfo_afv {
  height: 20px;
}

/* 端口设置CSS */
.setInfo_box {
  height: 520px;
  padding: 20px 45px;
  position: relative;
  overflow-y:auto;
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