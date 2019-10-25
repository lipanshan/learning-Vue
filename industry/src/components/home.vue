<template>
  <div class="home">
    <div class="chart-row1">
      <router-link tag="div" :to="{path: `/${attackUrl}`, query: {riskType: 0}}" class="chart-type1">
        <div class="icon"><i class="radar"></i></div>
        <div class="txt">
          <h1>威胁命中警告</h1>
          <p class="subtitle" ><span :class="{'w': attackUnit}">{{attack}}</span></p>
        </div>
      </router-link>
      <router-link tag="div" :to="{path: `/${attackUrl}`,query: {riskType: 1}}" class="chart-type2">
        <div class="txt"><span>TCP</span></div>
        <h2 ><span :class="{'w': tcpUnit}" >{{tcp}}</span></h2>
      </router-link>
      <router-link tag="div" :to="{path: `/${attackUrl}`,query: {riskType: 2}}" class="chart-type2">
        <div class="txt"><span>UDP</span></div>
        <h2 ><span :class="{'w': udpUnit}">{{udp}}</span></h2>
      </router-link>
      <router-link tag="div" :to="{path: `/${attackUrl}`,query: {riskType: 3}}" class="chart-type2">
        <div class="txt"><span>ICMP</span></div>
        <h2 ><span :class="{'w': icmpUnit}" >{{icmp}}</span></h2>
      </router-link>
    </div>
    <div class="chart-row2">
      <h2>网卡流量数据</h2>
      <div class="chart" ref="lineChartWrap"></div>
    </div>
    <div class="chart-row3">
      <div class="cpu-chart" >
        <h2>CPU</h2>
        <div class="cpu" ref="cpuChartWrap">
        </div>
      </div>
      <div class="harddisk-chart">
        <h2>硬盘</h2>
        <div class="harddisk" ref="harddiskChartWrap">
        </div>
      </div>
      <div class="memory-chart">
        <h2>内存</h2>
        <div class="memory" ref="memoryChartWrap">
        </div>
      </div>
    </div>
    <div class="info-wrap">
      <div class="status"><span class="title">授权状态：</span><span class="subtitle">{{authorizeInfo.authorizeType}}</span></div>
      <div class="code"><span class="title">设备激活码：</span><span class="subtitle">{{authorizeInfo.equipmentNumber}}</span></div>
      <div class="time"><span class="title">有效期:</span><span class="subtitle">{{authorizeInfo.termOfValidity.split('--')[0]}}<span class="line">至</span>{{authorizeInfo.termOfValidity.split('--')[1]}}</span></div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import {mapGetters, mapActions} from 'vuex'
