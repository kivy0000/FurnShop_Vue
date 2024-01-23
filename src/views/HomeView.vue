<template>
  <div>

    <!--  增加按钮和搜索框  -->
    <div style="margin:10px 5px"><!-- 按钮-->
      <!--  添加方法    -->
      <el-button type="primary" @click="add">新增</el-button>
      <el-button type="button" @click="open('功德+1')">来都来了，点一下吧</el-button>
    </div>

    <div style="margin:20px 5px"><!--搜索框-->
      <el-input style="width: 30%"
                v-model="search"
                autosize
                placeholder="请输入关键字"
      />
      <el-button type="primary" @click="list">查询</el-button>
    </div>

    <el-table :data="tableData" stripe style="width: 1310px;height: 70%">
      <el-table-column sortable prop="id" label="ID" width="140"/>
      <el-table-column prop="img_path" label="照片" width="140">
        <template #default="scope">
          <el-image style="width: 40px; height: 40px" v-bind:src="require('@/assets/6.jpg')"/>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="家具名称"/>
      <el-table-column prop="maker" label="厂商"/>
      <el-table-column prop="price" label="单价" width="140"/>
      <el-table-column prop="sales" label="销量" width="140"/>
      <el-table-column prop="stock" label="库存" width="140"/>

      <el-table-column fixed="right" label="操作" width="140">
        <template #default="scope"><!--点击可以#default="scope"获取数据-->
          <el-button link type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <!--    删除确认  不能用click，要用confim    -->
          <el-popconfirm title="哇真的要删吗?" @confirm="deleteFurn(scope.row.id)">
            <template #reference>
              <el-button size="small" type="danger">删除</el-button>
            </template>
          </el-popconfirm>
          <!-- <el-button link type="primary" size="small" @click="deleteFurn(scope.row)">删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>

    <!--  新增弹窗，在div内  -->
    <el-dialog title="编辑" v-model="dialogVisible" width="30%">
      <!--   表单   -->
      <el-form :model="form" label-width="120px" :rules="rules" ref="form">

        <el-form-item label="家具" prop="name">
          <el-input v-model="form.name" style="width: 80%"></el-input>
          <!--     后端的验证信息     -->
          {{ errorMsg.name }}
        </el-form-item>
        <el-form-item label="厂商" prop="maker">
          <el-input v-model="form.maker" style="width: 80%"></el-input>
          {{ errorMsg.maker }}
        </el-form-item>
        <el-form-item label="单价" prop="price">
          <el-input v-model="form.price" style="width: 80%"></el-input>
          {{ errorMsg.price }}
        </el-form-item>
        <el-form-item label="销量" prop="sales">
          <el-input v-model="form.sales" style="width: 80%"></el-input>
          {{ errorMsg.sales }}
        </el-form-item>
        <el-form-item label="库存" prop="stock">
          <el-input v-model="form.stock" style="width: 80%"></el-input>
          {{ errorMsg.stock }}
        </el-form-item>
        <!--        <el-form-item label="样式图">-->
        <!--          <el-input v-model="form.imgPath" style="width: 80%"></el-input>-->
        <!--        </el-form-item>-->
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false;open2('不添加你点什么？？？')">取消</el-button>
          <el-button type="primary" @click="save">确 定</el-button>
          <!--          <el-button type="primary" @click="save();open('哥哥收到了家具，并向你扔了一个篮球')">确 定</el-button>-->
        </span>
      </template>
    </el-dialog>

    <!--  分页组件  -->
    <div style="margin: 10px 0">
      <!--    调用方法更改页码后，更新页面      -->
      <el-pagination
          @size-change="handlePageSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5,10,15,666]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
//引入axios对象
import request from "@/utils/request";
import {ElMessage} from 'element-plus'


