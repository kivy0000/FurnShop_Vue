<template>
  <div class="login">
    <el-form :model="form" label-width="120px">

      <el-form-item label="账号">
        <el-input v-model="form.name" style="width: 40%"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" style="width: 40%"></el-input>
      </el-form-item>
    </el-form>
    <router-link to="/">
      <el-button type="primary"  @click="open('登陆成功')">登录</el-button>
    </router-link>

  </div>
</template>

<script>

import {ElMessage} from 'element-plus'


export default {
  name: "HomeView",
  components: {},
  data() {
    return {
      form: {
        // img_path: "assets/image/product-image/6.jpg"
      },
    }
  },
  methods: {
    open(str) {
      if (this.form.name === 'ikun') {
        ElMessage({
          message: str,
          type: 'success',
        })

      } else {
        ElMessage({
          message: '非ikun登录',
          type: 'warning',
        })
      }
    }
  }
}
/*
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
 */
</script>

