<!-- element-ui -->
<template>
  <div class="element-ui">
    <h1>element-ui demo</h1>
    <ul class="list">
      <li class="item">
        <el-input
          placeholder="我是一个input"
          class="content"
          v-model="inputVal"
          @focus="inputFocus"
          clearable
        >
          <!-- <i slot="prefix" class="el-input__icon el-icon-date"></i> -->
          <i slot="suffix" class="el-input__icon el-icon-date"></i>
          <!-- <i slot="prepend" class="el-input__icon el-icon-date"></i> -->
          <!-- <i slot="append" class="el-input__icon el-icon-date"></i> -->
        </el-input>
        <span class="content-txt">{{inputVal}}</span>
      </li>
      <li class="item">
        <el-autocomplete
          v-model="autocompleteVal"
          :fetch-suggestions="querySearch"
          @select="autocompleteFn"
          clearable
        ></el-autocomplete>
      </li>
      <li class="item">
        <el-autocomplete
          popper-class="my-autocomplete"
          v-model="autocompleteVal"
          :fetch-suggestions="querySearch"
          @select="autocompleteFn"
        >
          <template slot-scope="scope">
            <div class="name">{{ scope.item.value }}</div>
            <span class="addr">{{ scope.item.address }}</span>
          </template>
        </el-autocomplete>
      </li>
      <li class="item">
        <el-radio v-model="radioVal" label="1">选项1</el-radio>
        <el-radio v-model="radioVal" label="2">选项2</el-radio>
        <el-radio v-model="radioVal" label="3">选项3</el-radio>
        <p>{{radioVal}}</p>
      </li>
      <li class="item">
        <el-radio-group v-model="radioVal2">
          <el-radio label="11">选项1</el-radio>
          <el-radio label="22">选项2</el-radio>
          <el-radio label="33">选项3</el-radio>
        </el-radio-group>
        <p>{{radioVal2}}</p>
      </li>
      <li class="item">
        <el-radio-group v-model="radioVal3">
          <el-radio-button label="111">选项111</el-radio-button>
          <el-radio-button label="222">选项222</el-radio-button>
          <el-radio-button label="333">选项333</el-radio-button>
        </el-radio-group>
        <p>{{radioVal3}}</p>
      </li>
      <li class="item">
        <el-radio v-model="radioVal4" label="1111" border>选项1</el-radio>
        <el-radio v-model="radioVal4" label="2222" border>选项2</el-radio>
        <el-radio v-model="radioVal4" label="3333" border>选项3</el-radio>
        <p>{{radioVal4}}</p>
      </li>
      <li class="item">
        <el-select v-model="selectVal" filterable :filter-method="filterMethodFn">
          <el-option label="选项1" value="1111"></el-option>
          <el-option label="选项5" value="5555"></el-option>
          <el-option label="选项4" value="4444"></el-option>
          <el-option label="选项3" value="3333"></el-option>
          <el-option label="选项2" value="2222"></el-option>
        </el-select>
      </li>
      <li class="item">
        <el-select v-model="selectVal2" filterable remote :remote-method="remoteMthodFn">
          <el-option label="选项1" value="1111"></el-option>
          <el-option label="选项5" value="5555"></el-option>
          <el-option label="选项4" value="4444"></el-option>
          <el-option label="选项3" value="3333"></el-option>
          <el-option label="选项2" value="2222"></el-option>
        </el-select>
      </li>
      <li class="item">
        <el-checkbox-group v-model="checkboxVal">
          <el-checkbox label="选项1"></el-checkbox>
          <el-checkbox label="选项2"></el-checkbox>
          <el-checkbox label="选项3"></el-checkbox>
          <el-checkbox label="选项4"></el-checkbox>
        </el-checkbox-group>
        {{checkboxVal}}
      </li>
      <li class="item">
        <el-checkbox
          :indeterminate="isIndeterminate"
          v-model="checkboxAll"
          @change="handleCheckAll"
        >全选</el-checkbox>
        <el-checkbox-group v-model="checkboxVal2" @change="handleCheck">
          <el-checkbox label="选项1">111</el-checkbox>
          <el-checkbox label="选项2">222</el-checkbox>
          <el-checkbox label="选项3">333</el-checkbox>
          <el-checkbox label="选项4">444</el-checkbox>
        </el-checkbox-group>
      </li>
      <li class="item">
        <el-date-picker
          v-model="datePickerVal"
          type="datetime"
          placeholder="选择日期时间"
          :picker-options="pickerOptions1"
        ></el-date-picker>
      </li>
      <li class="item">
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          drag
          :on-preview="handlePreview"
          :on-success="handleSuccess"
          :on-remove="handleRemove"
          :on-progress="handleProgress"
          :on-change="handleChange"
          :before-upload="handleBeforeUpload"
          :before-remove="handleBeforeRemove"
        ></el-upload>
      </li>
      <li class="item">
        <el-table :data="tableData" stripe>
          <el-table-column fixed prop="date" label="日期"></el-table-column>
          <el-table-column prop="name" label="姓名"></el-table-column>
          <el-table-column prop="address" label="地址"></el-table-column>
        </el-table>
      </li>
      <li class="item">
        <el-pagination
          layout="sizes,prev,pager,next"
          :page-sizes="[10, 20, 30, 40, 50, 60, 70, 80]"
          :page-size="10"
          :total="1000"
        ></el-pagination>
      </li>
      <li class>
        <el-pagination layout="total,prev,pager, next" :total="1000"></el-pagination>
      </li>
      <li class="item">
        <el-pagination layout="jumper,prev, pager, next" :total="1000"></el-pagination>
      </li>
      <li class="item">
        <el-pagination
          :hide-on-single-page="pageNumer"
          layout="sizes, total, prev, pager, next, slot, jumper"
          :page-sizes="[100, 200, 300]"
          :page-size="100"
          :total="1000"
          @current-change="onCurrentChange"
          @size-change="onSizeChange"
        >
          <template :slot-scope="scope">
            <el-button>wo</el-button>
          </template>
        </el-pagination>
      </li>
      <li class="item">
        <el-button @click="showDialog">dialog1</el-button>
        <el-dialog
          title="提示"
          :visible.sync="visibleDialog"
          :close-on-click-modal="true"
          @open="onbeforeOpenDialog"
          @opened="onOpen"
          @closed="onClose"
        >
          <!-- <h2 slot="title">标题</h2> -->
          <p>我是dialog</p>
          <div slot="footer">
            <el-button @click="visibleDialog = false">确定</el-button>
            <el-button @click="visibleDialog = false">取消</el-button>
          </div>
        </el-dialog>
      </li>
      <li class="item">
        <div class="carousel-wrap">
          <el-carousel height="200px"
            :autoplay="false"
            arrow="always"
            type="card"
            indicator-position="none"
            direction="horizontal"
          >
            <el-carousel-item
              v-for="item of 4"
              :key="item"
              :label="item"
            >
              <h3 class="carousel-txt">{{ item }}</h3>
            </el-carousel-item>
          </el-carousel>
        </div>
      </li>
      <li class="item">
        <el-collapse accordion>
          <el-collapse-item>
                    <template slot="title">
      一致性 Consistency<i class="header-icon el-icon-info"></i>
    </template>
    <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
    <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
          </el-collapse-item>
        </el-collapse>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
