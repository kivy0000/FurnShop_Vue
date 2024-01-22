<template>
<!-- 页面头部，分为三个部分 -->
  <div style="height: 50px; line-height: 50px; border-bottom: 1px solid #ccc; display: flex">
    <div style="width: 200px; padding-left: 60px; font-weight: bold; color: deepskyblue">家居管理系统</div>
    <div style="flex: 1"></div>
    <div style="width: 100px">
        <el-dropdown>
          <el-button type="primary">
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