import {getData, getNetWordData} from '@/api/home'
export default {
  name: 'home',
  data () {
    return {
      attack: 0,
      tcp: 0,
      udp: 0,
      icmp: 0,
      attackUnit: false,
      tcpUnit: false,
      udpUnit: false,
      icmpUnit: false,
      inputXdata: [],
      inputData: [],
      outputData: [],
      cpu: {},
      harddisk: [],
      memory: [],
      echarts1: null,
      echarts2: null,
      echarts3: null,
      echarts4: null,
      timer: null,
      timer2: null,
      maxAmount: 0,
      count: 0,
      resizeTimer: null,
      query: {
        condition: 0,
        keyword: '',
        riskType: 0,
        startTime: new Date().format('yyyy-MM-dd'),
        endTime: new Date().format('yyyy-MM-dd'),
        pageIndex: 0
      }
    }
  },
  created () {
  },
  mounted () {
    this.$nextTick(() => {
      this.echarts1 = echarts.init(this.$refs.lineChartWrap)
      this.echarts1.showLoading()
      this.echarts2 = echarts.init(this.$refs.cpuChartWrap)
      this.echarts2.showLoading()
      this.echarts3 = echarts.init(this.$refs.harddiskChartWrap)
      this.echarts3.showLoading()
      this.echarts4 = echarts.init(this.$refs.memoryChartWrap)
      this.echarts4.showLoading()
      this.getInfo()
      this.getNetWord()
      window.onresize = () => {
        clearTimeout(this.resizeTimer)
        this.resizeTimer = setTimeout(() => {
          this.echartResize()
        }, 400)
      }
    })
  },
  beforeDestroy () {
    clearTimeout(this.timer)
    clearTimeout(this.timer2)
    this.timer = null
    this.timer2 = null
    this.$nextTick(() => {
      window.onresize = null
    })
  },
  computed: {
    attackUrl () {
      if (this.leftMenu.length) {
        const menuItem = this.leftMenu.find((item) => item.id === '2').subset.find((item) => item.id === '3')
        return menuItem.pathUrl
      }
      return ''
    },
    ...mapGetters([
      'leftMenu',
      'authorizeInfo'
    ])
  },
  methods: {
    getInfo () {
      getData().then((res) => {
        if (res.ret === 200) {
          this.attack = res.data.ThreatWarningNum
          this.attackUnit = res.data.ThreatWarningNumUnit
          this.tcp = res.data.ToTCPNum
          this.udp = res.data.ToUDPNum
          this.icmp = res.data.ToICMPNum
          this.tcpUnit = !!res.data.ToTCPNumUnit
          this.udpUnit = !!res.data.ToUDPNumUnit
          this.icmpUnit = !!res.data.ToICMPNumUnit
          this.formatChart(res.data)
        } else if (res.ret === 499) {
          this.$router.push({path: '/login'})
        }
      }).catch((msg) => {
        console.log(msg)
      })
    },
    lineChart () {
      const that = this
      // 基于准备好的dom，初始化 echarts 实例并绘制图表。
      this.echarts1.setOption({
        animationEasing: 'cubicOut',
        legend: {
          show: true,
          icon: 'line',
          x: 'right',
          padding: [10, 200, 0, 0]
        },
        title: {
          text: '吞吐量',
          textStyle: {
            color: '#666',
            fontSize: '12px'
          }
        },
        color: ['#fec08f', '#fe4543'],
        grid: {
          left: '4%',   // 与容器左侧的距离
          right: '4%' // 与容器右侧的距离
        },
        tooltip: {show: false},
        xAxis: {
          axisTick : {show: false},//去掉刻度
          splitLine:{
            show:false
          },
          inverse: true,
          showMinLabel: true,
          showMaxLabel: true,
          data: this.inputXdata,
          axisLabel: {
            interval: this.inputXdata.length - 2,
            rotate: 0,
            formatter: function (value, s) {
              if (s === 0) {
                return ''
              } else {
                return '60秒'
              }
            }
          }
        },
        yAxis: {
          axisTick : {show: false},//去掉刻度
          splitLine:{
            show:true
          },
          position: 'right',
          axisLabel: {
            nameLocation: 'top',
            formatter: (value) => {
              if (value === 0) {
                return 0
              } else {
                return ''
              }
            }
          },
          name: `${this.maxAmount}kbps`
        },
        series: [{
          type: 'line',
          name: '入流量',
          showSymbol: false,
          hoverAnimation: false,
          data: this.inputData
        },
          {
            type: 'line',
            name: '出流量',
            showSymbol: false,
            hoverAnimation: false,
            data: this.outputData
          }]
      })
      this.echarts1.hideLoading()
      this.$nextTick(() => {
        this.setTimeoutFn2()
      })
    },
    lineChart2 () {
      const numArr = []
      this.echarts2.setOption({
        legend: {
          show: true,
          icon: 'line',
          x: 'right',
          padding: [10, 200, 0, 0]
        },
        title: {
          text: '%利用率',
          textStyle: {
            color: '#666',
            fontSize: '12px'
          }
        },
        color: ['#fec08f', '#fe4543'],
        grid: {
          left: '11%',   // 与容器左侧的距离
          right: '13%' // 与容器右侧的距离
        },
        tooltip: {show: false},
        xAxis: {
          axisTick : {show: false},//去掉刻度
          splitLine:{
            show:false
          },
          inverse: true,
          showMinLabel: true,
          showMaxLabel: true,
          data: this.cpu.xdata,
          axisLabel: {
            interval: this.cpu.data.length-2 ,
            rotate: 0,
            formatter: function (value) {
              if (value == 1) {
                return ''
              } else {
                return `${value}秒`
              }
            }
          }
        },
        yAxis: {
          axisTick : {show: false},//去掉刻度
          splitLine:{
            show:true
          },
          position: 'right',
          showMinLabel: true,
          showMaxLabel: true,
          showMaxLabel: true,
          axisLabel: {
            formatter: function (value) {
              numArr.push(value)
              numArr.sort((a, b) => b - a)
              var texts = [];
              if (value == 0) {
                texts.push('0');
              } else if (numArr[0] >= value) {
                texts.push(`${value}%`);
              } else {
                texts.push('');
              }
              return texts;
            }
          }
        },
        series: {
          type: 'line',
          data: this.cpu.data
        }
      })
      this.echarts2.hideLoading()
    },
    pieChart1 () {
      var percent = 0
      this.echarts3.setOption( {
        tooltip: {
          trigger: 'item',
          formatter: "{b}({d}%)"
        },
        color: ['#36b63d', '#f1f1f1'],
        legend: {
          icon: 'rect',
          x: 'left',
          y: 'bottom',
          itemWidth: 12,
          itemHeight: 12,
          formatter: function (d) {
            return d
          }
        },
        series: [
          {
            type:'pie',
            radius: ['60%', '70%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            itemStyle : {  //图形样式
              normal: { //normal 是图形在默认状态下的样式；emphasis 是图形在高亮状态下的样式，比如在鼠标悬浮或者图例联动高亮时。
                label: {  //饼图图形上的文本标签
                  show: true  //平常不显示
                },
                labelLine: {     //标签的视觉引导线样式
                  show: true  //平常不显示
                }
              }
            },
            label:{
              normal:{
                show: false,
                formatter: function (d) {
                  if (/已用/g.test(d.name)) {
                    percent = d.percent
                  }
                  return d.percent
                }
              }
            },
            data: this.harddisk
          }
        ]
      })
      this.echarts3.setOption({
        title: {
          text: `${percent}%`,
          textStyle : {
            fontWeight : 600 ,
            fontSize : 24    //文字的字体大小
          },
          x: 'center',
          y: 'center'
        }
      });
      this.echarts3.hideLoading()
    },
    pieChart2 () {
      let percent = 0
      this.echarts4.setOption( {
        tooltip: {
          trigger: 'item',
          formatter: "{b}({d}%)"
        },
        color: ['#6244e4', '#f1f1f1'],
        legend: {
          icon: 'rect',
          x: 'left',
          y: 'bottom',
          itemWidth: 12,
          itemHeight: 12
        },
        series: [
          {
            type:'pie',
            radius: ['60%', '70%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            label:{
              normal:{
                show: false,
                formatter: function (d) {
                  if (/已用/g.test(d.name)) {
                    percent = d.percent
                  }
                  return d.percent
                }
              }
            },
            data: this.memory
          }
        ]
      })
      this.echarts4.setOption({
        title: {
          text: `${percent}%`,
          textStyle : {
            fontWeight : 600 ,
            fontSize : 24    //文字的字体大小
          },
          x: 'center',
          y: 'center'
        }
      });
      this.echarts4.hideLoading()
    },
    formatChart (data) {
      this.harddisk.splice(0, 2)
      this.memory.splice(0, 2)
      this.harddisk.push({
        value: parseFloat(data.Disk.Used),
        name:`已用:${data.Disk.Used}`
      }, {
        value: parseFloat(data.Disk.Unused),
        name:`未用:${data.Disk.Unused}`,
        itemStyle: {
          emphasis: {color: '#f1f1f1'}
        }
      })
      this.memory.push({
        value: parseFloat(data.Memory.Used),
        name:`已用:${data.Memory.Used}`
      }, {
        value: parseFloat(data.Memory.Unused),
        name:`未用:${data.Memory.Unused}`,
        itemStyle: {
          emphasis: {color: '#f1f1f1'}
        }
      })
      this.cpu = Object.assign({}, {xdata: [], data: []})
      data.CPUArr.forEach((item, index) => {
        this.cpu.data.push(parseFloat(item.UtilizationRate))
        this.cpu.xdata.push(parseFloat(item.second))
      })
      this.lineChart2()
      this.pieChart1()
      this.pieChart2()
      this.setTimeoutFn()
    },
    setTimeoutFn () {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.getInfo()
      }, 30000)
    },
    getNetWord () {
      const that = this
      getNetWordData().then((res) => {
        if (res.ret === 200) {
          this.maxAmount = res.data.MaxAmount
          this.formatChart2(res.data)
          this.lineChart()
        } else if (res.ret === 499) {
          this.$router.push({path: '/login'})
        }
      }).catch((msg) => {
        console.log(msg)
      })
    },
    formatChart2 (data) {
      this.inputXdata.splice(0, this.inputXdata.length)
      this.inputData.splice(0, this.inputData.length)
      this.outputData.splice(0, this.outputData.length)
      let inputXdataArr = []
      let inputDataArr = []
      let outputDataArr = []
      inputXdataArr.push(data.InputArr[0].timestamp)
      for (let i = inputXdataArr.length; i < 60; i++) {
        inputXdataArr.push(new Date(data.InputArr[0].timestamp).getTime() - 1000)
      }
      if (this.count === 0) {
        for (let i = 0; i < 60; i++) {
          outputDataArr.push('')
          inputDataArr.push('')
        }
      } else {
        outputDataArr = this.echarts1.getOption().series[1].data
        inputDataArr = this.echarts1.getOption().series[0].data
      }
      outputDataArr.unshift(data.OutputArr[data.OutputArr.length - 1].amount)
      inputDataArr.unshift(data.InputArr[data.InputArr.length - 1].amount)
      outputDataArr.pop()
      inputDataArr.pop()
      this.inputXdata = inputXdataArr
      this.inputData = inputDataArr
      this.outputData = outputDataArr
      const arr1 = JSON.parse(JSON.stringify(inputDataArr))
      const arr2 = JSON.parse(JSON.stringify(outputDataArr))
      arr1.sort((a, b) => b - a)
      arr2.sort((a, b) => b - a)
      this.maxAmount = Math.max(arr1[0], arr2[0])
      if (this.count < 60) {
        this.count = this.count + 1
      }
    },
    setTimeoutFn2 () {
      clearTimeout(this.timer2)
      this.timer2 = setTimeout(() => {
        this.getNetWord()
      }, 1000)
    },
    echartResize () {
      this.echarts1.resize()
      this.echarts2.resize()
      this.echarts3.resize()
      this.echarts4.resize()
    },
    ...mapActions([
      'setLeftMenu'
    ])
  }
}
</script>

