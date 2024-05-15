<template>
  <!--侧边栏-->
  <el-menu style="width: 200px"
           active-text-color="#ffd04b"
           background-color="cornflowerblue"
           class="el-menu-vertical-demo"
           default-active="2"
           text-color="#fff"
  >
    <el-sub-menu index="1">
      <template #title>
        <el-icon>
          <location/>
        </el-icon>
        <span>库存</span>
      </template>
      <el-sub-menu index="1-4">
        <template #title>流转</template>
        <el-menu-item index="1-4-1" @click="open('暂未开发')">内部流转</el-menu-item>
        <el-menu-item index="1-4-2" @click="open('暂未开发')">外部流转</el-menu-item>
      </el-sub-menu>
    </el-sub-menu>
    <el-menu-item index="2">
      <el-icon>
        <icon-menu/>
      </el-icon>
      <span @click="open('暂未开发')">内部</span>
    </el-menu-item>
    <el-menu-item index="3">
      <el-icon>
        <document/>
      </el-icon>
      <span @click="open('暂未开发')">流动</span>
    </el-menu-item>
    <el-menu-item index="4">
      <el-icon>
        <setting/>
      </el-icon>
      <span @click="open('暂未开发')">管理</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
import {ElMessage} from 'element-plus'

export default {
  name: "Aside",
  methods: {
    open(str) {
      ElMessage({
        message: str,
        type: 'warning',
      })
    }
  }
}
</script>

<style scoped>

</style>