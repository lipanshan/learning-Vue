<template>
  <div class="formoverall">
    <top-header  @triggerBackClick="goback" :title="titleTxt" :backBtn="backBtn"></top-header>
    <el-form :model="cfirmform" @validate="validateForm"  :rules="rules" ref="cfirmform" label-width="160px" class="contentlist  ">
      <el-form-item class="form-wrap" label="厂商名称" >
        <el-col :span="10">
          <el-input :disabled='true'  v-model="manufacturer_name" placeholder="" :title="manufacturer_name"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item class="form-wrap" label="学员认证数量" >
        <el-col :span="10">
          <el-input :disabled='true'  v-model="trainee_number" placeholder=""></el-input>
        </el-col>
      </el-form-item>
      <el-form-item class="form-wrap" label="厂商技术认证" >
        <el-col :span="10">
          <el-input :disabled='true'  v-model="technology" placeholder=""></el-input>
        </el-col>
      </el-form-item>
      <el-form-item class="form-wrap" label="厂商服务认证" >
        <el-col :span="10">
          <el-input :disabled='true'  v-model="service" placeholder=""></el-input>
        </el-col>
      </el-form-item>
      <el-form-item class="form-wrap" label="厂商认证星级" >
        <el-col :span="10">
          <el-input :disabled='true' class="backgroundstar" :class="'star'+star_level"   placeholder=""></el-input>
        </el-col>
      </el-form-item>
      <el-form-item class="form-wrap" label="商务联系人" prop="contacts">
        <el-col :span="10">
          <el-input  :disabled='true'  v-model="cfirmform.contacts" placeholder=""></el-input>
        </el-col>
      </el-form-item>
      <el-form-item class="form-wrap" label="联系方式 (手机号)" prop="mobile">
        <el-col :span="10">
          <el-input  :disabled='true'  v-model="cfirmform.mobile" placeholder=""></el-input>
        </el-col>
      </el-form-item>
      <el-form-item class="form-wrap" label="员工认证" prop="userlist">
      </el-form-item>
    </el-form>
    <div class="certificate viewcer">
      <el-table  ref="moviesTable"  
          :data="tableData "
           style="width:100%"  
           :header-cell-style="tableRowStyle" 
           :cell-style="tableRowStyle" 
           >
          <el-table-column prop="trainee_name" align="left" min-width="140" label="姓名"></el-table-column>
          <el-table-column prop="trainee_sex"   align="center"   label="性别" min-width="100"></el-table-column>
          <el-table-column prop="cer_name" label="证书类型"  min-width="200"></el-table-column>
          <el-table-column prop="period" label="参加培训期数"   min-width="100" align="center"></el-table-column>
          <el-table-column prop="mobile" label="联系方式" align="center" min-width="100"></el-table-column>
        </el-table>
           <my-pagination @pagenumchange="handleCurrentChange"
           :totalNumber="total"
           :pageSize="pagesize"
           :pageNumber="currentPage"></my-pagination>
    </div>
  </div>
</template>

<script>
import topHeader from '@/components/content-header'
import myPagination from '@/components/custompagination'
import { GetManufInfo ,  GetListByManuId  } from '@/api/certificateaxios'
export default {
  data () {
    return {
      titleTxt:"查看厂商信息",
      backBtn: {
        name: '返回列表',
        icon: 'back-icon',
        className: 'back-btn'
      },
      rules:{
      },
      pagesize:10,
      currentPage:1,
      total:0,
      manufacturer_name:'',
      trainee_number:"",
      technology:'',
      service:'',
      star_level:'',
      cfirmform:{
        contacts:"",
        mobile:""
      },
      tableData:[ ]
      
    }
  },
  created () {
    this.getInfo(this.$route.query.id)
    this.GetUserList({
      pageIndex: this.currentPage,
      manufId:this.$route.query.id,
      pageSize: this.pagesize
    })
  },
  components: {
    topHeader,
    myPagination
  },
  filters:{
  },
  methods: {
    goback(){
      this.$router.push({path: '/admin/firmCertificate'})
    },
    validateForm(e,result){
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.GetUserList({
        pageIndex: val,
        manufId:this.$route.query.id,
        pageSize: this.pagesize
      })
    },
     tableRowStyle({row,rowIndex}){
      return 'padding:  0;height: 40px'
    },
    getInfo(uid){
      let _this = this
      GetManufInfo(uid).then((res) => {
        if (res.ret === 200) {
          const arr = ['未通过','初级','中级','高级'];
          arr.map(function(value,index){
            if(index == res.data.technology){_this.technology = arr[index]}
          })
          arr.map(function(value,index){
            if(index == res.data.service){_this.service = arr[index]}
          })
          _this.manufacturer_name = res.data.manufacturer_name
          _this.trainee_number = res.data.trainee_number
          _this.star_level = res.data.star_level
          _this.cfirmform.contacts = res.data.contacts
          _this.cfirmform.mobile = res.data.mobile

        } else {
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    GetUserList(data){
      let _this = this
      GetListByManuId(data).then((res) => {
        if (res.ret === 200) {
          let datalist = res.data.list
            res.data.list.map(function(value,index){
              if(value.trainee_sex == 2 ){datalist[index].trainee_sex ="女"}
              if(value.trainee_sex == 1 ){datalist[index].trainee_sex ="男"}
            })
          this.total = parseInt(res.data.count)
          this.tableData = datalist
        } else {
        }
      }).catch((err) => {
        console.log(err)
      })
    },
  }
}
</script>

<style lang="sass" type="text/css" rel="stylesheet/sass" scoped>
.backgroundstar
  position: relative
.backgroundstar::before
  content: ""
  position: absolute
  height: 20px
  top: 4px
  left: 15px
  background: url('../../assets/images/star.png') no-repeat left center
.backgroundstar.star1::before
  width: 14px
.backgroundstar.star2::before
  width: 28px
.backgroundstar.star3::before
  width: 42px
.backgroundstar.star4::before
  width: 60px
.backgroundstar.star5::before
  width: 73px
</style>