<style lang="sass" type="text/css" rel="stylesheet/sass">
@import '../assets/sass/variable.sass';
@import '../assets/sass/mixin.sass';

@keyframes moveRadar
  0%
    transform: rotateZ(0deg)
  100%
    transform: rotateZ(360deg)

.home
  background-color: $bg-color-l
  .chart-row1
    display: flex
    justify-content: space-between
    .chart-type1,.chart-type2
      background-color: $bg-color-n
      border-radius: 8px
      box-shadow: 2px 2px 10px #eeeff4
      cursor: pointer
    .chart-type1
      display: flex
      flex: 13
      .icon
        display: block
        margin-top: 9px
        margin-bottom: 7px
        padding: 0 26px 0 15px
        border-right: 1px solid $border-color-n
        .radar
          position: relative
          display: block
          width: 78px
          height: 76px
          background: url(../assets/images/radar1.png) no-repeat 0 0
          &::after
            content: ""
            dispaly: block
            position: absolute
            top: 50%
            left: 50%
            width: 72px
            height: 72px
            margin-left: -36px
            margin-top: -36px
            background: url(../assets/images/radar2.png) no-repeat 0 0
            animation: moveRadar 4s linear infinite
      &>.txt
        flex: 1
        &>h1
          position: relative
          margin: 0
          font-size: $font-n
          line-height: 36px
          text-align: center
          &::before
            content: ""
            margin-right: 7px
            display: inline-block
            vertical-align: middle
            width: 16px
            height: 14px
            background: url(../assets/images/radar-icon.png) no-repeat 0 0
        .subtitle
          marign: 2px 0 0
          font-size: $font-lg
          line-height: 54px
          text-align: center
          color: $error
          &>span
            cursor: pointer
            &.w
              &::after
                content: "万"
                margin-left: 3px
                display: inline-block
                vertical-align: bottom
                font-size: $font-n
                line-height: 48px
                color: $error
          &>a
            display: block
    .chart-type2
      margin-left: 10px
      flex: 9
      .txt
        font-size: $font-g
        line-height: 36px
        color: $color-n
        text-align: center
        &::before
          content: ""
          margin-right: 4px
          display: inline-block
          vertical-align: middle
          width: 16px
          height: 16px
          background: url(../assets/images/tcp-icon.png) no-repeat 0 0
      &>h2
        margin: 0
        padding-bottom: 3px
        font-size: $font-lg
        line-height: 54px
        text-align: center
        color: $color-n
        &>span
          cursor: pointer
          &.w
            &::after
              content: "万"
              margin-left: 3px
              display: inline-block
              vertical-align: bottom
              font-size: $font-n
              line-height: 48px
              color: $color-n

