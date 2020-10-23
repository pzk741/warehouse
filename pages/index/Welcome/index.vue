<template>
  <el-table
    :data="loginlog"
    border
    style="width: 100%"
    >
    <el-table-column
      prop="username"
      label="登入账户"
      width="180">
    </el-table-column>
    <el-table-column
      prop="lastLogin.ip"
      label="上次登入ip"
      width="180">
    </el-table-column>
    <el-table-column
      prop="lastLogin.loginTime"
      label="上次登入时间">
    </el-table-column>
    <el-table-column
      prop="nowLogin.ip"
      label="本次登入ip">
    </el-table-column>
    <el-table-column
      prop="nowLogin.loginTime"
      label="本次登入时间">
    </el-table-column>
  </el-table>
</template>
<script>
import { mapState } from "vuex";
  export default {
      computed: {
        ...mapState(['loginlog'])  
      },
      mounted () {
          console.log(this.$store.state.loginlog)
      }
  }
</script>


<style>
.el-table td, .el-table th{
    line-height: 1;
    margin: 0 auto;
    text-align: center !important ;
}
</style>