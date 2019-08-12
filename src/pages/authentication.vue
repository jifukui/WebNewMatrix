<template>
    <div class="wrapper">
        <div class="box">
            <p class="title">Authentication</p>
            <p class="title2">Activate Security</p>
            <el-switch 
                style="height:40px;"
                v-model="security"
                active-text="ON"
                inactive-text="OFF"
                @change="SetSecurityStat">
            </el-switch>
            <div class="clear"></div>
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm" v-show="security">
                <el-form-item label="Password" >
                    <el-input class="distance" type="password" v-model="OldPassword" maxlength="15"></el-input>
                </el-form-item>
                <el-form-item label="New Password" >
                    <el-input class="distance" type="password" v-model="NewPassword" maxlength="15"></el-input>
                </el-form-item>
                <el-form-item label="Confirm Password">
                    <el-input class="distance" type="password" v-model="ReNewPassword" maxlength="15"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="SetPassword">SAVE</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    components: {},
    props: {},
    data() {
        return {
            security:this.$store.state.SecurityStatus==0?false:true,
            OldPassword:"",
            NewPassword:"",
            ReNewPassword:"",
        };
    },
    watch: {
        OldPassword: function (value){
            /*if(value.length>15){
                this.$message({
                type: 'info',
                message: 'The password is limited to a maximum of 15 alphanumeric characters and must not contain spaces'//密码错误
                });
            }*/
        },
        NewPassword:function (value){
            /*if(value.length>15){
                this.$message({
                type: 'info',
                message: 'The password is limited to a maximum of 15 alphanumeric characters and must not contain spaces'//密码错误
                });
            }*/
        
        },
        ReNewPassword:function (value){
            /*if(value.length>15){
                this.$message({
                type: 'info',
                message: 'The password is limited to a maximum of 15 alphanumeric characters and must not contain spaces'//密码错误
                });
            }*/
        }

    },
    computed: {},
    methods: {
        SetSecurityStat(val){
            this.$prompt('Input Admin password', 'Tips', {
                showClose: false, //弹框叉号
                confirmButtonText: 'Confirm',
                cancelButtonText: 'Cancel',
                inputType:'password',
            }).then(({ value }) => 
            { 
                console.log("value is "+value);
                if (value == null) 
                {
                    value = ""
                } 
                let params = {
                    cmd: "SetSecurityStat",
                    Security:{
                        username:"Admin",//用户名
                        password:value,//密码
                        Security:val?1:0 //0关闭 非0打开
                    }	
                }
                this.$axios({
                    method: 'post',   
                    url:"/cgi-bin/ligline.cgi",
                    data:params
                    }).then(res=> {
                        console.log(res)
                        if(res.data.status == 'SUCCESS')
                        {
                            this.$store.state.SecurityStatus=this.$store.state.SecurityStatus^1;
                            //console.log("The value is "+this.$store.state.SecurityStatus);
                            this.security=this.$store.state.SecurityStatus==0?false:true;
                            this.$message({
                                type: 'success',
                                message: 'Set Security Status Successful'//密码错误
                            });
                        }
                        else
                        {
                            this.$message({
                                type: 'info',
                                message: 'Password Error'//密码错误
                            });
                            this.security=this.$store.state.SecurityStatus==0?false:true;
                        }
                        console.log("The status is "+this.security);
                    })
            }).catch(() => { 
                this.security=this.$store.state.SecurityStatus==0?false:true;
            });
        },
        SetPassword(){
            if(this.NewPassword!=this.ReNewPassword)
            {
                this.$message({
                    type: 'info',
                    message: 'You entered different passwords'
                });
                return ;
            }
            let params = {
                    cmd: "SetUserPassword",
                    UserPassword:{
                        username:"Admin",//用户名
                        password:this.OldPassword,//密码
                        newpassword:this.NewPassword
                    }	
            }
            this.OldPassword="";
            this.NewPassword="";
            this.ReNewPassword="";
            this.$axios({
                method: 'post',   
                url:  "/cgi-bin/ligline.cgi",
                data:params
                }).then(res=> 
                {
                    console.log(res)
                    if(res.data.status == 'SUCCESS')
                    {
                        this.$message({
                            type: 'info',
                            message: 'Password Setting Successful'//密码错误
                        });
                    }
                    if(res.data.status == 'ERROR'){
                        this.$message({
                            type: 'info',
                            message: res.data.error//密码错误
                        });
                    }
                }).catch(() => 
                { 
            });
        },
        Authentication()
        {
            let aoData = {
            cmd: "GetSecurityStat"
            };
            let that=this
            this.$axios.post("/cgi-bin/ligline.cgi", aoData)
            .then(function(response) 
            {
                if (response.data.status == "SUCCESS") 
                {
                    that.$store.state.SecurityStatus=response.data.echo.result.securityStat;
                }     
                console.log("Sect statue is "+that.$store.state.SecurityStatus);
                that.security=that.$store.state.SecurityStatus==1?true:false;
            }).catch(function(error) {
                console.log(error);
          });
        }
    },
    created() {
        let that=this;
        name:"Admin",
        that.Authentication();
        console.log("created");
    },
    mounted() {
         //let that=this;
        //that.Authentication();
        console.log("mounted");
    }
};
</script>

<style scoped>
@import "../style/common";
.wrapper {
    width: 100%;
    height: calc(100% - 20px);
    overflow: auto;
}
.box {
    width: 776px;
    height: 300px;
    padding: 60px;
    margin: 20px auto 0;
}
.title {
    font-size: 50px;
}
.title2{
    width: 130px;
    float: left;
    line-height: 40px;
}
.ipt {
    width: 200px;
}
.distance {
    width: 200px;
}
</style>