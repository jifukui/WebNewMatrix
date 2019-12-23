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
                :disabled="fileName!=''" 
                @click="uplaodFile()"
              >Browse</el-button>
            </p>
            <p>
              <el-progress
                :percentage="fileGrogress"
                v-show="uploading"
                :status="uploadStatus"
              ></el-progress>
            </p>
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
                @keyup="JiEthoIPCheck()"
                type="text"
                id=""
                ref="ipInp"
                value=""
              ></p>
            <!-- MASK -->
            <p><input
                :class="maskCheck==true?'equipment_information_two_input':'equipment_information_two_input1'"
                @keyup="JiEthoMASKCheck()"
                type="text"
                id=""
                ref="subnetMask"
                value=''
              ></p>
            <!-- GATE -->
            <p><input
                :class="gatewayCheck==true?'equipment_information_two_input':'equipment_information_two_input1'"
                @keyup="JiEthoGatewayCheck()"
                type="text"
                id=""
                ref="gateway"
                value=''
              ></p>
            <!-- TCP -->
            <p><input
                :class="tcpCheck==true?'equipment_information_two_input':'equipment_information_two_input1'"
                title="2000~65535"
                @keyup="JiEthoTCPCheck()"
                type="text"
                id=""
                ref="tcp"
                value=""
              ></p>
            <!-- UDP -->
            <p><input
                :class="udpCheck==true?'equipment_information_two_input':'equipment_information_two_input1'"
                title="2000~65535"
                @keyup="JiEthoUDPCheck()"
                type="text"
                id=""
                ref="udp"
                value=''
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
                @keyup="JiEthoIP1Check()"
                type="text"
                id=""
                ref="ipInp3"
                value=''
              ></p>
            <!-- MASK -->
            <p> <input
                :class="maskCheck2==true?'equipment_information_two_input':'equipment_information_two_input1'"
                @keyup="JiEthoMASK1Check()"
                type="text"
                id=""
                ref="subnetMask3"
                value=''
              ></p>
            <!-- GATE -->
            <p> <input
                :class="gatewayCheck2==true?'equipment_information_two_input':'equipment_information_two_input1'"
                @keyup="JiEthoGateway1Check()"
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
            <p class="line40">Refresh:</p>
            <!-- <p class="line40">ISP Mode:</p> -->
          </div>
          <div class="right">
            <p class="line40">
              <el-button
                :disabled= !HaveChange
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
              >Save</el-button>
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
            <p class="line40">
              <el-button
                class="btn"
                type="primary"
                @click="DeviceRefresh"
              >Refresh</el-button>
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
      isUpgrade: false,
      HaveChange:false,
      ChangeFlag:0
    };
  },
  watch: {
    ChangeFlag:function(value)
    {
      console.log("The data is "+value)
      if(value==0)
      {
        this.HaveChange=false;
      }
      else
      {
        this.HaveChange=true;
      }
    }
  },
  computed: {},
  methods: {
    JiEthoIPCheck()
    {
      let value=this.$refs.ipInp.value;
      console.log("The IP address is "+value);
      console.log("The Old Value is "+this.oldIpVal0);
      if(this.oldIpVal0==value)
      {
        this.ChangeFlag&=~1;
      }
      else
      {
        this.ChangeFlag|=1;
      }
    },
    JiEthoMASKCheck()
    {
      let value=this.$refs.subnetMask.value;
      console.log("The MAKK address is "+value);
      console.log("The Old Value is "+this.oldMaskVal0);
      if(this.oldMaskVal0==value)
      {
        this.ChangeFlag&=~2;
      }
      else
      {
        this.ChangeFlag|=2;
      }
    },
    JiEthoGatewayCheck()
    {
      let value=this.$refs.gateway.value;
      console.log("The Gateway address is "+value);
      console.log("The Old Value is "+this.oldGateVal0);
      if(this.oldGateVal0==value)
      {
        this.ChangeFlag&=~4;
        //this.gatewayCheck = true; 
      }
      else
      {
        this.ChangeFlag|=4;
      }
    },
    JiEthoTCPCheck()
    {
      this.$refs.tcp.value=this.$refs.tcp.value.replace(/\D/g,'');
      let value=this.$refs.tcp.value;
      console.log("The TCP address is "+value);
      console.log("The Old Value is "+this.oldTcpVal0);
      if(this.oldTcpVal0==value)
      {
        this.ChangeFlag&=~8;
      }
      else
      {
        this.ChangeFlag|=8;
      }
    },
    JiEthoUDPCheck()
    {
      this.$refs.udp.value=this.$refs.udp.value.replace(/\D/g,'');
      let value=this.$refs.udp.value;
      console.log("The UDP address is "+value);
      console.log("The Old Value is "+this.oldUdpVal0);
      if(this.oldUdpVal0==value)
      {
        this.ChangeFlag&=~16;
      }
      else
      {
        this.ChangeFlag|=16;
      }
    },
    JiEthoIP1Check()
    {
      let value=this.$refs.ipInp3.value;
      console.log("The IP1 address is "+value);
      console.log("The Old Value is "+this.oldIpVal1);
      if(this.oldIpVal1==value)
      {
        this.ChangeFlag&=~32;
      }
      else
      {
        this.ChangeFlag|=32;
      }
    },
    JiEthoMASK1Check()
    {
      let value=this.$refs.subnetMask3.value;
      console.log("The MASK1 address is "+value);
      console.log("The Old Value is "+this.oldMaskVal1);
      if(this.oldMaskVal1==value)
      {
        this.ChangeFlag&=~64;
      }
      else
      {
        this.ChangeFlag|=64;
      }
    },
    JiEthoGateway1Check()
    {
      let value=this.$refs.gateway3.value;
      console.log("The Gateway1 address is "+value);
      console.log("The Old Value is "+this.oldGateVal1);
      if(this.oldGateVal1==value)
      {
        this.ChangeFlag&=~128;
      }
      else
      {
        this.ChangeFlag|=128;
      }
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
      if (size <= 0) {
        this.$alert("The appendix size can not be 0M！", "Prompt information", {
          confirmButtonText: "OK",
          callback: action => {}
        });
        return false;
      }
      if (extUpperCase != "KPTW") 
      {
        this.$alert("Upgrade file type error", "Prompt information", 
        {
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
          } 
          else 
          {
            that.fileName="";
            that.uploading=false;
            console.log("The value is " + msg.data.status);
          }
        })
        .catch(function(error) {
          that.$alert(error.data.error, "Prompt information", {
            confirmButtonText: "OK",
            callback: action => {
              that.fileName="";
              that.uploading=false;
            }
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
        .then(function(response) 
        {
          if (response.data.status == "SUCCESS") 
          {
            let decompressionFileName = response.data.echo.result.FileName;
            that.realUpgrade(decompressionFileName);
          } 
          else if (response.data.status == "ERROR") 
          {
            that.$alert(response.data.error, "Prompt information", 
            {
              confirmButtonText: "OK",
              callback: action => {
                that.fileName="";
                that.uploading=false;
              }
            });
          }
        })
        .catch(function(error) 
        {
          that.$alert(error, "Prompt information", 
          {
            confirmButtonText: "OK",
            callback: action => {}
          });
        });
    },
    realUpgrade(fileName) {
      let that=this;
      let file=fileName.split('_')
      if(file[0]!=this.model){
        this.$alert(
            "Documents do not match device and cannot be upgraded",
            "Prompt information",
            {
              confirmButtonText: "OK",
              callback: action => {
                that.fileName="";
                that.uploading=false;
              }
            }
          );
          return false;
      }
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
          } 
          else if (response.data.status == "ERROR") 
          {
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
      let ipaddr =this.SetIPAddress(this.$refs.ipInp.value) ;
      let ipaddr1 =this.SetIPAddress(this.$refs.ipInp3.value) ;
      let maskaddr = this.$refs.subnetMask.value;
      let maskaddr1 = this.$refs.subnetMask3.value;
      let gateway =this.SetIPAddress(this.$refs.gateway.value) ;
      let gateway1 =this.SetIPAddress(this.$refs.gateway3.value) ;
      let tcp = this.$refs.tcp.value;
      let udp = this.$refs.udp.value;
      console.log(ipaddr1);
      this.ipCheck=this.$checkInp.fnValidateIPAddress(ipaddr);
      this.maskCheck=this.$checkInp.fnValidateMask(maskaddr);
      this.gatewayCheck=this.$checkInp.fnValidateGateway(gateway);
      this.tcpCheck=this.$checkInp.fnValidateIcp(tcp);
      this.udpCheck=this.$checkInp.fnValidateUdp(udp);
      this.ipCheck2=this.$checkInp.fnValidateIPAddress(ipaddr1);
      this.maskCheck2=this.$checkInp.fnValidateMask(maskaddr1);
      this.gatewayCheck2=this.$checkInp.fnValidateGateway(gateway1);
      if (
         this.ipCheck== true &&
         this.maskCheck== true &&
         this.gatewayCheck== true &&
         this.tcpCheck== true &&
         this.udpCheck== true &&
         this.ipCheck2==true&&
         this.maskCheck2== true &&
         this.gatewayCheck2== true &&
        this.$checkInp.isEqualIPAddress(ipaddr, ipaddr1, maskaddr, maskaddr1) ==
          false && ipaddr!=gateway && ipaddr1!=gateway1 && ipaddr!=ipaddr1  && tcp!=udp
      ) 
      {
        
        let that = this;
        let setInfo = [];
        if ((that.ChangeFlag&1)==1) 
        {
          let ht = {
            name: "eth0",
            parameter: "IP",
            value: ipaddr
          };
          setInfo.push(ht);
        }
        if ((that.ChangeFlag&2)==2) 
        {
          let ht = {
          name: "eth0",
          parameter: "MASK",
          value: maskaddr
          };
          setInfo.push(ht);
        }
        if ((that.ChangeFlag&4)==4)
        {
          let ht = {
          name: "eth0",
          parameter: "GATEWAY",
          value: gateway
          };
          setInfo.push(ht);
        }
        if ((that.ChangeFlag&8)==8) 
        {
          let ht = {
          name: "eth0",
          parameter: "TCP_PORT",
          value: tcp
          };
          setInfo.push(ht);
        }
        if ((that.ChangeFlag&16)==16) 
        {
          let ht = {
          name: "eth0",
          parameter: "UDP_PORT",
          value: udp
          };
          setInfo.push(ht);
        }
        if ((that.ChangeFlag&32)==32) 
        {
          let ht = {
          name: "eth1",
          parameter: "IP",
          value: ipaddr1
          };
          setInfo.push(ht);
        }
        if ((that.ChangeFlag&64)==64) 
        {
          let ht = {
          name: "eth1",
          parameter: "MASK",
          value: maskaddr1
          };
          setInfo.push(ht);
        }
        if ((that.ChangeFlag&128)==128) 
        {
          let ht = {
            name: "eth1",
            parameter: "GATEWAY",
            value: gateway1
          };
          setInfo.push(ht);
        }
        console.log("send is "+JSON.stringify(setInfo));
        if (setInfo.length == 0) 
        {
          console.log("send is "+JSON.stringify(setInfo));
          return false;
        }
        let aoData = {
          cmd: "SetDeviceNetwork",
          Network: setInfo
        };
        this.$axios
          .post("/cgi-bin/ligline.cgi", aoData)
            .then(function(response) 
            {
              if (response.data.status == "SUCCESS") 
              {
                that.$message({
                  message: "Save success",
                  type: "success"
                });
                if((that.ChangeFlag&1)==1)
                {
                  console.log("chanage ip 11"+ipaddr)
                  window.location.href = "http://" +ipaddr;
                  that.ChangeFlag=1;
                  that.HaveChange=false;
                }
                else
                {
                  console.log("The Old ip is "+that.oldIpVal0);
                  that.oldIpVal0=ipaddr;
                  that.oldMaskVal0=maskaddr;
                  that.oldGateVal0=gateway;
                  that.oldTcpVal0=tcp;
                  that.oldUdpVal0=udp;
                  that.oldIpVal1=ipaddr1;
                  that.oldMaskVal1=maskaddr1;
                  that.oldGateVal1=gateway1;
                  that.ChangeFlag=0;
                  that.HaveChange=false;
                }
              } 
              else if (response.data.status == "ERROR") 
              {
                that.$alert(response.data.error, "Prompt information", {
                  confirmButtonText: "OK",
                  callback: action => {}
                });
                that.ChangeFlag=0;
                that.HaveChange=false;
              }
            })
            .catch(function(error) 
            {
              console.log(error);
              that.ChangeFlag=0;
              that.HaveChange=false;
            });
        if((that.ChangeFlag&1)==1)
        {
          console.log("chanage ip "+ipaddr);
          window.location.href = "http://" +ipaddr;
        }
        else
        {
          console.log("Have nochangfe")
        }
      } 
      else 
      {
        this.$alert("Parameter is incorrect!", "Prompt information", 
        {
          confirmButtonText: "OK",
          callback: action => {
            //that.ChangeFlag=0;
          }
        });
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
      ).then(() => {
        let that = this;
        let ip_addr = document.location.hostname;
        let aoData = {
          cmd: "SetDeviceReset"
        };
        this.$axios
          .post("/cgi-bin/ligline.cgi", aoData)
          .then(function(response) 
          {
            if (response.data.status == "SUCCESS") 
            {
              that.$store.state.resetLoading = true;
              window.mysettimeout = setTimeout(function() {
                window.location.href = "http://" + ip_addr;
              }, 80000);
            } 
            else if (response.data.status == "ERROR") 
            {
              that.$alert(response.data.error, "Prompt information", {
                confirmButtonText: "OK",
                callback: action => {}
              });
            }
          }).catch(function(error) {
            console.log(error);
          });
        }).catch(() => {
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
          if (response.data.status == "SUCCESS") 
          {
            that.model = response.data.echo.result.DeviceInfo.BaseInfo.Model;
            that.name = response.data.echo.result.DeviceInfo.BaseInfo.Name;
            that.sn = response.data.echo.result.DeviceInfo.BaseInfo.SN;
            that.firmwareVersion =response.data.echo.result.DeviceInfo.BaseInfo.FirewareVersion;
            that.Moreinfo =response.data.echo.result.DeviceInfo.BaseInfo.Moreinfo;
            that.mac0 = response.data.echo.result.DeviceInfo.Ethernet[0].mac;
            that.mac1 = response.data.echo.result.DeviceInfo.Ethernet[1].mac;
            if (
              response.data.echo.result.DeviceInfo.Ethernet[0].ifname == "eth0"
            ) 
            {
              that.$refs.ipInp.value =that.SetIPAddress(response.data.echo.result.DeviceInfo.Ethernet[0].ip) ;
              that.$refs.subnetMask.value =response.data.echo.result.DeviceInfo.Ethernet[0].mask;
              that.$refs.gateway.value =that.SetIPAddress(response.data.echo.result.DeviceInfo.Ethernet[0].gate);
              that.$refs.tcp.value =response.data.echo.result.DeviceInfo.Ethernet[0].tcp;
              that.$refs.udp.value =response.data.echo.result.DeviceInfo.Ethernet[0].udp;
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
            ) 
            {
              that.$refs.ipInp3.value =that.SetIPAddress(response.data.echo.result.DeviceInfo.Ethernet[1].ip);
              that.$refs.subnetMask3.value =
                response.data.echo.result.DeviceInfo.Ethernet[1].mask;
              that.$refs.gateway3.value =that.SetIPAddress(response.data.echo.result.DeviceInfo.Ethernet[1].gate);
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
          console.log(error);
        });
    },
    ChooseFile() {},
    SetIPAddress(value)
    {
      let data=value.split(".");
      let val=new Array();
      for(let i=0;i<data.length;i++)
      {
        val[i]=parseInt(data[i])
      }
      return val.join(".")
    },
    DeviceRefresh()
    {
      this.ChangeFlag=0;
      this.getDeviceInfo();
    }
  },
  created() {},
  mounted() {
    this.$store.state.ConfigureLabelName="first";
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