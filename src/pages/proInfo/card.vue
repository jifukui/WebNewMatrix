<template>
  <div class="wrapper">
    <div id="cardsInfo">
      <div style="width:230px">
        <span class="title titleML">Card List</span>
        <div class="listBoard">
          <p
            v-for="(items, index) in cardList"
            :key="index"
            :class="{ activeCard: items.index == isActive }"
            class="cardList"
            @click="selectCardInfo(items.index, items.status)"
          >
            Slot {{ items.index }}-{{ items.name }}
          </p>
        </div>
      </div>
      <div style="width:360px" v-show="!cardInfoLoadding">
        <div class="information" v-show="isCard">
          <span class="title">Information - Slot {{ isActive }}</span>
          <div class="box">
            <div class="left">
              <p>Type:</p>
              <p>Model:</p>
              <p>Model ID:</p>
              <p>Direction:</p>
              <p>Firmware version:</p>
            </div>
            <div class="right">
              <p>{{ type }}</p>
              <p>{{ model }}</p>
              <p>{{ modelId }}</p>
              <p>{{ direction }}</p>
              <p>{{ firmwareVersion }}</p>
            </div>
            <div class="box" v-show="isEthernet">
              <div class="left">
                <p class="line40">Ethernet 0</p>
                <p class="line40">MAC:</p>
                <p class="line40">IP:</p>
                <p class="line40">MASK:</p>
                <p class="line40">GATE:</p>
                <p class="line40">TCP Port:</p>
                <p class="line40">UDP Port:</p>
              </div>
              <div class="right">
                <p class="line40">{{ mac }}</p>
                <p class="line40">
                  <input
                    :class="
                      ipCheck == true
                        ? 'equipment_information_two_input'
                        : 'equipment_information_two_input1'
                    "
                    @focus="ipCheck1()"
                    @blur="ipBlur()"
                    type="text"
                    id=""
                    ref="ipInp"
                    value=""
                    :disabled="ipDisabled == true ? true : false"
                  />
                </p>

                <p class="line40">
                  <input
                    :class="
                      maskCheck == true
                        ? 'equipment_information_two_input'
                        : 'equipment_information_two_input1'
                    "
                    @focus="maskCheck1()"
                    @blur="maskBlur()"
                    type="text"
                    id=""
                    ref="subnetMask"
                    value=""
                    :disabled="maskDisabled == true ? true : false"
                  />
                </p>

                <p class="line40">
                  <input
                    :class="
                      gatewayCheck == true
                        ? 'equipment_information_two_input'
                        : 'equipment_information_two_input1'
                    "
                    @focus="gatewayCheck1()"
                    @blur="gatewayBlur()"
                    type="text"
                    id=""
                    ref="gateway"
                    value=""
                    :disabled="gatewayDisabled == true ? true : false"
                  />
                </p>

                <p class="line40">
                  <input
                    :class="
                      tcpCheck == true
                        ? 'equipment_information_two_input'
                        : 'equipment_information_two_input1'
                    "
                    @focus="tcpCheck1()"
                    @blur="tcpBlur()"
                    type="text"
                    id=""
                    ref="tcp"
                    value=""
                    onKeyUp="value=value.replace(/\D/g,'')"
                    onafterpaste="value=value.replace(/\D/g,'')"
                    :disabled="tcpDisabled == true ? true : false"
                  />
                </p>

                <p class="line40">
                  <input
                    :class="
                      udpCheck == true
                        ? 'equipment_information_two_input'
                        : 'equipment_information_two_input1'
                    "
                    @focus="udpCheck1()"
                    @blur="udpBlur()"
                    type="text"
                    id=""
                    ref="udp"
                    value=""
                    onKeyUp="value=value.replace(/\D/g,'')"
                    onafterpaste="value=value.replace(/\D/g,'')"
                    :disabled="udpDisabled == true ? true : false"
                  />
                </p>
              </div>
            </div>
            <div class="box ">
              <div class="left">
                <p class="line41" v-show="isEthernet">Save Changes:</p>
                <p class="line41">Factory:</p>
                <p class="line41">Refresh:</p>
              </div>
              <div class="right">
                <p class="line41" v-show="isEthernet">
                  <el-button
                    class="btn"
                    type="primary"
                    @click="saveInfo(isActive)"
                    >Save Changes</el-button
                  >
                </p>
                <p class="line41">
                  <el-button class="btn" type="primary" @click="reset"
                    >Factory</el-button
                  >
                </p>
                <p class="line41">
                  <el-button class="btn" type="primary" @click="CardRefresh"
                    >Refresh</el-button
                  >
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="information" v-show="!isCard">
          <span class="title">Information - Slot {{ isActive }}</span>
          <div class="nocard">No Card</div>
          <div class="box ">
            <div class="left">
              <p class="line41">Refresh:</p>
            </div>
            <div class="right">
              <p class="line41">
                <el-button class="btn" type="primary" @click="CardRefresh"
                >Refresh</el-button>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        style="width:435px"
        v-loading="loading"
        v-show="cardInfoLoadding"
      ></div>
    </div>
    <div class="upgradeDiv" >
      <div class="information" v-show="cardList.length>0">
        <span class="title Firmware2">Firmware Upgrade</span>
        <div class="boxUpgrad">
          <div class="firmware">
            <p>Choose a file</p>
              <!-- 上传文件按钮 -->
            <p class="line40 martop10">
              <input
                v-model="uploadedFiles"
                type="file"
                name="inputFile"
                id="fileCard"
                hidden
                @change="selectFile($event)"
              />
              <el-button 
                class="btn" 
                type="primary" 
                :disabled="uploadedFiles!=''"
                @click="uplaodFile()">
                Browse
              </el-button>
            </p>
            <!-- 文件名称 -->
            <!-- <p>
              <span style="white-space:normal;word-wrap: break-word;">
                <p style="margin:0">{{ fileName }}</p>
              </span>
            </p> -->
            <!-- 上传进度条 -->
            <p>
              <el-progress
                :percentage="fileGrogress"
                v-show="uploading"
                :status="uploadStatus"
              ></el-progress>
            </p>
            <!-- 开始上传 -->
            <!-- <p class="line40">
              <el-button
                class="btn"
                type="primary"
                @click="getfileInfo($event)"
                :disabled="isFile == true ? false : true"
                >Upload</el-button
              >
            </p> -->
            <!-- 开始升级 -->
            <!-- <p class="line40">
              <el-button
                class="btn"
                type="primary"
                @click="isDecompression()"
                :disabled="isUpgrade == true ? false : true"
                >Start Upgrade</el-button
              >
            </p> -->
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      title="Please select the card you want to upgrade"
      :visible.sync="dialogFormVisible"
      :append-to-body="true"
      :close-on-click-modal="false"
      :show-close="false"
      width="500px"
    >
      <div
        v-for="(items, index) in upgardeCardArr"
        :key="index"
        class="upgradeStyle"
      >
        Slot {{ items.index }}-{{ items.name }}
        <input
          type="checkbox"
          checked="checked"
          :value="items.index"
          v-model="selectCardUpgradeArr"
        />
      </div>
      <div slot="footer" class="dialog-footer">
        <!-- <el-button @click="dialogFormVisible = false">Cancel</el-button> -->
        <el-button @click="cancelUpload">Cancel</el-button>
        <el-button type="primary" @click="selectCardUpgrade">Ok</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      type: "",
      model: "",
      modelId: "",
      direction: "",
      firmwareVersion: "",
      cardList: [],
      mac: "",
      ipCheck: true,
      maskCheck: true,
      gatewayCheck: true,
      tcpCheck: true,
      udpCheck: true,
      ipDisabled: false,
      maskDisabled: false,
      gatewayDisabled: false,
      tcpDisabled: false,
      udpDisabled: false,
      oldIpVal: "",
      oldMaskVal: "",
      oldGatewayVal: "",
      oldTcpVal: "",
      oldUdpVal: "",
      isSaveInfo: true,
      file: "",
      fileName: "",
      decompressionFileName: "",
      isFile: false,
      fileGrogress: 0,
      uploading: false,
      uploadStatus: "",

      isIp: false,
      // Subnet mask
      isMask: false,
      // Gateway
      isGateway: false,
      // TCP
      istcp: false,
      // UDP
      isudp: false,
      resetN: 0,
      isActive: -1,
      slotIndex: "",
      isCard: true,
      isEthernet: false,
      loading: true,
      cardInfoLoadding: true,
      isUpgrade: false,
      dialogFormVisible: false,
      upgradeNum: 0,
      upgardeCardArr: [],
      selectCardUpgradeArr: [],
      uploadedFiles: ""
    };
  },
  watch: {},
  computed: {},
  methods: {
    // ip address 获取焦点和失去焦点
    ipCheck1() {
      this.ipCheck = true;
      this.isIp = true;
    },
    ipBlur() {},
    // Subnet mask 获取焦点和失去焦点
    maskCheck1() {
      this.maskCheck = true;
      this.isMask = true;
    },
    maskBlur() {},
    // Gateway 获取焦点和失去焦点
    gatewayCheck1() {
      this.gatewayCheck = true;
      this.isGateway = true;
    },
    gatewayBlur() {},
    // TCP 获取焦点和失去焦点
    tcpCheck1() {
      this.tcpCheck = true;
      this.istcp = true;
    },
    tcpBlur() {},
    //UDP 获取焦点和 失去焦点
    udpCheck1() {
      this.udpCheck = true;
      this.isudp = true;
    },
    udpBlur() {},
    // handlerChange(e){
    //     this.isSaveInfo=false
    // },
    // 选择文件
    uplaodFile() {
      document.getElementById("fileCard").click();
    },
    // 上传文件点击确认后
    selectFile(event) 
    {
      this.file = event.target.files[0];
      let filemaxsize = 1024 * 2;
      let size = this.file.size / 1024;
      let index = this.file.name.lastIndexOf(".");
      let ext = this.file.name.substr(index + 1);
      let extUpperCase = ext.toUpperCase();
      this.$store.state.JiFileSize=this.file.size;
      console.log("this file "+this.file.size);
      console.log("File type is "+extUpperCase);
      // if (size > filemaxsize) {
      //   this.$alert(
      //     "The appendix size should not exceed " + filemaxsize / 1024 + "M！",
      //     "Prompt information",
      //     {
      //       confirmButtonText: "OK",
      //       callback: action => {}
      //     }
      //   );
      //   return false;
      // }
      if (size <= 0) 
      {
        this.$alert("The appendix size can not be 0M！", "Prompt information", {
          confirmButtonText: "OK",
          callback: action => {}
        });
        return false;
      }
      if (extUpperCase != "KMPT" && extUpperCase != "KPTW") 
      {
        this.$alert("Upgrade file type error", "Prompt information", {
          confirmButtonText: "OK",
          callback: action => {}
        });
        return false;
      }
      this.fileName = this.file.name;
      this.isFile = true;
      this.uploading = false;
      this.uploading = false;
      this.uploadStatus = "";
      this.fileGrogress = 0;
      this.getfileInfo(event);
    },
    // 上传升级文件
    getfileInfo(event) 
    {
      event.preventDefault();
      let that = this;
      that.uploading = true;
      let formData = new window.FormData();
      formData.append("file", this.file);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        onUploadProgress: progressEvent => {
          var complete =
            ((progressEvent.loaded / progressEvent.total) * 100) | 0;
          this.fileGrogress = complete;
        }
      };
      this.$axios
        .post("/cgi-bin/upload.cgi", formData, config)
        .then(function(msg) {
          if (msg.data.status == "SUCCESS") 
          {
            that.uploadStatus = "success";
            that.fileGrogress = 100;
            that.isUpgrade = true;
            that.isDecompression();
            console.log("good for this ");
          } 
          else 
          {
            console.log("The value is " + msg.data.status);
          }
        })
        .catch(function(error) {
          that.$alert(error.data.error, "Prompt information", {
            confirmButtonText: "OK",
            callback: action => {}
          });
        });
    },
    //开始升级
    isDecompression() 
    {
      this.decompressionFileName = "";
      let index = this.fileName.lastIndexOf(".");
      let extLast = this.fileName.substr(index + 1);
      let extUpperCase = extLast.toUpperCase();
      if (extUpperCase == "KMPT") 
      {
        this.Upgrade(this.fileName);
      } 
      else if (extUpperCase == "KPTW") 
      {
        let that = this;
        let aoData = {
          cmd: "UntarFile",
          FileName: that.fileName
        };
        this.$axios
          .post("/cgi-bin/ligline.cgi", aoData)
          .then(function(response) {
            if (response.data.status == "SUCCESS") 
            {
              that.decompressionFileName = response.data.echo.result.FileName;
              that.$store.state.JiFileSize=response.data.echo.result.FileSize;
              console.log("The File size is "+that.$store.state.JiFileSize);
              that.Upgrade(that.decompressionFileName);
            } 
            else if (response.data.status == "ERROR") 
            {
              that.$alert(response.data.error, "Prompt information", 
              {
                confirmButtonText: "OK",
                callback: action => {}
              });
            }
          })
          .catch(function(error) {
            that.$alert(error, "Prompt information", {
              confirmButtonText: "OK",
              callback: action => {}
            });
          });
      }

      console.log(this.fileName);
    },
    Upgrade(file) 
    {
      this.selectCardUpgradeArr.length = 0;
      let index = file.lastIndexOf(".");
      let ext = file.charAt(index - 1);
      let filename = file.substring(0, index);
      let fileNameStr = "";
      fileNameStr = filename.substring(
        filename.lastIndexOf("[") + 1,
        filename.lastIndexOf("]")
      );
      let fileNameArr = fileNameStr.split("_");
      if (
        fileNameArr[0].indexOf("OUT") == -1 &&
        fileNameArr[0].indexOf("IN") == -1
      ) {
        this.$alert(
          "This file does not support card upgrade",
          "Prompt information",
          {
            confirmButtonText: "OK",
            callback: action => {},
          },
          this.uploadedFiles = ""
        );
        return false;
      }
      let fileNameSlotArr = [];
      if (fileNameArr[1].indexOf("&") != -1) 
      {
        fileNameSlotArr = fileNameArr[1].split("&");
      } 
      else 
      {
        fileNameSlotArr.push(fileNameArr[1]);
      }
      if (ext == "N") 
      {
        let upgradeArr = [];
        if (fileNameArr[0].indexOf("OUT") != -1) 
        {
          if (fileNameSlotArr.length == 1) 
          {
            for (let i = 0; i < this.cardList.length; i++) 
            {
              if (
                this.cardList[i].Direction == "Out" &&
                this.cardList[i].Model_ID == fileNameSlotArr[0]
              ) 
              {
                upgradeArr.push(this.cardList[i]);
                this.selectCardUpgradeArr.push(this.cardList[i].index);
              }
            }
          } 
          else 
          {
            for (let i = 0; i < this.cardList.length; i++) 
            {
              if (this.cardList[i].Direction == "Out") 
              {
                for (let j = 0; j < fileNameSlotArr.length; j++) 
                {
                  if (this.cardList[i].Model_ID == fileNameSlotArr[j]) 
                  {
                    upgradeArr.push(this.cardList[i]);
                    this.selectCardUpgradeArr.push(this.cardList[i].index);
                  }
                }
              }
            }
          }
        } 
        else if (fileNameArr[0].indexOf("IN") != -1) 
        {
          if (fileNameSlotArr.length == 1) 
          {
            for (let i = 0; i < this.cardList.length; i++) 
            {
              if (
                this.cardList[i].Direction == "In" &&
                this.cardList[i].Model_ID == fileNameSlotArr[0]
              ) 
              {
                upgradeArr.push(this.cardList[i]);
                this.selectCardUpgradeArr.push(this.cardList[i].index);
              }
            }
          } 
          else 
          {
            for (let i = 0; i < this.cardList.length; i++) 
            {
              if (this.cardList[i].Direction == "In") 
              {
                for (let j = 0; j < fileNameSlotArr.length; j++) 
                {
                  if (this.cardList[i].Model_ID == fileNameSlotArr[j]) 
                  {
                    upgradeArr.push(this.cardList[i]);
                    this.selectCardUpgradeArr.push(this.cardList[i].index);
                  }
                }
              }
            }
          }
        }
        if (upgradeArr.length == 0) 
        {
          this.$alert(
            "Documents do not match the module card and cannot be upgraded",
            "Prompt information",
            {
              confirmButtonText: "OK",
              callback: action => {}
            }
          );
          return false;
        }
        this.dialogFormVisible = true;
        this.upgardeCardArr = upgradeArr;
      } 
      else 
      {
        if (fileNameArr[0].indexOf("OUT") != -1) 
        {
          if (fileNameSlotArr.length == 1) 
          {
            for (let i = 0; i < this.cardList.length; i++) 
            {
              if (this.cardList[i].index == ext) 
              {
                if (
                  this.cardList[i].status == "offline" ||
                  this.cardList[i].Direction == "In" ||
                  this.cardList[i].Model_ID != fileNameSlotArr[0]
                ) 
                {
                  this.$alert(
                    "Documents do not match the module card and cannot be upgraded",
                    "Prompt information",
                    {
                      confirmButtonText: "OK",
                      callback: action => {}
                    }
                  );
                  return false;
                }
              }
            }
          } 
          else 
          {
            for (let i = 0; i < this.cardList.length; i++) 
            {
              if (this.cardList[i].index == ext) 
              {
                if (this.cardList[i].status == "offline") 
                {
                  this.$alert(
                    "Documents do not match the module card and cannot be upgraded",
                    "Prompt information",
                    {
                      confirmButtonText: "OK",
                      callback: action => {}
                    }
                  );
                  return false;
                } 
                else 
                {
                  let model_ID = this.cardList[i].Model_ID;
                  let modelId = model_ID.toString();
                  if (
                    this.cardList[i].Direction == "In" ||
                    fileNameSlotArr.indexOf(modelId) == -1
                  ) 
                  {
                    this.$alert(
                      "Documents do not match the module card and cannot be upgraded",
                      "Prompt information",
                      {
                        confirmButtonText: "OK",
                        callback: action => {}
                      }
                    );
                    return false;
                  }
                }
              }
            }
          }
        } 
        else if (fileNameArr[0].indexOf("IN") != -1) 
        {
          if (fileNameSlotArr.length == 1) 
          {
            for (let i = 0; i < this.cardList.length; i++) 
            {
              if (this.cardList[i].index == ext) 
              {
                if (
                  this.cardList[i].status == "offline" ||
                  this.cardList[i].Direction == "Out" ||
                  this.cardList[i].Model_ID != fileNameSlotArr[0]
                ) 
                {
                  this.$alert(
                    "Documents do not match the module card and cannot be upgraded",
                    "Prompt information",
                    {
                      confirmButtonText: "OK",
                      callback: action => {}
                    }
                  );
                  return false;
                }
              }
            }
          } 
          else 
          {
            for (let i = 0; i < this.cardList.length; i++) 
            {
              if (this.cardList[i].index == ext) 
              {
                if (this.cardList[i].status == "offline") 
                {
                  this.$alert(
                    "Documents do not match the module card and cannot be upgraded",
                    "Prompt information",
                    {
                      confirmButtonText: "OK",
                      callback: action => {}
                    }
                  );
                  return false;
                } 
                else 
                {
                  let model_ID = this.cardList[i].Model_ID;
                  let modelId = model_ID.toString();
                  if (
                    this.cardList[i].Direction == "Out" ||
                    fileNameSlotArr.indexOf(modelId) == -1
                  ) 
                  {
                    this.$alert(
                      "Documents do not match the module card and cannot be upgraded",
                      "Prompt information",
                      {
                        confirmButtonText: "OK",
                        callback: action => {}
                      }
                    );
                    return false;
                  }
                }
              }
            }
          }
        }
        this.upgardeCardOne(file);
      }
    },
    // 确认开始升级
    selectCardUpgrade() 
    {
      console.log("this.selectCardUpgradeArr "+this.selectCardUpgradeArr);

      if (this.selectCardUpgradeArr.length == 0) 
      {
        this.$alert(
          "Please check the cards you want to upgrade",
          "Prompt information",
          {
            confirmButtonText: "OK",
            callback: action => {
              return false;
            }
          }
        );
      } 
      else 
      {
        let fileArr = [];
        fileArr.length = 0;
        let fileName1 = "";
        let index = "";
        if (this.decompressionFileName != "") 
        {
          fileArr.push(this.decompressionFileName);
          index = this.decompressionFileName.lastIndexOf(".");
          fileName1 = this.decompressionFileName;
        } 
        else 
        {
          fileArr.push(this.fileName);
          index = this.fileName.lastIndexOf(".");
          fileName1 = this.fileName;
        }

        for (let i = 0; i < this.selectCardUpgradeArr.length; i++) 
        {
          let fileName = this.replacePos(
            fileName1,
            index - 1,
            this.selectCardUpgradeArr[i]
          );
          console.log(fileName);
          fileArr.push(fileName);
        }
        console.log(fileArr);
        this.$store.state.upgradeNumber = -1;
        this.$store.state.upgradeLoading = true;
        this.$store.state.upgradeNumbers = fileArr.length - 1;
        /**升级 */
        this.upgardeFile(fileArr);
      }
    },
    // 点击上传取消
    cancelUpload()
    {
      this.dialogFormVisible = false;
      this.uploading = false;
      this.uploadedFiles = ""
    },
    replacePos(strObj, pos, replacetext) 
    {
      var str =
        strObj.substr(0, pos) +
        replacetext +
        strObj.substring(pos + 1, strObj.length);
      return str;
    },
    upgardeFile(arr) 
    {
      let isEnd = 0;
      if (this.upgradeNum < arr.length - 1) 
      {
        if (this.upgradeNum == arr.length - 2) 
        {
          isEnd = 1;
        } 
        else 
        {
          isEnd = 0;
        }
        this.upgardeCard(
          arr[this.upgradeNum],
          arr[this.upgradeNum + 1],
          isEnd,
          arr
        );
      } 
      else 
      {
        this.upgradeNum = 0;
        this.$store.state.upgradeNumber = -2;
        console.log("cccc:" + this.$store.state.upgradeNumber);
      }
    },
    upgardeCard(oldfile, newfile, isEnd, arr) 
    {
      let that = this;
      let aoData = {
        cmd: "SetMoreUpgrade",
        UpgradeInfo: {
          oldfile: oldfile, //旧文件名称
          newfile: newfile, //新文件名称
          End: isEnd
        }
      };
      this.$axios
        .post("/cgi-bin/ligline.cgi", aoData)
        .then(function(response) {
          if (response.data.status == "SUCCESS") 
          {
            console.log("card "+that.selectCardUpgradeArr[that.upgradeNum]);
            that.$message({
                            type: 'success',
                            message: "The Card "+that.selectCardUpgradeArr[that.upgradeNum]+" Upgrade Successful"//密码错误
                        });
            that.upgradeNum = that.upgradeNum + 1;
            console.log("成功:" + that.upgradeNum);
            that.$store.state.upgradeNumber = that.upgradeNum;
            console.log("BBBB:" + that.$store.state.upgradeNumber);
            that.upgardeFile(arr);

            // if (isEnd == 1) {
            //   that.$store.state.upgradeLoading = false;
            // }
          } 
          else if (response.data.status == "ERROR") 
          {
            that.$alert(response.data.error, "Prompt information", 
            {
              confirmButtonText: "OK",
              callback: action => {
                that.$store.state.upgradeLoading = false;
              }
            });
          }
        })
        .catch(function(error) {
          that.$alert(error, "Prompt information", {
            confirmButtonText: "OK",
            callback: action => {
              that.$store.state.upgradeLoading = false;
            }
          });
        });
    },
    upgardeCardOne(file) {
      this.$store.state.upgradeLoading = true;
      this.$store.state.upgradeNumbers = 1;
      this.$store.state.upgradeNumber = -1;
      let that = this;
      let aoData = {
        cmd: "SetUpgrade",
        file: file
      };
      this.$axios
        .post("/cgi-bin/ligline.cgi", aoData)
        .then(function(response) 
        {
          if (response.data.status == "SUCCESS") 
          {
            that.$store.state.upgradeNumbers = 1;
            that.$store.state.upgradeNumber = -2;
            console.log("成功升级");
          } 
          else if (response.data.status == "ERROR") 
          {
            that.$alert(response.data.error, "Prompt information", 
            {
              confirmButtonText: "OK",
              callback: action => {
                that.$store.state.upgradeLoading = false;
              }
            });
          }
        })
        .catch(function(error) {
          that.$alert(error, "Prompt information", {
            confirmButtonText: "OK",
            callback: action => {
              that.$store.state.upgradeLoading = false;
            }
          });
        });
    },

    saveInfo(index) {
      let that = this;
      let ipaddr = this.$refs.ipInp.value;
      let maskaddr = this.$refs.subnetMask.value;
      let gateway = this.$refs.gateway.value;
      let tcp = this.$refs.tcp.value;
      let udp = this.$refs.udp.value;
      if (
        this.$checkInp.fnValidateIPAddress(ipaddr) == true &&
        this.$checkInp.fnValidateMask(maskaddr) == true &&
        this.$checkInp.fnValidateGateway(gateway) == true &&
        this.$checkInp.fnValidateIcp(tcp) == true &&
        this.$checkInp.fnValidateUdp(udp) == true
      ) {
        this.$confirm("Are you sure?", "Prompt information", {
          confirmButtonText: "Ok",
          cancelButtonText: "Cancel",
          type: "warning",
          closeOnClickModal: false
        })
          .then(() => {
            let that = this;
            let setInfo = {
              index: index
            };
            if (ipaddr != that.oldIpVal) {
              setInfo.IP = ipaddr;
            }
            if (maskaddr != that.oldMaskVal) {
              setInfo.MASK = maskaddr;
            }
            if (gateway != that.oldGatewayVal) {
              setInfo.Gate = gateway;
            }
            if (tcp != that.oldTcpVal) {
              setInfo.TCP = Number(tcp);
            }
            if (udp != that.oldUdpVal) {
              setInfo.UDP = Number(udp);
            }

            let aoData = {
              cmd: "Card_info_set",
              Ethernet: setInfo
            };
            this.$axios
              .post("/cgi-bin/ligline.cgi", aoData)
              .then(function(response) {
                if (response.data.status == "SUCCESS") {
                  that.$alert("Save success", "Prompt information", {
                    confirmButtonText: "OK",
                    callback: action => {
                      that.selectCardInfo(that.isActive, "online");
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
              resetSure: "取消保存信息"
            };
            console.log(sendata);
          });
      } else {
        this.$alert("Parameter is incorrect!", "Prompt information", {
          confirmButtonText: "OK",
          callback: action => {}
        });
        if (this.$checkInp.fnValidateIPAddress(ipaddr) == false) {
          this.ipCheck = false;
        }
        if (this.$checkInp.fnValidateMask(maskaddr) == false) {
          this.maskCheck = false;
        }
        if (this.$checkInp.fnValidateGateway(gateway) == false) {
          this.gatewayCheck = false;
        }
        if (this.$checkInp.fnValidateIcp(tcp) == false) {
          this.tcpCheck = false;
        }
        if (this.$checkInp.fnValidateUdp(udp) == false) {
          this.udpCheck = false;
        }
      }
    },
    reset() {
      let that = this;
      let value = "";
      if (that.direction == "In") {
        value = 0;
      } else if (that.direction == "Out") {
        value = 1;
      }
      this.$confirm(
        "RESET Card to factory default ? <br/>Press OK to confirm",
        "Prompt information",
        {
          confirmButtonText: "Ok",
          cancelButtonText: "Cancel",
          type: "warning",
          closeOnClickModal: false,
          dangerouslyUseHTMLString: true
        }
      )
        .then(() => {
          let aoData = {
            cmd: "SetCardFactory",
            CardInfo: {
              index: that.isActive,
              type: value
            }
          };
          this.$axios
            .post("/cgi-bin/ligline.cgi", aoData)
            .then(function(response) {
              if (response.data.status == "SUCCESS") {
                that.$alert("Factory success", "Prompt information", {
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
    selectCardInfo(index, status) 
    {
      console.log("Card info");
      let that = this;
      that.isActive = index;
      if (status == "online") 
      {
        that.isCard = true;  
        that.$store.state.PageLoading=true;
        that.loading = true;
        that.cardInfoLoadding = true;
        let aoData = 
        {
          cmd: "Card_info",
          index: index
        };
        this.$axios
          .post("/cgi-bin/ligline.cgi", aoData)
          .then(function(response) 
          {
            if (response.data.status == "SUCCESS") 
            {
              let responseData = response.data.echo.result;
              if (responseData.Type == "Unknown") 
              {
                that.type = "";
              } 
              else 
              {
                that.type = responseData.Type;
              }
              that.model = responseData.Model;
              that.modelId = responseData.Model_ID;
              if (responseData.Direction == "Unknown") 
              {
                that.direction = "";
              } 
              else 
              {
                that.direction = responseData.Direction;
              }
              that.firmwareVersion = responseData.Version;
              if (responseData.Ethernet == null) 
              {
                that.isEthernet = false;
              } 
              else 
              {
                that.isEthernet = true;
                if (responseData.Ethernet[0].MAC == "Unknown") 
                {
                  that.mac = "";
                } 
                else 
                {
                  that.mac = responseData.Ethernet[0].MAC;
                }
                if (responseData.Ethernet[0].IP == "Unknown") 
                {
                  that.$refs.ipInp.value = "";
                  that.ipDisabled = true;
                } 
                else 
                {
                  that.$refs.ipInp.value = responseData.Ethernet[0].IP;
                  that.oldIpVal = JSON.parse(
                    JSON.stringify(responseData.Ethernet[0].IP)
                  );
                }
                if (responseData.Ethernet[0].MASK == "Unknown") 
                {
                  that.$refs.subnetMask.value = "";
                  that.maskDisabled = true;
                } 
                else 
                {
                  that.$refs.subnetMask.value = responseData.Ethernet[0].MASK;
                  that.oldMaskVal = JSON.parse(
                    JSON.stringify(responseData.Ethernet[0].MASK)
                  );
                }
                if (responseData.Ethernet[0].GateWay == "Unknown") {
                  that.$refs.gateway.value = "";
                  that.gatewayDisabled = true;
                } 
                else 
                {
                  that.$refs.gateway.value = responseData.Ethernet[0].GateWay;
                  that.oldGatewayVal = JSON.parse(
                    JSON.stringify(responseData.Ethernet[0].GateWay)
                  );
                }
                if (responseData.Ethernet[0].TCP == "Unknown") 
                {
                  that.$refs.tcp.value = "";
                  that.tcpDisabled = true;
                } 
                else 
                {
                  that.$refs.tcp.value = responseData.Ethernet[0].TCP;
                  that.oldTcpVal = JSON.parse(
                    JSON.stringify(responseData.Ethernet[0].TCP)
                  );
                }
                if (responseData.Ethernet[0].UDP == "Unknown") 
                {
                  that.$refs.udp.value = "";
                  that.udpDisabled = true;
                } 
                else 
                {
                  that.$refs.udp.value = responseData.Ethernet[0].UDP;
                  that.oldUdpVal = JSON.parse(
                    JSON.stringify(responseData.Ethernet[0].UDP)
                  );
                }
              }
              that.$store.state.PageLoading=false;
              that.loading = false;
              that.cardInfoLoadding = false;
              
            } 
            else if (response.data.status == "ERROR") 
            {
              that.$alert(response.data.error, "Prompt information", {
                confirmButtonText: "OK",
                callback: action => {
                  that.$store.state.PageLoading=false;
                  that.loading = false;
                  that.cardInfoLoadding = false;
                }
              });
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      } 
      else if (status == "offline") 
      {
        that.isActive="";
        that.isCard = false;
        that.cardInfoLoadding = false;
        that.$store.state.PageLoading=false;
      }
      
    },
    //获取cardList
    getCardList() {
      let that = this;
      let aoData = {
        cmd: "Card_list"
      };
      this.$axios
        .post("/cgi-bin/ligline.cgi", aoData)
        .then(function(response) {
          if (response.data.status == "SUCCESS") 
          {
            that.cardList = response.data.echo.result.solt;
            for(let i=0;i<that.cardList.length;)
            {
              if(that.cardList[i].name=="UnKnown")
              {
                that.cardList.splice(i,1);
              }
              else
              {
                i++;
              }
            }
            if(that.cardList.length>0)
            {
              if(that.isActive==-1||that.isActive=="")
              {
                that.selectCardInfo(that.cardList[0].index, that.cardList[0].status);
              }
              else 
              {
                let i;
                for(i=0;i<that.cardList.length;i++)
                {
                  if(that.cardList[i].index==that.isActive)
                  {
                    break;
                  }
                }
                if(i<that.cardList.length)
                {
                  that.selectCardInfo(that.cardList[i].index, that.cardList[i].status);
                }
                else
                {
                  that.selectCardInfo(that.isActive, "offline");
                }
              }
            }
            else
            {
              that.selectCardInfo(0, "offline");   
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
    CardRefresh(){
      this.getCardList();
    }
  },
  created() {
    this.$store.state.PageLoading=true;
    this.getCardList();
  },
  mounted() {
    this.$store.state.ConfigureLabelName="second";
  }
};
</script>
<style>
.btn-custom-cancel {
  float: right;
  margin-left: 10px;
}
</style>
<style scoped>
@import "../../style/common";
.Firmware2{
  font-size: 14px;
}
.wrapper {
  width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  height: calc(100% - 10px);
}
#cardsInfo {
  width: 560px;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  height: calc(100% - 10px);
  background-color: white;
  padding: 10px 5px 0;
  border-radius: 5px;
}
.listBoard {
  width: auto;
  height: calc(100% - 34px);
  overflow: auto;
  padding: 5px;
  border: 1px solid black;
  /* -webkit-overflow-scrolling: auto; */
}
.information {
  width: auto;
  padding: 0 10px;
  height: calc(100% - 10px);
  overflow: auto;
  font-size: 0;
  text-align: center;
  /* -webkit-overflow-scrolling: auto; */
}
p {
  font-size: 14px;
  line-height: 30px;
  text-align:left;
}
.box {
  width: 340px;
  margin: 0 auto;
  border-bottom: none;
  font-size: 0;
}
.boxUpgrad {
  width: 200px;
  margin: 0 auto;
  border-bottom: none;
  font-size: 0;
}
.left,
.right {
  display: inline-block;
  width: 150px;
}
.firmware {
  width: 150px;
  height: 150px;
  margin: 0 auto;
  text-align: center;
}
.btn {
  width: 150px;
  height: 30px;
  padding: 0px 20px;
}
.line40 {
  line-height: 35px;
}
.line41 {
  line-height: 45px;
  height: 35px;
}
.cardList {
  cursor: pointer;
}
.activeCard {
  background-color: #409eff;
  color: #ffffff;
}

@media (min-width: 1025px) {
  .cardList:hover {
    background-color: #409eff;
    color: #ffffff;
  }
}
.titleML {
  margin-left: 4px;
}
.nocard {
  text-align: center;
  width: 340px;
}
.upgradeStyle {
  text-align: center;
  font-size: 14px;
}
.upgradeDiv {
  width: 220px;
  margin-left: 10px;
  background-color: white;
  border-radius: 5px;
  padding: 10px 0 0;
  height: calc(100% - 10px);
}
</style>