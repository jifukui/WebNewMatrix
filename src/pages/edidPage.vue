<template>
  <div class="wrapper">
    <div class="set_content">
      <div class="edidC">
        <p class="set_content_edid_title">EDID</p>
        <div class="set_content_edid_box set_content_one">
          <p>Read From</p>
          <div class="set_content_one_box">
            <p style="margin-top: 5px;margin-left: 5px;">Outputs</p>
            <button
              class="s_c_o_b_block"
              v-for="(item,index) in outputdata"
              @click="outClcick(item.index,item.output)"
              :disabled="selecting"
              :class="{active:item.index==isActive}"
              :key="index"
            >{{item.output}}</button>
            <p style="margin-top: 5px;margin-left: 5px;">Inputs</p>
            <button
              class="s_c_o_b_block"
              v-for="(item,index) in inputdata"
              @click="inClcick(item.index,item.input)"
              :class="{active:item.index==isActive}"
              :key="index"
              :disabled="selecting"
            >{{item.input}}</button>
          </div>
          <button
            class="set_content_one_default"
            :disabled="selecting"
            :style="style_bg==true?'background: #ededed; color: #000;':'background: #409EFF;'"
            @click="defaultClick"
          >DEFAULT</button>
          <input
            type="file"
            id="EDIDFile"
            ref='uploadExcelId'
            hidden
            @change="ReadEDIDFile"
          >
          <button
            class="set_content_one_file"
            :style="edidFile==true?'background:#409EFF;color:#fff':'background:#ededed'"
            @click="GetEDID"
          >File<br>BROWSE</button>
        </div>
        <div class="set_content_edid_box set_content_two">
          <p>Short Summary</p>
          <div
            class="set_content_two_information"
            v-show="trueEdid"
          >
            <p class="set_content_two_font set_content_two_font1">{{ ModuleName }}</p>
            <p class="set_content_two_font">{{ size }}</p>
            <p class="set_content_two_font clear">{{ audio }}</p>
            <p class="set_content_two_font set_content_two_font2 ">{{ Model }}</p>
          </div>
          <div
            class="set_content_two_information"
            v-show="!trueEdid"
          >
            <p class="errorInfo">{{ERRInfo}}</p>
          </div>
          <div class="clear"></div>
          <div class="set_content_one_box2">
            <p class="set_content_two_inputs">FROM</p>
            <p
              class="set_content_two_inputs"
              style="color: #409EFF;"
            >{{ DefaultTxt }}</p>
            <p
              class="set_content_two_inputs"
              style="color: #409EFF;"
            >{{ output }}</p>
            <p
              class="set_content_two_inputs"
              style="color: #409EFF;"
            >{{ Uploading }}</p>
            <p
              class="set_content_two_inputs"
              v-show="!selectInput"
            >Select a destination</p>
            <p
              class="set_content_two_inputs"
              v-show="selectInput"
            >TO input</p>
            <p
              class="set_content_two_inputs"
              v-show="selectInput"
              v-for="(item,index) in selectMsg"
              style="color: #409EFF;"
              :key="index"
            >{{ item.title }}</p>
          </div>
          <button
            class="set_content_two_copy"
            v-show="showCopy"
            :disabled="selecting"
            @click="edidCopyClick()"
          >COPY</button>
        </div>
        <div class="set_content_edid_box set_content_three">
          <p>Copy to</p>
          <p class="set_content_one_p">
            <input
              id="EDID_inputs"
              class="s_c_o_p_input"
              type="checkbox"
              :checked="ischecked==true?'checked':false"
              :disabled="!trueEdid"
              @click="allSelect($event)"
            >
            <label
              for="EDID_inputs"
              class="cp"
            >All</label>
          </p>
          <div class="set_content_one_box">
            <button
              class="set_content_three_input"
              v-for="(item,index) in copyInput"
              :key="index"
              :disabled="!trueEdid"
              @click="copyInputClick(item)"
              :class="{s_c_t_input:item.checked}"
            >{{ item.PHYName }}</button>
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
      // 左侧部分
      outputdata: [], // 输出
      inputdata: [], // 输入
      // 上传文件
      fileList: [],
      uploadsuccess: false,
      // 点击变色
      style_bg: !this.$store.state.EDIDDefault, //Default按钮状态
      edidFile: false, //上传文件按钮状态
      isActive: -1, //输入输出按钮状态
      // 中间部分
      ModuleName: "",
      size: "",
      audio: "",
      Model: "",
      output: "", //输入输出
      DefaultTxt: "", //默认按钮
      Uploading: "", //文件名
      // 默认按钮
      selectInput: false,
      selectMsg: [], //右侧输入名
      edidCheckbox: [],
      edidCheckboxSet: 0,
      // 右侧输入
      copyInput: [],
      copyIndex: [],
      showCopy: false, // 提交按钮
      EDIDData: "",
      EDIDinfo: "",
      trueEdid: false,
      type: "",
      indexNumber: 0,
      selecting: false,
      outputindex:null,
      EDIDErr:0,
      ERRInfo:"ERROR EDID",
      IsOutput:true,
      CodeState:false
    };
  },
  watch: {
    selectMsg(val, oldval) 
    {
      // console.log(val, oldval);
      if (oldval.length == 0) 
      {
        this.selectInput = false;
        this.showCopy = false;
      } 
      else 
      {
        this.selectInput = true;
        this.showCopy = true;
      }
    },
    fileList(val, oldval) {
      console.log(val, oldval);
      if (oldval.length == 0) {
        this.uploadsuccess = false;
      } else {
        this.uploadsuccess = true;
      }
    },
    "$store.state.portInfo": function() {
      // this.portInfo = this.$store.state.portInfo;
    }
  },
  computed: {},
  methods: {
    /*
			--- 左侧 --- 
		*/
    // OUT选择按钮
    outClcick(index, output) {
      this.IsOutput=true;
      console.log("index is "+index+" output is"+output);
      //this.selecting = true;
      this.output = output;
      this.isActive = index;
      this.edidFile = false;
      this.Uploading = "";
      if (this.style_bg == false) 
      {
        this.type = 2;
      } 
      else 
      {
        this.type = 1;
      }
      if(this.$store.state.EDIDIndex!=index||this.$store.state.EDIDPortType!=this.type)
      {
        console.log("have change ");
        let i=0;
        for( i=0;i<this.outputdata.length;i++)
        {
          if(this.outputdata[i].index==index)
          {
            break;
          }
        }
        this.outputindex=i;
        if(this.outputindex>=this.outputdata.length)
        {
          this.outputindex=0;
        }
        this.EDIDErr=0;
      }
      this.$store.state.EDIDIndex=index;
      this.$store.state.EDIDPortType=this.type;
      //this.outputindex=index;
      console.log("The index is "+this.outputindex);
      if(this.outputindex!=null&&this.outputdata[this.outputindex].status=="Off"&&this.$store.state.EDIDPortType==1)
      {
        console.log("The Outport no load");
        this.ERRInfo="out"+this.$store.state.EDIDIndex+" no load";
        this.trueEdid=false;
        

        this.ischecked = false;
        this.selectInput = false;
        this.showCopy = false;
        for (var i = 0; i < this.copyInput.length; i++)
        {
          this.$delete(this.copyInput[i], "checked");
        }
        this.selectMsg.length = 0;
        this.copyIndex.length = 0;
        this.selecting=false;
      }
      else
      {
        this.getEdidInfo(this.type, index);
      }
    },
    // IN选择按钮
    inClcick(index, output) {
      this.IsOutput=false;
      console.log("Input ");
      //this.selecting = true;
      this.output = output;
      this.isActive = index;
      this.edidFile = false;
      this.Uploading = "";
      if (this.style_bg == false) 
      {
        this.type = 2;
      } 
      else 
      {
        this.type = 0;
      }
      if(this.$store.state.EDIDIndex!=index||this.$store.state.EDIDPortType!=this.type)
      {
        console.log("have change ")
        this.EDIDErr=0;
      }
      this.$store.state.EDIDIndex=index;
      this.$store.state.EDIDPortType=this.type;
      this.getEdidInfo(this.type, index);
    },
    // DEFAULT默认按钮
    defaultClick() 
    {
      if (this.isActive != -1) 
      {
        let that=this;
        //this.selecting = true;
        let type = 0;
        if (this.style_bg == true) 
        {
          type = 2;
          this.DefaultTxt = "Default";
          this.style_bg = false;
        } 
        else 
        {
          for (let i = 0; i < this.outputdata.length; i++) 
          {
            if (this.isActive == this.outputdata[i].index) 
            {
              type = 1;
            }
          }
          this.DefaultTxt = "";
          this.style_bg = true;
        }
        if(this.$store.state.EDIDPortType!=type)
        {
          console.log("have change ")
          this.EDIDErr=0;
        }
        this.edidFile = false;
        this.Uploading = "";
        this.type = type;
        this.$store.state.EDIDDefault=!this.style_bg;
        this.$store.state.EDIDPortType=type;
        console.log("The default index is "+this.isActive);
        this.getEdidInfo(this.type, this.$store.state.EDIDIndex);
      }
    },
    // 上传文件
    GetEDID() {
      document.getElementById("EDIDFile").click();
    },
    // 上传文件点击确认后
    ReadEDIDFile() {
      let that = this;
      let file = document.getElementById("EDIDFile").files[0];
      let re = /.bin$/i;
      let SafariFlag = navigator.userAgent.search("Safari");
      if (typeof FileReader == "undefined") {
        SafariFlag = true;
      } else {
        SafariFlag = false;
      }
      if (parseInt(file.size) % 128 != 0) {
        that.$alert("ERROR File Type Error", "Prompt information", {
          confirmButtonText: "OK",
          callback: action => {}
        });
        return false;
      }
      if (re.test(file.name)) {
        var reader;
        reader = new FileReader();
        that.Uploading = file.name;
        reader.readAsArrayBuffer(file);
        reader.onprogress = function() {
          reader.onload = function() {
            var aByte, byteStr;
            //console.log(reader.result);
            let result = new Uint8Array(reader.result);
            //console.log(result);
            var edidText = "";
            let n;
            for (n = 0; n < result.length; ++n) 
            {
              aByte = result[n];
              byteStr = aByte.toString(16);
              if (byteStr.length < 2) 
              {
                byteStr = "0" + byteStr;
              }
              edidText += byteStr;
            }
            that.EDIDinfo = edidText;
            that.EDIDHandle(edidText);
            that.$store.state.EDIDIndex=null;
            that.type = 3;
            console.log("File type is "+that.type);
          };
          reader.onerror = function() {
            if (evt.target.error.name == "NotReadableError") {
            }
          };
        };
      } else {
        that.$alert("File type error", "Prompt information", {
          confirmButtonText: "OK",
          callback: action => {}
        });
        
      }
      this.output = "";
      this.DefaultTxt = "";
      this.style_bg = true;
      this.edidFile = true;
      this.isActive = -1;
      this.$refs.uploadExcelId.value = null;
    },
    /*
			--- 中部 --- 
		*/
    // Copy按鈕
    edidCopyClick() {
      this.CodeState=true;
      let that = this;
      that.selecting = true;
      let copyIndexLength = that.copyIndex.length;
      console.log("that.copyIndex.length "+that.copyIndex.length);
      console.log("that.indexNumber "+that.indexNumber)
      if (that.indexNumber < copyIndexLength) 
      {
        setTimeout(function() {
          that.edidCopy(that.copyIndex[that.indexNumber]);
        }, 2000);
      } 
      else 
      {
        that.indexNumber = 0;
        setTimeout(function() {
          that.CodeState=false;
          that.selecting = false;
        }, 2000);
      }
    },
    edidCopy(index) {
      let copyIn = [index];
      let aoData = {
        cmd: "SetEDID",
        edid: {
          in: copyIn,
          type: 0, //0 in,1 out,2default,3file
          data: this.EDIDinfo //edid字符串以大写的方式传过来
        }
      };
      //console.log(aoData);
      let that = this;
      this.$axios
        .post("/cgi-bin/ligline.cgi", aoData)
        .then(function(response) {
          if (response.data.status == "SUCCESS") 
          {
            that.$message({
              message: "In" + index + " copy success",
              type: "success"
            });
            that.indexNumber++;
            that.edidCopyClick();
          } 
          else if (response.data.status == "ERROR") 
          {
            that.$confirm("In" + index + " copy error", "Prompt information", 
              {
                confirmButtonText: "Next",
                cancelButtonText: "Again",
                type: "warning",
                closeOnClickModal: false
              })
              .then(() => {
                that.indexNumber++;
                that.edidCopyClick();
              })
              .catch(() => {
                that.edidCopyClick();
              });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // 全选按钮
    allSelect(e) {
      let that = this;
      if (e.target.checked) 
      {
        that.ischecked = true;
        that.selectMsg.length = 0;
        that.copyIndex.length = 0;
        for (var i = 0; i < that.copyInput.length; i++) 
        {
          that.$set(that.copyInput[i], "checked", true);
          let ht = {
            title: that.copyInput[i].PHYName,
            index: that.copyInput[i].index
          };
          that.selectMsg.push(ht);
          that.copyIndex.push(that.copyInput[i].index);
        }
      } 
      else 
      {
        that.ischecked = false;
        that.selectInput = false;
        that.showCopy = false;
        for (var i = 0; i < that.copyInput.length; i++) 
        {
          that.$delete(that.copyInput[i], "checked");
        }
        that.selectMsg.length = 0;
        that.copyIndex.length = 0;
      }
    },
    compare(property) {
      return function(a, b) {
        var value1 = a[property];
        var value2 = b[property];
        return value1 - value2;
      };
    },
    // Out多选按钮
    copyInputClick(item) {
      let ht = {
        title: item.PHYName,
        index: item.index
      };
      if (typeof item.checked == "undefined") 
      {
        this.$set(item, "checked", true);
        this.selectMsg.push(ht);
        this.copyIndex.push(item.index);
        this.selectMsg.sort(this.compare("index"));
      } 
      else 
      {
        this.$delete(item, "checked");
        this.ischecked = false;
        for (var i = 0; i < this.selectMsg.length; i++) 
        {
          if (this.selectMsg[i].index == item.index) 
          {
            this.selectMsg.splice(i, 1);
            break;
          } 
          else {
          }
        }
        for (var i = 0; i < this.copyIndex.length; i++) 
        {
          if (this.copyIndex[i] == item.index) 
          {
            this.copyIndex.splice(i, 1);
            break;
          } 
          else 
          {
          }
        }
      }
    },
    // 插件调用的函数
    edidClear() {},
    ischecked() {},
    handleSuccess(response, file, fileList) {
      this.uploadsuccess = true;
      console.log(response, file, fileList);
    },
    handleRemove(file, fileList) {
      // console.log(file, fileList);
      if (fileList.length == 0) {
        this.uploadsuccess = false;
      }
    },
    handlePreview(file) {
      console.log(file);
    },
    EDIDHandle(data) {
      let that = this;
      that.trueEdid = true;
      console.log("ERR "+that.EDIDErr);
      if (that.$EDID.setEdidData(data) == "errorEDID") 
      {
        that.EDIDErr++;
        if(that.EDIDErr==1)
        {
          that.$alert("ERROR EDID: "+that.$EDID.EDIDERR(), "Prompt information", {
          confirmButtonText: "OK",
          callback: action => {}
          });
        }
        that.ERRInfo="ERROR EDID";
        that.trueEdid = false;

        that.ischecked = false;
        that.selectInput = false;
        that.showCopy = false;
        for (var i = 0; i < that.copyInput.length; i++) 
        {
          that.$delete(that.copyInput[i], "checked");
        }
        that.selectMsg.length = 0;
        that.copyIndex.length = 0;

        return false;
      } 
      else 
      {
        that.EDIDErr=0;
        that.ModuleName = that.$EDID.getName();
        that.size = that.$EDID.getNativeResolution();
        that.audio = that.$EDID.getAudioChannels();
        that.Model = that.$EDID.getLength();
      }
    },
    getProInfo() 
    {
      if(this.CodeState)
      {
        console.log("Waitting Copy EDID getProInfo");
        return;
      }
      let that = this;
      let aoData = {
        cmd: "video_info"
      };
      this.$axios
        .post("/cgi-bin/ligline.cgi", aoData)
        .then(function(response) {
          if (response.data.status == "SUCCESS") 
          {
            let proVInfo = response.data.echo.result.Port;
            that.$store.state.portInfo = proVInfo;
            that.outputdata = [];
            that.inputdata = [];
            //let flag=that.copyInput.length==0?false:true;
            //that.copyInput = [];
            let Copyto=[];
            for (let j = 0; j < proVInfo.length; j++) 
            {
              if (proVInfo[j].Dir == "Out") 
              {
                proVInfo[j].title = "out" + proVInfo[j].index;
                that.outputdata.push({
                  index: proVInfo[j].index,
                  output: proVInfo[j].title,
                  status:proVInfo[j].status
                });
              } 
              else 
              {
                proVInfo[j].title = "in" + proVInfo[j].index;
                that.inputdata.push({
                  index: proVInfo[j].index,
                  input: proVInfo[j].title
                });
                //if(!flag)
                {
                  Copyto.push({
                  index: proVInfo[j].index,
                  PHYName: proVInfo[j].title
                  });
                }
              }
            }
            that.selectMsg.length=0;
            for(let i=0;i<that.copyInput.length;i++)
            {
              if(that.copyInput[i].checked==true)
              {
                for(let j=0;j<Copyto.length;j++)
                {
                  if(that.copyInput[i].index==Copyto[j].index)
                  {
                    console.log("The msg is "+that.copyInput[i].PHYName)
                    let ht = {
                      title: that.copyInput[i].PHYName,
                      index: that.copyInput[i].index
                    };
                    that.selectMsg.push(ht);
                    Copyto[j].checked=true;
                  }
                }
              }
            }
            that.copyInput=Copyto;
            if(that.copyInput.length==0)
            {
              that.showCopy=false;
              that.selectInput=false;
            }
            if(that.copyInput.length==that.selectMsg.length)
            {
              that.ischecked=true;
            }
            else
            {
              that.ischecked=false;
            }
            console.log("EDIDIndex "+that.$store.state.EDIDIndex);
            console.log("EDIDPortType "+that.$store.state.EDIDPortType);
            if(that.$store.state.EDIDIndex!=null)
            {
              let jiport;
              let i=0;
              
              jiport=that.IsOutput==false?that.inputdata:that.outputdata;
              console.log("that.IsOutput "+that.IsOutput);
              for( i=0;i<jiport.length;i++)
              {
                if(that.$store.state.EDIDIndex==jiport[i].index)
                {
                  break;
                }
              }
  
              if(i==jiport.length)
              {
                that.SetPort();
              }
              else
              {
                //console.log("status "+jiport[i].status);
                if(that.$store.state.EDIDPortType==1&&jiport[i].status=="Off")
                {
                  that.outputindex=i;
                  that.outClcick(that.$store.state.EDIDIndex,"out"+that.$store.state.EDIDIndex);
                }
                else
                {
                  that.outputindex=null;
                  if(that.$store.state.EDIDPortType==0)
                  {
                    that.inClcick(that.$store.state.EDIDIndex,"in"+that.$store.state.EDIDIndex);
                  }
                  else if(that.$store.state.EDIDPortType==1)
                  {
                    that.outClcick(that.$store.state.EDIDIndex,"out"+that.$store.state.EDIDIndex);
                  }
                }
              }
            }
            else
            {
              console.log("type is "+that.type);
              if(that.type==3)
              {
                return ;
              }
              that.SetPort();
            }
          } 
          else if (response.data.status == "ERROR") 
          {
            that.outputindex=null;
          }          
        })
        .catch(function(error) {
          that.outputindex=null;
          console.log(error);
        });
    },
    SetPort(){
      let that=this;
      if (that.outputdata.length != 0) 
      {
        that.outputindex=0;
        that.outClcick(
        that.outputdata[0].index,
        that.outputdata[0].output
        );
      } 
      else if (that.inputdata.length != 0) 
      {
        that.inClcick(that.inputdata[0].index, that.inputdata[0].input);
      }
    },
    getEdidInfo(type, index) {
      let aoData = {
        cmd: "GetEDID",
        edid: {
          index: index,
          type: type //0 in,1 out,2default
        }
      };
      let that = this;
      that.selecting=true;
      this.$axios
        .post("/cgi-bin/ligline.cgi", aoData)
        .then(function(response) {
          that.selecting=false;
          if (response.data.status == "SUCCESS") {
            that.selecting = false;
            that.trueEdid = true;
            that.EDIDinfo = response.data.echo.result.EDID;
            that.EDIDHandle(that.EDIDinfo);
          } 
          else if (response.data.status == "ERROR") 
          {
            that.EDIDinfo = "";
            that.selecting = false;
            that.trueEdid = false;

            that.ischecked = false;
            that.selectInput = false;
            that.showCopy = false;
            for (var i = 0; i < that.copyInput.length; i++) 
            {
              that.$delete(that.copyInput[i], "checked");
            }
            that.selectMsg.length = 0;
            that.copyIndex.length = 0;
          }
        })
        .catch(function(error) {
          that.selecting = false;
          console.log(error);
        });
    }
  },
  created() {
    let proVInfo = this.$store.state.portInfo;
    if (proVInfo.length != 0) {
      this.outputdata = [];
      this.inputdata = [];
      this.copyInput = [];
      for (let j = 0; j < proVInfo.length; j++) {
        if (proVInfo[j].Dir == "Out") 
        {
          proVInfo[j].title = "out" + proVInfo[j].index;
          this.outputdata.push({
            index: proVInfo[j].index,
            output: proVInfo[j].title,
            status:proVInfo[j].status
          });
        } 
        else 
        {
          proVInfo[j].title = "in" + proVInfo[j].index;
          this.inputdata.push({
            index: proVInfo[j].index,
            input: proVInfo[j].title
          });
          this.copyInput.push({
            index: proVInfo[j].index,
            PHYName: proVInfo[j].title
          });
        }
      }
      this.getProInfo();
    }
  },
  mounted() {
    let that = this;
    let proVInfo = this.$store.state.portInfo;
    if(proVInfo.length==0)
    {
      that.getProInfo();
    }
    window.EDIDPortStatus = setInterval(function() {
          that.getProInfo();
        }, 4000);
  }
};
</script>

<style scoped>
@import "../style/common";
.wrapper {
  width: 100%;
  height: 100%;
  overflow: auto;
}
.set_content {
  width: 710px;
  height: calc(100% - 10px);
  margin: 0 auto;
  overflow: auto;
  padding: 50px 30px 10px;
  background: #fff;
  border-radius: 5px;
  -webkit-overflow-scrolling: auto;
}
.edidC {
  width: 630px;
  height: 100%;
  margin: 0 auto;
}
.set_content_edid_title {
  font-size: 20px;
  font-weight: 300;
}
.set_content_edid_box {
  width: 210px;
  float: left;
}
.set_content_one_p {
  margin-top: 5px;
  margin-left: 5px;
}
.s_c_o_p_input {
  width: 14px;
  height: 14px;
  border-radius: 0px;
  cursor: pointer;
}
.set_content_one_box {
  width: 210px;
  height: 500px;
  margin-top: 5px;
  /* padding-left: 5px; */
  border: 1px solid #000;
  overflow: auto;
  -webkit-overflow-scrolling: auto;
}
.set_content_one_box2 {
  width: 210px;
  max-height: 405px;
  margin-top: 5px;
  /* padding-left: 5px; */
  overflow: auto;
}
.set_content_one_default {
  width: 200px;
  line-height: 30px;
  text-align: center;
  margin: 5px auto;
  background: #3080b5;
  /* border-radius: 5px; */
  border: 0;
  color: #fff;
  display: table;
  font-size: 14px;
  cursor: pointer;
}
.set_content_one_default:hover {
  background: #4e96c6;
}
.set_content_one_file {
  width: 200px;
  line-height: 20px;
  color: #000;
  text-align: center;
  margin: 0 auto;
  border: 0;
  background: #ededed;
  /* border-radius: 5px; */
  display: table;
  font-size: 14px;
  cursor: pointer;
}
.set_content_two {
  /*margin: 0 10px;*/
}
.set_content_two_information {
  width: 180px;
  height: 90px;
  padding: 10px;
  margin: 5px auto 0;
  border-radius: 5px;
  background: #409eff;
}
.set_content_two_font {
  color: #fff;
  font-size: 12px;
  margin-top: 5px;
}
.set_content_two_font1 {
  margin: 0;
}
.set_content_two_font2 {
  color: #fff;
  font-size: 10px;
  float: right;
}
.set_content_two_inputs {
  font-size: 12px;
  text-align: center;
}
.set_content_two_copy {
  width: 180px;
  line-height: 30px;
  text-align: center;
  margin: 5px auto 0;
  background: #409eff;
  border-radius: 5px;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
  display: table;
}
.s_c_o_b_block {
  width: 180px;
  /* height: 45px; */
  margin: 5px auto;
  /* border-radius: 5px; */
  padding-left: 10px;
  color: #fff;
  line-height: 45px;
  display: table;
  background: #4d4d4d;
  font-size: 14px;
  cursor: pointer;
  border: 0;
}
.s_c_o_b_block:hover {
  background: #727272;
}
.active {
  width: 180px;
  /* height: 45px; */
  margin: 5px auto;
  /* border-radius: 5px; */
  padding-left: 10px;
  color: #fff;
  line-height: 45px;
  display: table;
  background: #409eff;
  font-size: 14px;
  border: 0;
  cursor: pointer;
}
.active:hover {
  background: #66b1ff;
}
.set_content_three_input {
  width: 180px;
  height: 45px;
  /* border-radius: 5px; */
  margin: 5px auto;
  padding-left: 10px;
  color: #fff;
  line-height: 45px;
  background: #4d4d4d;
  cursor: pointer;
  overflow: hidden;
}
.set_content_three_input:hover {
  background: #727272;
}
.s_c_t_input {
  width: 180px;
  height: 45px;
  margin: 5px auto;
  padding-left: 10px;
  color: #fff;
  line-height: 45px;
  background: #409eff;
  cursor: pointer;
}
.s_c_t_input:hover {
  background: #66b1ff;
}
.errorInfo {
  line-height: 70px;
  font-size: 16px;
  text-align: center;
}
button[disabled] {
  /* pointer-events: none; */
  cursor: not-allowed;
  /* filter: alpha(opacity=65); */
  -webkit-box-shadow: none;
  box-shadow: none;
  /* opacity: .65;     */
}
</style>