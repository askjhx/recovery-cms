<template>
  <div id="app">
    <el-container>
      <el-aside style="width:180px;">
        <el-header>
          <img src="./assets/logo@2x.c322923a.png" width="150" style="background-color: #fff;">

        </el-header>
        <el-menu>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-message"></i>日志管理
            </template>
            <router-link to="/workLog">
              <el-menu-item index="1-1">日志查询</el-menu-item>
            </router-link>
            <router-link to="/workLog/add">
              <el-menu-item index="1-2">新增日志</el-menu-item>
            </router-link>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-main>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="/workLog">日志管理</a></el-breadcrumb-item>
          </el-breadcrumb>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {

  },
  data() {
    return {
      list: []
    }
  },
  mounted() {
    document.title = '装垃宝CMS - 湖南金全';
  },
  methods: {
  }
}
</script>

<style>
html,
body,
#app {
  height: 100%;
  margin: 0px !important;
  padding: 0px;
}

#app {
  text-align: left !important;
}
.el-breadcrumb{
  line-height: 30px;
}
.el-container {
  height: 100%;
}

.router-link-active {
  text-decoration: none;
}

a {
  text-decoration: none;
}

.el-header,
.el-footer {
  background-color: #000c17;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-header {
  background-color: #fff;
  color: #fff;
  line-height: 90px;
  padding: 0;
}

.el-aside {
  background-color: #000c17;
  line-height: 200px;
  /* text-align:end; */
}

.el-main {
  background-color: f#fff;
  color: #333;
  line-height: 160px;
  /* padding: 0 2%;
  width: 96%; */
}

.el-menu {
  background-color: #000c17;
  color: #fff;
  width: 100%;
  border: 0;
}

.el-menu .el-menu-item,
.el-menu .el-submenu__title {
  color: #fff;
}

/* 设置选中菜单项的背景色 */
.el-menu .el-menu-item.is-active {
  background-color: #409EFF !important;
  /* 你可以更改为你想要的颜色 */
  color: #fff;
  /* 设置选中项的文字颜色 */
}

.el-menu-item:hover,
.el-submenu__title:hover {
  background-color: transparent !important;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