import { setTimeout, clearInterval } from "timers";
export default {
  data() {
    return {
      inputVal: "",
      autocompleteVal: "",
      radioVal: "",
      radioVal2: "",
      radioVal3: "",
      radioVal4: "",
      selectVal: "",
      selectVal2: "",
      checkboxVal: [],
      checkboxAll: false,
      checkboxVal2: [],
      isIndeterminate: false,
      datePickerVal: "",
      curTime: new Date(),
      pickerOptions1: {
        disabledDate: this.isDisabledDate
      },
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      pageNumer: true,
      visibleDialog: false
    };
  },

  components: {},

  computed: {},

  mounted() {},

  methods: {
    inputFocus(e) {
      console.log(e);
    },
    querySearch(queryString, cb) {
      cb([
        { value: "三全鲜食（北新泾店）", address: "长宁区新渔路144号" },
        {
          value: "Hot honey 首尔炸鸡（仙霞路）",
          address: "上海市长宁区淞虹路661号"
        },
        {
          value: "新旺角茶餐厅",
          address: "上海市普陀区真北路988号创邑金沙谷6号楼113"
        },
        { value: "泷千家(天山西路店)", address: "天山西路438号" },
        {
          value: "胖仙女纸杯蛋糕（上海凌空店）",
          address: "上海市长宁区金钟路968号1幢18号楼一层商铺18-101"
        },
        { value: "贡茶", address: "上海市长宁区金钟路633号" },
        {
          value: "豪大大香鸡排超级奶爸",
          address: "上海市嘉定区曹安公路曹安路1685号"
        },
        {
          value: "茶芝兰（奶茶，手抓饼）",
          address: "上海市普陀区同普路1435号"
        },
        { value: "十二泷町", address: "上海市北翟路1444弄81号B幢-107" },
        { value: "星移浓缩咖啡", address: "上海市嘉定区新郁路817号" },
        { value: "阿姨奶茶/豪大大", address: "嘉定区曹安路1611号" },
        { value: "新麦甜四季甜品炸鸡", address: "嘉定区曹安公路2383弄55号" },
        {
          value: "Monica摩托主题咖啡店",
          address: "嘉定区江桥镇曹安公路2409号1F，2383弄62号1F"
        },
        {
          value: "浮生若茶（凌空soho店）",
          address: "上海长宁区金钟路968号9号楼地下一层"
        },
        { value: "NONO JUICE  鲜榨果汁", address: "上海市长宁区天山西路119号" },
        { value: "CoCo都可(北新泾店）", address: "上海市长宁区仙霞西路" },
        {
          value: "快乐柠檬（神州智慧店）",
          address: "上海市长宁区天山西路567号1层R117号店铺"
        },
        {
          value: "Merci Paul cafe",
          address: "上海市普陀区光复西路丹巴路28弄6号楼819"
        },
        {
          value: "猫山王（西郊百联店）",
          address: "上海市长宁区仙霞西路88号第一层G05-F01-1-306"
        },
        { value: "枪会山", address: "上海市普陀区棕榈路" },
        { value: "纵食", address: "元丰天山花园(东门) 双流路267号" },
        { value: "钱记", address: "上海市长宁区天山西路" },
        { value: "壹杯加", address: "上海市长宁区通协路" },
        {
          value: "唦哇嘀咖",
          address: "上海市长宁区新泾镇金钟路999号2幢（B幢）第01层第1-02A单元"
        },
        { value: "爱茜茜里(西郊百联)", address: "长宁区仙霞西路88号1305室" },
        {
          value: "爱茜茜里(近铁广场)",
          address:
            "上海市普陀区真北路818号近铁城市广场北区地下二楼N-B2-O2-C商铺"
        },
        {
          value: "鲜果榨汁（金沙江路和美广店）",
          address: "普陀区金沙江路2239号金沙和美广场B1-10-6"
        },
        {
          value: "开心丽果（缤谷店）",
          address: "上海市长宁区威宁路天山路341号"
        },
        { value: "超级鸡车（丰庄路店）", address: "上海市嘉定区丰庄路240号" },
        { value: "妙生活果园（北新泾店）", address: "长宁区新渔路144号" },
        { value: "香宜度麻辣香锅", address: "长宁区淞虹路148号" },
        {
          value: "凡仔汉堡（老真北路店）",
          address: "上海市普陀区老真北路160号"
        },
        { value: "港式小铺", address: "上海市长宁区金钟路968号15楼15-105室" },
        { value: "蜀香源麻辣香锅（剑河路店）", address: "剑河路443-1" },
        { value: "北京饺子馆", address: "长宁区北新泾街道天山西路490-1号" },
        {
          value: "饭典*新简餐（凌空SOHO店）",
          address: "上海市长宁区金钟路968号9号楼地下一层9-83室"
        },
        {
          value: "焦耳·川式快餐（金钟路店）",
          address: "上海市金钟路633号地下一层甲部"
        },
        { value: "动力鸡车", address: "长宁区仙霞西路299弄3号101B" },
        { value: "浏阳蒸菜", address: "天山西路430号" },
        { value: "四海游龙（天山西路店）", address: "上海市长宁区天山西路" },
        {
          value: "樱花食堂（凌空店）",
          address: "上海市长宁区金钟路968号15楼15-105室"
        },
        { value: "壹分米客家传统调制米粉(天山店)", address: "天山西路428号" },
        {
          value: "福荣祥烧腊（平溪路店）",
          address: "上海市长宁区协和路福泉路255弄57-73号"
        },
        {
          value: "速记黄焖鸡米饭",
          address: "上海市长宁区北新泾街道金钟路180号1层01号摊位"
        },
        { value: "红辣椒麻辣烫", address: "上海市长宁区天山西路492号" },
        {
          value: "(小杨生煎)西郊百联餐厅",
          address: "长宁区仙霞西路88号百联2楼"
        },
        { value: "阳阳麻辣烫", address: "天山西路389号" },
        {
          value: "南拳妈妈龙虾盖浇饭",
          address: "普陀区金沙江路1699号鑫乐惠美食广场A13"
        }
      ]);
    },
    autocompleteFn(e) {
      console.log(e);
    },
    filterMethodFn(e) {
      console.log(e);
    },
    remoteMthodFn(e) {
      console.log(e);
    },
    handleCheck(e) {
      this.isIndeterminate =
        this.checkboxVal2.length > 0 && this.checkboxVal2.length < 4;
      this.checkboxAll = this.checkboxVal2.length === 4;
    },
    handleCheckAll(e) {
      this.checkboxVal2 = this.checkboxAll
        ? ["选项1", "选项2", "选项3", "选项4"]
        : [];
    },
    isDisabledDate(picker) {
      return new Date(picker) < this.curTime;
    },
    handlePreview(e) {
      console.log(e, "上传预览");
    },
    handleSuccess(e) {
      console.log(e, "上传成功");
    },
    handleRemove(e) {
      console.log(e, "删除已上传文件");
    },
    handleProgress(e) {
      console.log(e, "上传进度");
    },
    handleChange(e) {
      console.log(e, "change");
    },
    handleBeforeUpload(e) {
      console.log(e, "上传之前");
    },
    handleBeforeRemove(e) {
      console.log(e, "删除之前");
    },
    onCurrentChange(index) {
      console.log(index);
    },
    onSizeChange(index) {
      console.log(index);
    },
    showDialog() {
      this.visibleDialog = true;
    },
    onbeforeOpenDialog(e) {
      console.log("打开-before");
    },
    onOpen(e) {
      console.log("打开");
    },
    onCloseBefore(e) {
      console.log("关闭之前");
    },
    onClose(e) {
      console.log("关闭");
    }
  }
};
</script>
<style lang='sass' type="text/sass" rel="stylesheet/sass">
    .list
        padding-left: 100px;
        padding-right: 100px;
        .item 
            margin: 40px auto;
            display: flex;
            .content 
                width: 400px;
            .content-txt 
                display: block;
                flex: 1;
                max-width: 400px;
                overflow: hidden;
            .carousel-wrap 
              width: 400px;
              margin: 0 auto;
              border: 1px solid #000;
              .carousel-txt 
                font-size: 100px;
                line-height: 200px;
                background: green;
                color: #fff;
                text-align: center;
    .my-autocomplete
      .addr 
        font-size: 12px;
</style>