.chart-row2
  margin-top: 10px
  padding: 0 20px
  background-color: $bg-color-n
  border-radius: 8px
  &>h2
    margin: 0
    padding-top: 6px
    font-size: $font-l
    line-height: 24px
    color: $color-n
  .chart
    width: 100%
    height: 245px
.chart-row3
  margin-top: 10px
  padding-bottom: 10px
  display: flex
  .cpu-chart
    padding: 0 20px
    flex: 33
    background-color: $bg-color-n
    border-radius: 8px
    &>h2
      margin: 0
      padding-top: 6px
      font-size: $font-l
      line-height: 24px
      color: $color-n
    .cpu
      width: 100%
      height: 272px
  .harddisk-chart,.memory-chart
    margin-left: 10px
    padding: 0 20px
    flex: 20
    background-color: $bg-color-n
    border-radius: 8px
    h2
      margin: 0
      padding-top: 6px
      font-size: $font-l
      line-height: 24px
      color: $color-n
    .memory,.harddisk
      width: 100%
      height: 272px
.info-wrap
  margin-left: -12px
  margin-right: -12px
  padding-left: 15px
  display: flex
  background: $bg-color-n
  color: $color-m
  white-space: nowrap
  .status,.code,.time
    font-size: 0
    overflow: hidden
    margin-right: 22px
    .title
      display: inline-block
      vertical-align: middle
      font-size: $font-n
      line-height: 40px
    .subtitle
      display: inline-block
      vertical-align: middle
      min-width: 188px
      margin-left: 9px
      font-size: $font-n
      line-height: 40px
      .line
        padding-left: 5px
        padding-right: 5px

</style>
