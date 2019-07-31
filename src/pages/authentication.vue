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
                @change="test">
            </el-switch>
            <div class="clear"></div>
            <!-- <el-form :label-position="labelPosition" label-width="130px" :model="formLabelAlign" v-show="password"> -->
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm" v-show="password">
                <!-- 旧密码 -->
                <el-form-item label="Old password">
                    <el-input class="ipt" v-model="form.old"></el-input>
                </el-form-item>

                <el-form-item label="密码" prop="pass">
                    <el-input type="password" class="ipt" v-model="ruleForm.pass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                    <el-input type="password" class="ipt" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
                </el-form-item>
                <!-- 新密码 -->
                <!-- <el-form-item label="Admin password">
                    <el-input class="ipt" v-model="form.pass"></el-input>
                </el-form-item> -->
                <!-- 确认密码 -->
                <!-- <el-form-item label="Confirm password">
                    <el-input class="ipt" v-model="form.checkPass"></el-input>
                </el-form-item> -->
            </el-form>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            </el-form-item>
        </div>
    </div>
</template>

<script>
export default {
    components: {},
    props: {},
    data() {
        // 两个密码
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                if (this.ruleForm.checkPass !== '') {
                    this.$refs.ruleForm.validateField('checkPass');
                }
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.ruleForm.pass) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            // 密码开始
            ruleForm: {
                pass: '',
                checkPass: '',
                age: ''
            },
            rules: {
                pass: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                checkPass: [
                    { validator: validatePass2, trigger: 'blur' }
                ]
            },
            // 密码结束
            security: false, //ture=ON开/false=OFF关 开关按钮
            labelPosition: 'left',
            form: {
                old: '',
                pass:'',
                checkPass:''
            },
            password: false, //输入密码是否显示
            inputValue:"",
            switchstatus:"",
            
            
        };
    },
    watch: {},
    computed: {},
    methods: {
        // 两个密码方法
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                alert('submit!');
            } else {
                console.log('error submit!!');
                return false;
            }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        changestatus(){
            let params = {
                cmd: "GetSecurityStat"
            }
            this.$axios({
                method: 'post',   
                url:  "/cgi-bin/ligline.cgi",
                data:params
                }).then(res=> {
                    // console.log(res)
                    if(res.data.status == 'SUCCESS'){
                        //接口调取成功
                        this.status = res.data.echo.result.securityStat;
                        // console.log('2号接口', this.status)
                        if(this.status == "0"){
                            this.password = false;
                            this.security = false;
                        }
                        else{
                            this.password = true;
                            this.security = true;
                        }
                    }
                    if(res.data.status == 'ERROR'){
                        //接口调取失败
                    }
                })
        },
        test(val){
            // this.switchstatus = val;
            // console.log("开关状态"+this.switchstatus)
            if(val==true){
                this.switchstatus = 1;
                this.openVerification();
            }else{
                this.switchstatus = 0;
                this.closeVerification();
            }
            // console.log(val)
        },
        // 打开安全机制
        openVerification() {
            this.$prompt('Input password', 'Tips', {
                showClose: false, //弹框叉号
                confirmButtonText: 'Confirm',
                cancelButtonText: 'Cancel',
                inputType:'password',
            }).then(({ value }) => { // 密码正确
                this.inputValue = value;
                if (this.inputValue == null) {
                    this.inputValue = ""
                } 
                // console.log("输入的密码" + this.inputValue);
                // 数据接口
                let params = {
                    cmd: "SetSecurityStat",
                    Security:{
                        username:"Admin",//用户名
                        password:this.inputValue,//密码
                        Security:this.switchstatus //0关闭 非0打开
                    }	
                }
                this.$axios({
                    method: 'post',   
                    url:  "/cgi-bin/ligline.cgi",
                    data:params
                    }).then(res=> {
                        console.log(res)
                        if(res.data.status == 'SUCCESS'){
                            this.$confirm('This operation will activate.the security on the device.and reload the web page.Do you want to continue?', 'Tips',{
                                showClose: false, //弹框叉号
                                confirmButtonText: 'OK',
                                cancelButtonText: 'CLOSE',
                                type: 'warning'
                            }).then(() => { //输入正确密码并且打开
                                this.password = true;
                                this.security = true;
                                console.log('开关状态',this.switchstatus)
                                // 这里差一个清理缓（清理缓存重新进入页面它会自动弹出用户名密码框）
                                
                            }).catch(() => { //输入正确密码取消打开
                                this.security = false;
                            });
                        }
                        if(res.data.status == 'ERROR'){
                            this.$message({
                                type: 'info',
                                message: 'Password Error'//密码错误
                            });
                            // this.password = false;
                            this.security = false;
                        }
                    })
            }).catch(() => { // 密码错误或者取消打开
                this.security=false;
            });
        },
        // 关闭安全机制
        closeVerification(){
            this.$prompt('Input password', 'Tips', {
                showClose: false, //弹框叉号
                confirmButtonText: 'Confirm',
                cancelButtonText: 'Cancel',
                inputType:'password',
            }).then(({ value }) => { // 密码正确
                this.inputValue = value;
                if (this.inputValue == null) {
                    this.inputValue = ""
                } 
                // console.log("输入的密码" + this.inputValue);
                // 数据接口
                let params = {
                    cmd: "SetSecurityStat",
                    Security:{
                        username:"Admin",//用户名
                        password:this.inputValue,//密码
                        Security:this.switchstatus //0关闭 非0打开
                    }	
                }
                this.$axios({
                    method: 'post',   
                    url:  "/cgi-bin/ligline.cgi",
                    data:params
                    }).then(res=> {
                        console.log(res)
                        if(res.data.status == 'SUCCESS'){
                            this.$confirm('This operation will deactivate. the security on the device. and reload the web page. Do you want to continue?', 'Tips',{
                                showClose: false, //弹框叉号
                                confirmButtonText: 'OK',
                                cancelButtonText: 'CLOSE',
                                type: 'warning'
                            }).then(() => { //输入正确密码并且打开
                                this.password = false;
                                this.security = false;
                                console.log('开关状态',this.switchstatus)
                                // 这里差一个清理缓（清理缓存重新进入页面它会自动弹出用户名密码框）
                                
                            }).catch(() => { //输入正确密码取消打开
                                this.security = true;
                            });
                        }
                        if(res.data.status == 'ERROR'){
                            this.$message({
                                type: 'info',
                                message: 'Password Error'//密码错误
                            });
                            // this.password = false;
                            this.security = true;
                        }
                    })
            }).catch(() => { // 密码错误或者取消打开
                this.security=true;
            });

        },
        jiekou(){
            /* 1号接口
            */
                let params1 = {
                    cmd: "SetSecurityStat",
                    Security:{
                        username:"Admin",//用户名
                        password:"123",//密码
                        Security:1 //0关闭 非0打开
                    }
                }
                this.$axios({
                    method: 'post',   
                    url:  "/cgi-bin/ligline.cgi",
                    data:params1
                }).then(res=> {
                    console.log('1号接口',res)
                    if(res.data.status == 'SUCCESS'){  //成功
                        
                    }
                    if(res.data.status == 'ERROR'){  //失败
                        
                    }
                })
            /* 2号接口
            */
                let params2 = {
                    cmd: "GetSecurityStat",
                }
                this.$axios({
                    method: 'post',   
                    url:  "/cgi-bin/ligline.cgi",
                    data:params2
                }).then(res=> {
                    console.log('2号接口',res)
                    if(res.data.status == 'SUCCESS'){  //成功
                        
                    }
                    if(res.data.status == 'ERROR'){  //失败
                        
                    }
                })
            /* 3号接口
            */
                let params3 = {
                    cmd: "SetUserPassword",
                    UserPassword:{
                        username:"Admin",
                        password:"000000",
                        newpassword:"123"
                    }
                }
                this.$axios({
                    method: 'post',   
                    url:  "/cgi-bin/ligline.cgi",
                    data:params3
                }).then(res=> {
                    console.log('3号接口',res)
                    if(res.data.status == 'SUCCESS'){  //成功
                        
                    }
                    if(res.data.status == 'ERROR'){  //失败
                        
                    }
                })
        }
    },
    created() {
        this.changestatus()
        // this.jiekou()
    },
    mounted() {}
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
</style>