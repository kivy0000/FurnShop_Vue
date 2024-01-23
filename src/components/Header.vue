<template>
<!-- 页面头部，分为三个部分 -->
  <div style="height: 60px; line-height: 60px; border-bottom: 1px solid #ccc; display: flex">
      <el-image style="width: 120px; height: 60px" v-bind:src="require('@/assets/logo.jpg')"/>
    <div style="width: 240px; padding-left: 60px; font-weight: bold; color: grey">产品生命周期管理系统</div>
    <div style="flex: 1"></div>
    <div style="width: 100px">
        <el-dropdown>
          <el-button type="primary" style="height: 60px;size: auto" >
            账号管理<el-icon class="el-icon--right"><arrow-down /></el-icon>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="open4">个人信息</el-dropdown-item>
              <el-dropdown-item  @click="open('您已退出管理系统')" >
                <router-link to="/login"> 退出登录 </router-link>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
    </div>
  </div>
</template>
<!-- 16 17 18b 19b-->
<script>
import {ElMessage} from 'element-plus'
import { ElNotification } from 'element-plus'
export default {
  name: "Header",
  methods: {
    open(str) {
      ElMessage({
        message: str,
        type: 'error',
      })
    },
    open4() {
      ElNotification({
        title: '登录信息',
        message: '欢迎您：路人甲',
        type: 'success',
      })
    }
  }
}
</script>
