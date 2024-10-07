<script setup>
import { useSteamStore } from '@/stores/SteamStore';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const store=useSteamStore()
const route=useRoute()
const router=useRouter()

const username=ref('')
const password=ref('')
const rememberMe=ref(true)
const errMsg=ref('')
const loading=ref(false)
//apifox预设的两个账号，usr:wuyu,psw:wuyu;usr:atri,psw:atri
const login=()=>{
    if(!username.value||!password.value)
    return
    loading.value=true
    //pinia
    const loginInformation={
        username:username.value,
        password:password.value,
        rememberMe:rememberMe.value
    }
    store.login(loginInformation).then(()=>{
        store.getUserInfo(rememberMe.value)
    }).then(()=>{
        //重定向到之前界面或者主页
        router.push({path:route.query.redir||'/'})
    }).catch((reason)=>{
        loading.value=false
        errMsg.value=reason.message
    })
}
const clearErrMsg=()=>{
    errMsg.value=''
}

</script>

<template>
    <div class="login">
        <div class="login-title">登录</div>
        <div class="login-content">
            <div class="left">
                <!--账户名称-->
                <div class="username">
                    <div class="username-label">用账户名称登录</div>
                    <input v-model="username" class="username-input" name="username" @input="clearErrMsg()">
                </div>
                <!--密码-->
                <div class="password">
                    <div class="password-label">密码</div>
                    <input v-model="password" class="password-input" name="password" type="password"
                        @input="clearErrMsg()">
                </div>
                <!--记住我-->
                <label class="remember">
                    <input v-model="rememberMe" class="remember-input" type="checkbox">
                    记住我
                </label>
                <!--登录按钮-->
                <div v-loading="loading" class="login-button" @click="login()">登录</div>
                <!--错误提示-->
                <div class="login-error">{{ errMsg }}</div>
                <!--帮助-->
                <RouterLink class="login-help" to="">请求帮助，我无法登录。</RouterLink>
            </div>
            <div class="right">
                <!--二维码登录-->
                <div class="qrcode-label">或者用二维码登录</div>
                <div class="qrcode">
                    <img src="@/assets/login_qr_code.png" alt="">
                </div>
                <div class="qrcode-tip">通过二维码使用 Steam 手机应用登录</div>
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.login {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 700px;
    background-image: url("../assets/new_login_bg_strong_mask.jpg");
    background-repeat: no-repeat;

    .login-title {
        margin-top: 6%;
        padding-left: 15px;
        box-sizing: border-box;
        width: 700px;
        color: #ffffff;
        font-size: 32px;
        font-weight: 200;
    }

    .login-content {
        display: flex;
        width: 700px;
        border-radius: 5px;
        background-color: #181a21;
        padding-top: 15px;
        padding-left: 30px;

        .left {
            width: 60%;
            display: flex;
            flex-direction: column;

            .username-label,
            .password-label {
                color: #1999ff;
                font-size: 12px;
                margin-top: 15px;
            }

            .password-label {
                color: #afafaf;
            }

            .username-input,
            .password-input {
                box-sizing: border-box;
                width: 90%;
                border-radius: 2px;
                background-color: #32353c;
                padding: 10px;
                border: none;
                outline: none;
                font-size: 15px;

                &:hover {
                    background-color: #393c44;
                }
            }

            .remember {
                display: flex;
                align-items: center;
                margin-top: 10px;
                color: #afafaf;
                font-size: 12px;
                cursor: pointer;
            }

            .remember-input {
                position: relative;
                box-sizing: border-box;
                width: 20px;
                height: 20px;
                padding: 10px;
                margin: 0 6px 0 0;
                border-radius: 2px;
                background-color: #32353c;
                cursor: pointer;
                appearance: none;

                &:checked::after {
                    content: "✔";
                    position: absolute;
                    left: 0;
                    top: 0;
                    display: inline-block;
                    width: 20px;
                    height: 20px;
                    color: #ffffff;
                    font-size: 15px;
                    line-height: 20px;
                    text-align: center;
                }

                &:hover {
                    background-color: #393c44;
                }
            }

            .login-button {
                align-self: center;
                box-sizing: border-box;
                width: 270px;
                padding: 12px;
                border-radius: 2px;
                color: #ffffff;
                font-size: 16px;
                text-align: center;
                background: linear-gradient(90deg, #06BFFF 0%, #2D73FF 100%);
                cursor: pointer;

                &:hover {
                    background: linear-gradient(90deg, #06BFFF 30%, #2D73FF 100%);
                }
            }

            .login-error {
                align-self: center;
                height: 16px;
                color: #c15755;
                font-size: 12px;
            }

            .login-help {
                align-self: center;
                color: #afafaf;
                font-size: 12px;
                margin-bottom: 15px;
                &:hover {
                    color: #c9c9c9;
                }
            }
        }

        .right {
            width: 40%;
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            padding-left: 40px;

            .qrcode-label {
                color: #1999ff;
                font-size: 12px;
                user-select: none;
            }

            .qrcode {
                width: 200px;
                height: 200px;

                img {
                    width: 100%;
                    height: 100%;
                }
            }

            .qrcode-tip {
                color: #afafaf;
                font-size: 12px;
                text-align: center;
                margin-bottom: 15px;
            }
        }
    }
}
</style>