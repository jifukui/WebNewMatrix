<template>
  <div class="wrapper">
    <div id="deviceInfo">
      <div class="deviceInformation">
        <!-- 主板卡信息 -->
        <div class="box">
          <p class="title_device">Information</p>
          <div class="left">
            <p>Model:</p>
            <p>Name:</p>
            <p>SN:</p>
            <p>Firmware Version:</p>
          </div>
          <div class="content">
            <p>{{model}}</p>
            <p>{{name}}</p>
            <p>{{sn}}</p>
            <p>{{firmwareVersion}}<span style="margin-left:10px">
                <!-- <el-button class="btnMore" type="primary" @click="dialogVisible = true">More</el-button> -->
              </span></p>
          </div>
          <!-- 升级部分 -->
          <div class="firmware">
            <p>Firmware Upgrade</p>
            <p>Choose a file</p>
            <p class="line40 martop10">
              <input
                type="file"
                name="inputFile"
                id="file"
                hidden
                @change="selectFile($event)"
              >
              <!-- 选择文件按钮 -->
              <el-button
                class="btn"
                type="primary"
                @click="uplaodFile()"
              >Browse</el-button>
            </p>
            <!-- 选中文件的文件名称 -->
            <!-- <p>
              <span style="white-space:normal;word-wrap: break-word;">
                <p style="margin:0">{{fileName}}</p>
              </span>
            </p> -->
            <!-- 进度条 -->
            <p>
              <el-progress
                :percentage="fileGrogress"
                v-show="uploading"
                :status="uploadStatus"
              ></el-progress>
            </p>
            <!-- 开始上传按钮 -->
            <!-- <p class="line40">
              <el-button
                class="btn"
                type="primary"
                @click="getfileInfo($event)"
                :disabled="isFile==true?false:true"
              >Upload</el-button>
            </p> -->
            <!-- 更新程序按钮 -->
            <!-- <p class="line40">
              <el-button
                class="btn"
                type="primary"
                @click="Upgrade()"
                :disabled="isUpgrade==true?false:true"
              >Start Upgrade</el-button>
            </p> -->
          </div>
        </div>
        <!-- Ethernet 0 -->
        <div class="box">
          <div class="left">
            <p>Ethernet 0</p>
            <p>MAC:</p>
            <p>IP:</p>
            <p>MASK:</p>
            <p>GATE:</p>
            <p>TCP Port:</p>
            <p>UDP Port:</p>
          </div>
          <div class="content">
            <!-- MAC -->
            <p>{{mac0}}</p>
            <!-- IP -->
            <p><input
                :class="ipCheck==true?'equipment_information_two_input':'equipment_information_two_input1'"
                @focus="ipCheck1()"
                @blur="ipBlur()"
                type="text"
                id=""
                ref="ipInp"
                value=""
              ></p>
            <!-- MASK -->
            <p><input
                :class="maskCheck==true?'equipment_information_two_input':'equipment_information_two_input1'"
                @focus="maskCheck1()"
                @blur="maskBlur()"
                type="text"
                id=""
                ref="subnetMask"
                value=''
              ></p>
            <!-- GATE -->
            <p><input
                :class="gatewayCheck==true?'equipment_information_two_input':'equipment_information_two_input1'"
                @focus="gatewayCheck1()"
                @blur="gatewayBlur()"
                type="text"
                id=""
                ref="gateway"
                value=''
              ></p>
            <!-- TCP -->
            <p><input
                :class="tcpCheck==true?'equipment_information_two_input':'equipment_information_two_input1'"
                @focus="tcpCheck1()"
                @blur="tcpBlur()"
                type="text"
                id=""
                ref="tcp"
                value=""
                onKeyUp="value=value.replace(/\D/g,'')"
                onafterpaste="value=value.replace(/\D/g,'')"
              ></p>
            <!-- UDP -->
            <p><input
                :class="udpCheck==true?'equipment_information_two_input':'equipment_information_two_input1'"
                @focus="udpCheck1()"
                @blur="udpBlur()"
                type="text"
                id=""
                ref="udp"
                value=''
                onKeyUp="value=value.replace(/\D/g,'')"
                onafterpaste="value=value.replace(/\D/g,'')"
              ></p>
          </div>
        </div>
        <!-- Ethernet 1 -->
        <div class="box">
          <div class="left">
            <p>Ethernet 1</p>
            <p>MAC:</p>
            <p>IP:</p>
            <p>MASK:</p>
            <p>GATE:</p>
          </div>
          <div class="content">
            <p>{{mac1}}</p>
            <!-- IP -->
            <p><input
                :class="ipCheck2==true?'equipment_information_two_input':'equipment_information_two_input1'"
                @focus="ipCheck3()"
                @blur="ipBlur3()"
                type="text"
                id=""
                ref="ipInp3"
                value=''
              ></p>
            <!-- MASK -->
            <p> <input
                :class="maskCheck2==true?'equipment_information_two_input':'equipment_information_two_input1'"
                @focus="maskCheck3()"
                @blur="maskBlur3()"
                type="text"
                id=""
                ref="subnetMask3"
                value=''
              ></p>
            <!-- GATE -->
            <p> <input
                :class="gatewayCheck2==true?'equipment_information_two_input':'equipment_information_two_input1'"
                @focus="gatewayCheck3()"
                @blur="gatewayBlur3()"
                type="text"
                id=""
                ref="gateway3"
                value=''
              ></p>
          </div>
        </div>
        <!-- 提交按钮 -->
        <div class="box">
          <div class="left">
            <p class="line40">Save Changes:</p>
            <p class="line40">Configuration File:</p>
            <p class="line40">Reset:</p>
            <!-- <p class="line40">ISP Mode:</p> -->
          </div>
          <div class="right">
            <p class="line40">
              <el-button
                class="btn"
                type="primary"
                @click="saveInfo"
              >Save Changes</el-button>
            </p>
            <p class="line40">
              <!-- 
                Get按钮
                原先@click="getFile"
                后改@click="downLoad"
               -->
              <el-button
                class="btn"
                type="primary"
                @click="downLoad"
              >Get</el-button>
              <el-button
                class="btn"
                type="primary"
                @click="downLoad"
                v-show="isconfiguer"
              >Download</el-button>
            </p>
            <p class="line40">
              <el-button
                class="btn"
                type="primary"
                @click="reset"
              >Repower</el-button>
              <el-button
                class="btn"
                type="primary"
                @click="factory"
              >Factory</el-button>
            </p>
            <!-- <p class="line40"><el-button class="btn" type="primary">ISP Mode</el-button></p> -->
          </div>
        </div>
        <el-dialog
          title="APP Information"
          :visible.sync="dialogVisible"
          :append-to-body="true"
          width="500px"
          :close-on-click-modal="false"
        >
          <el-table
            empty-text="No Data"
            :data="Moreinfo"
          >
            <el-table-column
              property="name"
              label="Name"
              width="150"
            ></el-table-column>
            <el-table-column
              property="value"
              label="Verioson"
              width="200"
            ></el-table-column>
          </el-table>
        </el-dialog>
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
      dialogVisible: false,
      model: "",
      name: "",
      sn: "",
      firmwareVersion: "",
      Moreinfo: [],
      fileName: "",
      file: "",
      mac0: "",
      mac1: "",
      isFile: false,
      fileGrogress: 0,
      uploading: false,
      uploadStatus: "",
      // nameCheck: true,
      ipCheck: true,
      ipCheck2: true,
      maskCheck: true,
      maskCheck2: true,
      gatewayCheck: true,
      gatewayCheck2: true,
      tcp: "",
      tcpCheck: true,
      udp: "",
      udpCheck: true,
      isconfiguer: false,
      isIp: false,
      // Subnet mask
      isMask: false,
      // Gateway
      isGateway: false,
      // TCP
      istcp: false,
      // UDP
      isudp: false,
      oldIpVal0: "",
      oldMaskVal0: "",
      oldGateVal0: "",
      oldIpVal1: "",
      oldMaskVal1: "",
      oldGateVal1: "",
      oldTcpVal0: "",
      oldUdpVal0: "",
      isUpgrade: false
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
    ipCheck3() {
      this.ipCheck2 = true;
      this.isIp = true;
    },
    ipBlur() {},
    ipBlur3() {},
    // Subnet mask 获取焦点和失去焦点
    maskCheck1() {
      this.maskCheck = true;
      this.isMask = true;
    },
    maskCheck3() {
      this.maskCheck2 = true;
      this.isMask = true;
    },
    maskBlur() {},
    maskBlur3() {},
    // Gateway 获取焦点和失去焦点
    gatewayCheck1() {
      this.gatewayCheck = true;
      this.isGateway = true;
    },
    gatewayCheck3() {
      this.gatewayCheck2 = true;
      this.isGateway = true;
    },
    gatewayBlur() {},
    gatewayBlur3() {},
    // TCP 获取焦点和失去焦点
    tcpCheck1() {
      this.tcpCheck = true;
      this.istcp = true;
    },
    tcpBlur() {},
    udpBlur() {},
    //UDP 获取焦点和 失去焦点
    udpCheck1() {
      this.udpCheck = true;
      this.isudp = true;
    },
    //Name 获取焦点和 失去焦点
    nameCheck1() {
      this.nameCheck = true;
      // this.isudp = true;
    },
    // 选择文件
    uplaodFile() {
      document.getElementById("file").click();
    },
    // 上传文件点击确认后
    selectFile(event) {
      this.file = event.target.files[0];
      var filemaxsize = 1024 * 2;
      var size = this.file.size / 1024;
      let index = this.file.name.lastIndexOf(".");
      let ext = this.file.name.substr(index + 1);
      let extUpperCase = ext.toUpperCase();
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
      if (size <= 0) {
        this.$alert("The appendix size can not be 0M！", "Prompt information", {
          confirmButtonText: "OK",
          callback: action => {}
        });
        return false;
      }
      if (extUpperCase != "KPTW") {
        this.$alert("Upgrade file type error", "Prompt information", {
          confirmButtonText: "OK",
          callback: action => {}
        });
        return false;
      }
      this.fileName = this.file.name;
      this.isFile = true;
      this.isUpgrade = false;
      this.uploading = false;
      this.uploadStatus = "";
      this.fileGrogress = 0;
      this.getfileInfo(event)
    },
    // 上传升级文件
    getfileInfo(event) {
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
          if (msg.data.status == "SUCCESS") {
            that.uploadStatus = "success";
            that.fileGrogress = 100;
            that.isUpgrade = true;
            that.Upgrade();
            console.log("good for this ");
          } else {
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
    Upgrade() {
      let that = this;
      let aoData = {
        cmd: "UntarFile",
        FileName: that.fileName
      };
      this.$axios
        .post("/cgi-bin/ligline.cgi", aoData)
        .then(function(response) {
          if (response.data.status == "SUCCESS") {
            let decompressionFileName = response.data.echo.result.FileName;
            that.realUpgrade(decompressionFileName);
          } else if (response.data.status == "ERROR") {
            that.$alert(response.data.error, "Prompt information", {
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
    },
    realUpgrade(fileName) {
      let file=fileName.split('_')
      if(file[0]!=this.model){
        this.$alert(
            "Documents do not match device and cannot be upgraded",
            "Prompt information",
            {
              confirmButtonText: "OK",
              callback: action => {}
            }
          );
          return false;
      }
      let that = this;
      that.$store.state.upgradeDeviceLoading = true;
      window.upgradeSettimeout = setTimeout(function() {
        window.location.reload();
      }, 100000);
      let aoData = {
        cmd: "SetUpgrade",
        file: fileName
      };
      this.$axios
        .post("/cgi-bin/ligline.cgi", aoData)
        .then(function(response) {
          if (response.data.status == "SUCCESS") {
          } else if (response.data.status == "ERROR") {
            that.$alert(response.data.error, "Prompt information", {
              confirmButtonText: "OK",
              callback: action => {
                window.location.reload();
              }
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    saveInfo() 
    {
      let ipaddr = this.$refs.ipInp.value;
      let ipaddr1 = this.$refs.ipInp3.value;
      let maskaddr = this.$refs.subnetMask.value;
      let maskaddr1 = this.$refs.subnetMask3.value;
      let gateway = this.$refs.gateway.value;
      let gateway1 = this.$refs.gateway3.value;
      let tcp = this.$refs.tcp.value;
      let udp = this.$refs.udp.value;
      let ipNum = ipaddr.split(".").splice(0,3).join('.');
      let ip1Num = ipaddr1.split(".").splice(0,3).join('.');
      console.log(ipaddr);
      if (
        this.$checkInp.fnValidateIPAddress(ipaddr) == true &&
        this.$checkInp.fnValidateIPAddress(ipaddr1) == true &&
        this.$checkInp.fnValidateMask(maskaddr) == true &&
        this.$checkInp.fnValidateMask(maskaddr1) == true &&
        this.$checkInp.fnValidateGateway(gateway) == true &&
        this.$checkInp.fnValidateGateway(gateway1) &&
        this.$checkInp.fnValidateIcp(tcp) == true &&
        this.$checkInp.fnValidateUdp(udp) == true &&
        this.$checkInp.isEqualIPAddress(ipaddr, ipaddr1, maskaddr, maskaddr1) ==
          false && ipaddr!=gateway && ipaddr1!=gateway1 && ipaddr!=ipaddr1 && ipNum!=ip1Num && tcp!=udp
      ) 
      {
        /*this.$confirm("Are you sure?", "Prompt information", {
          confirmButtonText: "Ok",
          cancelButtonText: "Cancel",
          type: "warning",
          closeOnClickModal: false
        })
          .then(() => */{
            let that = this;
            let setInfo = [];
            let isLinkTo=false;
            if (ipaddr != that.oldIpVal0) {
              let ht = {
                name: "eth0",
                parameter: "IP",
                value: ipaddr
              };
              setInfo.push(ht);
              isLinkTo=true;
            }
            if (maskaddr != that.oldMaskVal0) {
              let ht = {
                name: "eth0",
                parameter: "MASK",
                value: maskaddr
              };
              setInfo.push(ht);
            }
            if (gateway != that.oldGateVal0) {
              let ht = {
                name: "eth0",
                parameter: "GATEWAY",
                value: gateway
              };
              setInfo.push(ht);
            }
            // flag
            // if (tcp != that.oldTcpVal0 && udp != that.oldUdpVal0) {
            //   this.tcpCheck = false;
            //   this.udpCheck = false;
            //   return
            // }
            if (tcp != that.oldTcpVal0) {
              let ht = {
                name: "eth0",
                parameter: "TCP_PORT",
                value: tcp
              };
              setInfo.push(ht);
            }
            if (udp != that.oldUdpVal0) {
              let ht = {
                name: "eth0",
                parameter: "UDP_PORT",
                value: udp
              };
              setInfo.push(ht);
            }
            if (ipaddr1 != that.oldIpVal1) {
              let ht = {
                name: "eth1",
                parameter: "IP",
                value: ipaddr1
              };
              setInfo.push(ht);
            }
            if (maskaddr1 != that.oldMaskVal1) {
              let ht = {
                name: "eth1",
                parameter: "MASK",
                value: maskaddr1
              };
              setInfo.push(ht);
            }
            if (gateway1 != that.oldGateVal1) {
              let ht = {
                name: "eth1",
                parameter: "GATEWAY",
                value: gateway1
              };
              setInfo.push(ht);
            }
            if (setInfo.length == 0) {
              return false;
            }
            //let isLinkTo=true;

            if(setInfo.length<=2){
              if(setInfo.length==1){
                if(setInfo[0].parameter=="TCP_PORT"||setInfo[0].parameter=="UDP_PORT"){
                  //isLinkTo=false;
                }
              }else{
                if(setInfo[0].parameter=="TCP_PORT"&&setInfo[1].parameter=="UDP_PORT"){
                  //isLinkTo=false;
                }
              }
            }
            let aoData = {
              cmd: "SetDeviceNetwork",
              Network: setInfo
            };
            this.$axios
              .post("/cgi-bin/ligline.cgi", aoData)
              .then(function(response) {
                if (response.data.status == "SUCCESS") 
                {
                  /*
                  that.$alert("Save success", "Prompt information", {
                    confirmButtonText: "OK",
                    callback: action => {
                      that.getDeviceInfo()
                      if(isLinkTo==true)
                      {
                        let aNum = ipaddr.split(".");
                        let num = "";
                        num += parseInt(aNum[0]) + ".";
                        num += parseInt(aNum[1]) + ".";
                        num += parseInt(aNum[2]) + ".";
                        num += parseInt(aNum[3]);
                        window.location.href = "http://" + num;
                      }
                    }
                  });*/
                  that.$message({
                    message: "Save success",
                    type: "success"
                  });
                  if(isLinkTo==true)
                  {
                    let aNum = ipaddr.split(".");
                    let num = "";
                    num += parseInt(aNum[0]) + ".";
                    num += parseInt(aNum[1]) + ".";
                    num += parseInt(aNum[2]) + ".";
                    num += parseInt(aNum[3]);
                    window.location.href = "http://" + num;
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
          }/*)
          .catch(() => {
            let sendata = {
              resetSure: "取消保存信息"
            };

            console.log(sendata);
          });*/
      } else {
        this.$alert("Parameter is incorrect!", "Prompt information", {
          confirmButtonText: "OK",
          callback: action => {}
        });
      }
      if (this.$checkInp.fnValidateIPAddress(ipaddr) == false) {
        this.ipCheck = false;
      }
      if (this.$checkInp.fnValidateIPAddress(ipaddr1) == false) {
        this.ipCheck2 = false;
      }
      if (this.$checkInp.fnValidateMask(maskaddr) == false) {
        this.maskCheck = false;
      }
      if (this.$checkInp.fnValidateMask(maskaddr1) == false) {
        this.maskCheck2 = false;
      }
      if (this.$checkInp.fnValidateGateway(gateway) == false) {
        this.gatewayCheck = false;
      }
      if (this.$checkInp.fnValidateGateway(gateway1) == false) {
        this.gatewayCheck2 = false;
      }
      if (this.$checkInp.fnValidateIcp(tcp) == false) {
        this.tcpCheck = false;
      }
      if (this.$checkInp.fnValidateUdp(udp) == false) {
        this.udpCheck = false;
      }
      if (ipaddr==gateway) {
        this.ipCheck = false;
        this.gatewayCheck = false;
      }
      if (ipaddr1==gateway1) {
        this.ipCheck2 = false;
        this.gatewayCheck2 = false;
      }
      if (ipaddr==ipaddr1) {
        this.ipCheck = false;
        this.ipCheck2 = false;
      }
      //this.ipCheck = !ipNum==ip1Num;
      //this.ipCheck2 = !ipNum==ip1Num;
      if (ipNum==ip1Num) {
        this.ipCheck = false;
        this.ipCheck2 = false;
      }
      if (tcp==udp) {
        this.tcpCheck = false;
        this.udpCheck = false;
      }
      // if (this.$checkInp.fnValidateName(nameaddr) == false) {
      //   this.nameCheck = false;
      // }
      if (
        this.$checkInp.isEqualIPAddress(ipaddr, ipaddr1, maskaddr, maskaddr1) ==
        true
      ) {
        this.ipCheck = false;
        this.ipCheck2 = false;
        this.maskCheck = false;
        this.maskCheck2 = false;
      }
    },
    getFile() {
      let that = this;
      this.$axios
        .get("/cgi-bin/lig_configuration.cgi")
        .then(respose => {
          that.isconfiguer = true;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    downLoad() {
      var ip_addr = document.location.hostname;
      let link = document.createElement("a");
      link.style.display = "none";
      link.href = "http://" + ip_addr + "/configuration.json";
      link.setAttribute("download", "configuration.json");
      document.body.appendChild(link);
      link.click();
    },
    reset() {
      this.$confirm(
        "RESET Device to repower ? <br/>Press OK to confirm",
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
          let that = this;
          let ip_addr = document.location.hostname;
          let aoData = {
            cmd: "SetDeviceReset"
          };
          this.$axios
            .post("/cgi-bin/ligline.cgi", aoData)
            .then(function(response) {
              if (response.data.status == "SUCCESS") {
                that.$store.state.resetLoading = true;
                window.mysettimeout = setTimeout(function() {
                  window.location.href = "http://" + ip_addr;
                }, 80000);
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
    factory() {
      this.$confirm(
        "RESET Device to factory default ? <br/>Press OK to confirm",
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
          let that = this;
          let aoData = {
            cmd: "SetDeviceFactory"
          };
          this.$axios
            .post("/cgi-bin/ligline.cgi", aoData)
            .then(function(response) {
              if (response.data.status == "SUCCESS") {
                that.$store.state.resetLoading = true;
                window.mysettimeout = setTimeout(function() {
                  window.location.href = "http://192.168.1.39";
                }, 80000);
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
    getDeviceInfo() {
      let that = this;
      let aoData = {
        cmd: "GetDeviceInfo"
      };
      this.$axios
        .post("/cgi-bin/ligline.cgi", aoData)
        .then(function(response) {
          if (response.data.status == "SUCCESS") {
            that.model = response.data.echo.result.DeviceInfo.BaseInfo.Model;
            that.name = response.data.echo.result.DeviceInfo.BaseInfo.Name;
            that.sn = response.data.echo.result.DeviceInfo.BaseInfo.SN;
            that.firmwareVersion =
              response.data.echo.result.DeviceInfo.BaseInfo.FirewareVersion;
            that.Moreinfo =
              response.data.echo.result.DeviceInfo.BaseInfo.Moreinfo;
            that.mac0 = response.data.echo.result.DeviceInfo.Ethernet[0].mac;
            that.mac1 = response.data.echo.result.DeviceInfo.Ethernet[1].mac;
            if (
              response.data.echo.result.DeviceInfo.Ethernet[0].ifname == "eth0"
            ) {
              that.$refs.ipInp.value =
                response.data.echo.result.DeviceInfo.Ethernet[0].ip;
              that.$refs.subnetMask.value =
                response.data.echo.result.DeviceInfo.Ethernet[0].mask;
              that.$refs.gateway.value =
                response.data.echo.result.DeviceInfo.Ethernet[0].gate;
              that.$refs.tcp.value =
                response.data.echo.result.DeviceInfo.Ethernet[0].tcp;
              that.$refs.udp.value =
                response.data.echo.result.DeviceInfo.Ethernet[0].udp;
              that.oldIpVal0 = JSON.parse(
                JSON.stringify(
                  response.data.echo.result.DeviceInfo.Ethernet[0].ip
                )
              );
              that.oldMaskVal0 = JSON.parse(
                JSON.stringify(
                  response.data.echo.result.DeviceInfo.Ethernet[0].mask
                )
              );
              that.oldGateVal0 = JSON.parse(
                JSON.stringify(
                  response.data.echo.result.DeviceInfo.Ethernet[0].gate
                )
              );
              that.oldTcpVal0 = JSON.parse(
                JSON.stringify(
                  response.data.echo.result.DeviceInfo.Ethernet[0].tcp
                )
              );
              that.oldUdpVal0 = JSON.parse(
                JSON.stringify(
                  response.data.echo.result.DeviceInfo.Ethernet[0].udp
                )
              );
            }
            if (
              response.data.echo.result.DeviceInfo.Ethernet[1].ifname == "eth1"
            ) {
              that.$refs.ipInp3.value =
                response.data.echo.result.DeviceInfo.Ethernet[1].ip;
              that.$refs.subnetMask3.value =
                response.data.echo.result.DeviceInfo.Ethernet[1].mask;
              that.$refs.gateway3.value =
                response.data.echo.result.DeviceInfo.Ethernet[1].gate;
              that.oldIpVal1 = JSON.parse(
                JSON.stringify(
                  response.data.echo.result.DeviceInfo.Ethernet[1].ip
                )
              );
              that.oldMaskVal1 = JSON.parse(
                JSON.stringify(
                  response.data.echo.result.DeviceInfo.Ethernet[1].mask
                )
              );
              that.oldGateVal1 = JSON.parse(
                JSON.stringify(
                  response.data.echo.result.DeviceInfo.Ethernet[1].gate
                )
              );
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
    ChooseFile() {}
  },
  created() {},
  mounted() {
    this.getDeviceInfo();
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
.wrapper {
  width: 800px;
  margin: 0 auto;
  height: calc(100% - 10px);
}
.title_device {
  font-size: 24px;
  font-weight: 400;
  margin-bottom: 15px;
}
p {
  font-size: 14px;
  line-height: 30px;
}
.box {
  width: 640px;
  margin: 0 auto;
  padding-left: 10px;
  /* border: 1px solid #ccc; */
  border-bottom: none;
  font-size: 0;
}
.left {
  display: inline-block;
  width: 180px;
}
.right {
  display: inline-block;
  width: 315px;
}
.content {
  display: inline-block;
  width: 300px;
}
.firmware {
  width: 150px;
  height: 150px;
  /* border-left: 1px solid #ccc; */
  float: right;
  text-align: center;
}
.btn {
  width: 150px;
  height: 30px;
  padding: 0px 20px;
}
.btnMore {
  width: 50px;
  height: 20px;
  padding: 0px 5px;
}
.martop10 {
  margin-top: 10px;
}
.line40 {
  line-height: 35px;
}
#deviceInfo {
  padding-top: 10px;
  height: 100%;
  background-color: white;
  border-radius: 5px;
}
.deviceInformation {
  width: auto;
  height: calc(100% - 10px);
  overflow: auto;
  padding-left: 10px;
  -webkit-overflow-scrolling: auto;
}
</style>