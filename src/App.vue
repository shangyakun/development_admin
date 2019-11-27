<template>
<div id="app">
    <el-container>
           <el-header class='header' style='height:80px'>
                <img src="./assets/logo.png" alt="">
            </el-header>
            <el-container>
                <el-aside width="170px" :style="{height:Oheight+'px'}"> 
                    <div style="font-size: 18px;padding: 20px">胜任力模型管理</div>
                    <el-menu
                        default-active="/"
                        class="sider-menu"
                        router
                        active-text-color="#409EFF">
                        <el-menu-item index="/">
                            <span style="font-size:12px;">员工胜任力模型</span>
                        </el-menu-item>
                        <el-menu-item index="/config">
                            <span style="font-size:12px;">胜任力要求配置</span>
                        </el-menu-item>
                        <el-menu-item index="/model">
                            <span style="font-size:12px;" slot="title">胜任力模型配置</span>
                        </el-menu-item>
                        <el-menu-item index="/link">
                            <span style="font-size:12px;" slot="title">岗位类别关联</span>
                        </el-menu-item>
                    </el-menu>
                </el-aside>
                <el-container>
                    <router-view/>
                </el-container>
            </el-container>
    </el-container>
</div>
</template>

<script>
export default {
  name: 'App',
    data(){
        return{
            Oheight:'',
            color:'#fff'
        }
    },
    created(){
        this.$router.push({
          path:'/'
        })
    },
    mounted(){
        this.Oheight=window.screen.height-240;
    }
}
</script>

<style scope="scope">
    #app{
        min-width: 1200px;
    }
    #wrap{
        /* max-width: 1440px; */
        margin: 0 auto;
        /* min-width: 1200px; */
    }
    .header{
        width: 100%;
        background: #409EFF;
        padding: 20px 0;
    }
    .header img{
        height: 40px;
        margin-left: 10px;
    }
    .sider-menu{
        border: none;
        /* background-color: rgb(238, 241, 246) */
    }
</style>
