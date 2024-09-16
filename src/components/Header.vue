<script setup>

</script>

<template>
    <div class="header">
        <el-row :gutter="0">
            <el-col :span="4" :offset="16">
                <el-button size="small" color="#5C7E10" type="primary" @click="installSteam">
                    <el-icon>
                        <Download />
                    </el-icon>
                    安装steam
                </el-button>
                <el-button type="text" size="small" @click="login" class="login">登录</el-button>
            </el-col>
        </el-row>

        <el-row :gutter="0">
            <el-col :offset="5" :span="3">
                <div class="logo">
                    <img src="../assets/logo_steam.svg" alt="steam" />
                </div>
            </el-col>
            <el-col :span="6">
                <div class="navmenu" >
                    <el-dropdown>
                        <el-button type="text" size="default" @click="">
                            商城
                        </el-button>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item>主页</el-dropdown-item>
                                <el-dropdown-item>愿望单</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                    <el-button type="text" size="default" @click="" >社区</el-button>
                    <el-button type="text" size="default" @click="">关于</el-button>
                    <el-button type="text" size="default" @click="">客服</el-button>
                </div>
            </el-col>



        </el-row>

    </div>
</template>

<style scoped lang="less">
.header {
    background-color: #171D25;
    width: 100%;
    height: auto;
    padding-top: 5px;
    padding-bottom: 20px;
    border-radius: 2px 2px 0 0;


    .login {
        color: white;
        margin: 0%;
    }

    .logo {
        width: 176px;
        height: 100%;


        img {
            width: 100%;
            height: 100%;

        }
    }

    .navmenu {
        display: flex;
        height: 100%;
        .el-button{
            color: white;
            font-size:medium;
            margin-left: 6px;
            margin-top: 8px;
        }

    }

}
</style>