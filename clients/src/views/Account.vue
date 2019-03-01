<template>
  <div id="Account">
    <el-form class="fl">
      <!-- :model="searchTimes" -->
      <el-form-item class="inline-block">时间筛选：
        <el-date-picker type="datetime" placeholder="选择开始时间"></el-date-picker>
        <!-- v-model="searchTimes.searchStart" -->
        &nbsp;&nbsp;——&nbsp;&nbsp;
        <!-- v-model="searchTimes.searchEnd" -->
        <el-date-picker type="datetime" placeholder="选择结束时间"></el-date-picker>
      </el-form-item>

      <el-button
        type="primary"
        class="inline-block"
        style="margin-left:30px;"
        icon="el-icon-search"
        @click="searchTimeDatas()"
      >搜索</el-button>
    </el-form>
    <!-- 添加按钮 -->
    <el-button
      v-if="user.management == '管理员'"
      type="primary"
      class="add-btn"
      @click="addDatas"
      icon="el-icon-plus"
    >添加</el-button>
    <!-- 表格 -->
    <el-table :data="tableData" style="width: 100%;text-align:center;" border sort>
      <el-table-column label="序号" align="center" type="index" width="70"></el-table-column>
      <el-table-column label="创建时间" width="260" prop="date" align="center">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.date}}</span>
        </template>
      </el-table-column>
      <el-table-column label="收支类型" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.types}}</span>
        </template>
      </el-table-column>
      <el-table-column label="收支描述" align="center" width="180">
        <template slot-scope="scope">
          <span>{{scope.row.details}}</span>
        </template>
      </el-table-column>
      <el-table-column label="收入" align="center">
        <template slot-scope="scope">
          <span style="color:#67C23A">{{scope.row.income}}</span>
        </template>
      </el-table-column>
      <el-table-column label="支出" align="center">
        <template slot-scope="scope">
          <span style="color:#F56C6C">{{scope.row.expend}}</span>
        </template>
      </el-table-column>
      <el-table-column label="账户现金" align="center">
        <template slot-scope="scope">
          <span style="color:#409EFF">{{scope.row.account}}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" width="200" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.remarks}}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="user.management == '管理员'" label="操作" align="center" width="155">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="warning"
            icon="edit"
            @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            icon="delete"
            @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="fy-page">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="pages.current_page"
        :layout="pages.layout"
        :total="pages.total"
        :page-size="pages.page_size"
        :page-sizes="pages.page_sizes"
      ></el-pagination>
    </div>

    <!-- 弹窗 -->
    <el-dialog :title="popupTitle" :visible.sync="dialogFormVisible" width="30%">
      <el-form>
        <el-form-item label="收支类型" :label-width="formLabelWidth">
          <el-input v-model="popUpData.types" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="收支描述" :label-width="formLabelWidth">
          <el-input v-model="popUpData.details" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="收入" :label-width="formLabelWidth">
          <el-input v-model="popUpData.income" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="支出" :label-width="formLabelWidth">
          <el-input v-model="popUpData.expend" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="账户现金" :label-width="formLabelWidth">
          <el-input v-model="popUpData.account" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="popUpData.remarks" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="submitEdit()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "account",
  data() {
    return {
      searchTimes: {
        searchStart: "",
        searchEnd: ""
      },
      pages: {
        layout: " sizes, prev, pager, next, jumper",
        total: 1,
        current_page: 1,
        page_size: 10,
        page_sizes: [5, 10]
      },
      filterLabelData: [],
      dialogFormVisible: false,
      formLabelWidth: "100px",
      popUpData: {},
      popupTitle: "",
      addAndEditFlag: false // 添加弹出层和修改弹出层统一提交按钮的状态
    };
  },
  computed: {
    ...mapGetters({
      user: "user",
      tableData: "labelDatas"
    })
  },
  methods: {
    // 修改按钮
    handleEdit(index, row) {
      this.popUpData = JSON.parse(JSON.stringify(row));
      this.dialogFormVisible = true; // 弹出层
      this.popupTitle = "编辑";
      this.addAndEditFlag = true; // 按钮状态
    },
    // 删除按钮
    handleDelete(index, row) {
      this.$axios
        .post(`/api/profile/delete`, { id: row._id })
        .then(res => {
          if (res.data.flag == 1) {
            this.$store.commit("delLabelDatas", res.data.data);
            this.pageInit();
            this.$message({
              showClose: true,
              type: "success",
              message: `${res.data.msg}`
            });
          } else {
            this.$message({
              showClose: true,
              type: "error",
              message: `${res.data.msg}`
            });
          }
        })
        .catch(err => console.log(err));
    },
    // 提交修改
    submitEdit() {
      if (this.addAndEditFlag) {
        this.editPost(); // 调用修改方法
      } else {
        this.AddPost(); // 添加方法
      }
      this.dialogFormVisible = false; // 关闭弹出层
    },
    // 关闭修改
    cancel() {
      this.dialogFormVisible = false; // 弹出层关闭
      this.addAndEditFlag = false; // 按钮状态
    },
    // 修改请求方法
    editPost() {
      let {
        account,
        details,
        expend,
        income,
        remarks,
        types,
        _id
      } = this.popUpData;
      // 请求数据
      this.$axios
        .post("/api/profile/edit", {
          account,
          details,
          remarks,
          types,
          expend,
          income,
          id: _id
        })
        .then(res => {
          if (res.data.flag == 1) {
            this.$store.commit("getLabelDatas", res.data.data);
            this.$message({
              showClose: true,
              type: "success",
              message: `${res.data.msg}`
            });
            this.addAndEditFlag = false; // 按钮状态
          } else {
            this.$message({
              showClose: true,
              type: "error",
              message: `${res.data.msg}`
            });
            this.addAndEditFlag = false; // 按钮状态
          }
        })
        .catch(err => console.log(err));
    },
    AddPost() {
      this.$axios.post("/api/profile/add", this.popUpData).then(res => {
        if (res.data.flag == 1) {
          this.$store.commit("addLabelDatas", res.data.data);
          this.filterLabelData = JSON.parse(JSON.stringify(res.data.data));
          this.pageInit();
          this.$message({
            showClose: true,
            type: "success",
            message: `${res.data.msg}`
          });
        } else {
          this.$message({
            showClose: true,
            type: "error",
            message: `${res.data.msg}账户、支出、收入必须是数字！`
          });
        }
      });
    },
    addDatas() {
      this.popUpData = {};
      this.dialogFormVisible = true;
      this.popupTitle = "添加";
    },
    // 时间筛选
    // 该功能维护  --> 心情好在开放
    searchTimeDatas() {
      this.$message({
        showClose: true,
        type: "info",
        message: `该功能维护！心情好在开放~`
      });
      // if (!this.searchTimes.searchStart || !this.searchTimes.searchEnd) {
      //   this.$store.commit("getLabelDatas", this.filterLabelData);
      // } else {
      //   const startTime = this.searchTimes.searchStart.getTime();
      //   const EndTime = this.searchTimes.searchEnd.getTime();
      //   const searchResult = this.tableData.filter(item => {
      //     const profileDate = new Date(item.date).getTime();
      //     return profileDate >= startTime && profileDate <= EndTime;
      //   });
      //   this.pageInit();
      //   this.$store.commit("getLabelDatas", searchResult);
      // }
    },
    // 分页
    handleSizeChange(page_size) {
      this.pages.current_page = 1;
      this.pages.page_size = page_size;
      const fyDatas = this.filterLabelData.filter((item, index) => {
        return index < this.pages.page_size;
      });
      this.$store.commit("getLabelDatas", fyDatas);
    },
    handleCurrentChange(page) {
      let index = this.pages.page_size * (page - 1);
      let nums = this.pages.page_size * page;

      let tabels = [];

      for (let i = index; i < nums; i++) {
        if (this.filterLabelData[i]) {
          tabels.push(this.filterLabelData[i]);
        }
        this.$store.commit("getLabelDatas", tabels);
      }
    },
    pageInit() {
      this.pages.total = this.tableData.length;
      this.pages.page_size = 10;
      const fyDatas = this.filterLabelData.filter((item, index) => {
        return index < this.pages.page_size;
      });
      this.$store.commit("getLabelDatas", fyDatas);
    }
  },
  created() {
    this.$axios.post("/api/profile/getAll").then(res => {
      if (res.data.flag == 1) {
        this.$store.commit("getLabelDatas", res.data.data);
        this.filterLabelData = JSON.parse(JSON.stringify(res.data.data)); // 深拷贝处理
        // this.filterLabelData = Array.from(res.data.data); // es6 新出的数组专用的深拷贝方法
        this.pageInit();
      } else {
        this.$message({
          showClose: true,
          type: "error",
          message: `${res.data.msg}`
        });
      }
    });
  }
};
</script>

<style scoped lang="stylus">
.add-btn
  margin-bottom 20px
  float right
.fy-page
  position absolute
  bottom 80px
  right 100px
</style>