export default {
  name: "HomeView",
  components: {},
  data() {
    return {
      errorMsg: {},
      currentPage: 1,
      pageSize: 5,
      total: 10,
      search: '',
      clickNum: 0,
      dialogVisible: false,
      loading: false,
      form: {
        // img_path: "assets/image/product-image/6.jpg"
      },
      tableData: [{
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
        img_path: '../assets/logo.jpg'
      }],
      rules: {
        name: [
          //对名字的校验规则
          {required: true, message: "请输入家居名", trigger: "blur"}
        ],
        maker: [
          //校验规则
          {required: true, message: "请输入厂商名", trigger: "blur"}
        ],
        price: [
          //校验规则
          {required: true, pattern: /^([1-9]\d*|0)(\.\d+)?$/, message: "请输入单价", trigger: "blur"},
        ],
        sales: [
          //校验规则
          {required: true, message: "请输入当前销量", trigger: "blur"},
          {pattern: /^([1-9]\d*|0)$/, message: "请输入当前销量", trigger: "blur"}
        ],
        stock: [
          //校验规则
          {required: true, message: "请输入当前库存", trigger: "blur"},
          {pattern: /^([1-9]\d*|0)$/, message: "请输入当前库存", trigger: "blur"}
        ],

      }
    }
  },
  // 初始化钩子函数，不在method里面
  created() {
    this.list();

  },
  methods: {
    add() {
      this.dialogVisible = true
      this.form = {}
      //清除检验规则
      this.$nextTick(() => {
        //清除前端检验规则
        this.$refs['form'].resetFields()
      })
      //清除后端校验规则
      this.errorMsg = {}
    },
    save() {//保存数据/修改数据(通过判断id是否为空)
      //查看是否通过验证
      this.$refs['form'].validate((valid) => {
            //如果验证通过,进行添加/修改判断
            if (valid) {
              if (this.form.id) {//有id，更新
                request.put("/api/update", this.form).then(
                    res => {
                      //刷新数据
                      this.list()
                      //判断是否成功
                      if (res.code === 200) {
                        this.open("哥哥已帮你更新成功")
                      } else {
                        this.open("你干嘛！哥哥更新失败")
                      }
                      this.dialogVisible = false

                    }
                )
              } else {
                request.post("/api/save", this.form).then(res => {
                  //提交之后，判断响应码
                  if (res.code === 200) {
                    //成功，业务代码200
                    this.dialogVisible = false
                    //提示信息
                    this.open('哥哥收到了家具，并向你扔了一个篮球')
                    //刷新数据
                    this.list()
                  } else if (res.code === 400) {
                    //失败，业务代码400
                    this.errorMsg.name = res.extend.errors.name
                    this.errorMsg.maker = res.extend.errors.maker
                    this.errorMsg.price = res.extend.errors.price
                    this.errorMsg.sales = res.extend.errors.sales
                    this.errorMsg.stock = res.extend.errors.stock
                  }
                })
              }
            } else {
              this.open2("格式不正确，请检查")
            }
          }
      )


    },
    //弹窗
    open(str) {
      ElMessage({
        message: str,
        type: 'success',
      })
    },//弹窗2
    open2(str) {
      ElMessage({
        message: str,
        type: 'warning',
      })
    }, open3(str) {
      ElMessage({
        message: str,
        type: 'error',
      })
    },
    //获取所有家具,分页
    /* request.get("/api/furns").then(res => {
        console.log("res - ", res)
        //使用拦截器进行res=res.data
        this.tableData = res.extend.furns
      }) */
    //分页查询家具
    list() {
      request.get("/api/furnsByConditionPage", {
        params: {
          pageNum: this.currentPage,//当前页
          pageSize: this.pageSize,//每页多少条
          search: this.search //查询条件
        }
      }).then(res => {
            this.tableData = res.extend.pageInfo.list

            if (res.extend.pageInfo.total === 0) {
              if (this.clickNum > 1) {
                this.open3('妹找着,别点了')
              } else {
                this.open2('妹找着')
              }
              this.clickNum = this.clickNum + 1
            }
            this.total = res.extend.pageInfo.total
          }
      )
    },
    //更改每页显示条数,点击时会携带参数
    handlePageSizeChange(pageSize) {
      this.pageSize = pageSize
      this.list()
    },
    //更改第几页
    handleCurrentChange(pageNum) {
      this.currentPage = pageNum
      this.list()
    },

    //修改的方法
    handleEdit(row) {
      console.log("row", row)
      // 将传递过来的proxy对象转换为json对象
      this.form = JSON.parse(JSON.stringify(row))
      //打开弹窗
      this.dialogVisible = true
    },
    //删除的方法
    deleteFurn(id) {
      console.log("id", id)
      //拼接url，发送请求
      request.delete("/api/delete/" + id).then(res => {
        //更新列表
        this.list()
        //判断是否成功
        if (res.code === 200) {
          this.open("你终于删掉我了，从此......")
        } else {
          this.open("你干嘛！删除失败")
        }
      })
    }
  }

}
</script>
