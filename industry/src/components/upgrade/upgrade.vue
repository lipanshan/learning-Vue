<style type="text/css" >
  .up-content{
    padding: 20px;
    position: absolute;
    top:0;left:0;right:0;bottom:0;
    background: #edeef3;
  }
  .up-content>p{
    margin-bottom: 20px;
    color:#333;
  }
  .upleft{
    width:230px;
    display: inline-block;
    text-align: center;
    border-right: 1px dashed #d6d6d6;
  }
  .upright{
    width:460px;
    float:right;
  }
  .upright >p {
    margin: 15px 0;
  }
  .systemUpImg{
    background: url('/static/images/icon.png') no-repeat center center ;
    width: 60px;
    display: inline-block;
    margin:10px 0;
    height: 60px;
    background-position: -40px -550px;
  }
  .fnUpImg{
    background: url('/static/images/icon.png') no-repeat center center ;
    width: 60px;
    display: inline-block;
    height: 60px;
    margin: 10px 0;
    background-position: -40px -424px;
  }
  .up-system{
  }
  .up-system input{
    width:320px;
    height:30px;
  }
  .up-system .at-input__original:hover{
    border:1px solid #C5D9E8
  }
  .up-system .at-input{
    display: inline-block;
  }
  .button-file{
    display: inline-block;
    padding: 0 12px;
    border:1px solid #4381e6;
    color:#4381e6;
    line-height: 30px;
    vertical-align: middle;
    height:30px;
    border-radius: 4px;
    cursor: pointer;
  }
  .upleft small{
    font-size: 10px;
    color:#999;
  }
  .changetitle{
    text-align: right;
    overflow: hidden;
    font-size: 12px;
    width:776px;
    color:#666;
  }
  .pointer{
    cursor: pointer;
  }
  .changetitle .icon{
    font-size: 16px;
  }
  .redmessage{
    float:left;
    color:#ff0000;
    font-size: 12px;
  }
  .hreflink{
    color:#4381e6;
    cursor: pointer;
  }
  .upgroup{
    padding:20px;
    margin: 10px 0 20px 0;
    border-radius: 10px;
    cursor: pointer;
    border: 1px solid #fff;
    background: #fff;
    width:776px;
    overflow: hidden;
    box-shadow: 0 0 3px #999;
  }
  .upgroup.active{
    border:1px solid #94b5ed;
  }
  .upgroup.active .systemUpImg{
    background-position: -163px -550px;
  }
  .upgroup.active .fnUpImg{
    background-position: -163px -424px;
  }
  .upleft  .lefttitle{
    margin-bottom: 10px;
    font-size: 14px;
  }
  .upgroup .red{
    color:#ff0000;
  }
  .w500{
    width: 500px;
    position: relative;
  }
  .loading{
    background: #2688e8;
    width: 60%;
    height:10px;
    border-radius: 10px;
    top:0;
     overflow: hidden;
    position: absolute;

  }
  .loadingbg{
    border-radius: 10px;
    height: 10px;
    width: 100%;
    background: #ddd;
  }
  .animationbg{
    background: linear-gradient(to right,rgba(30,105,237,1) 0%,rgba(232,231,249,.7) 50%, rgba(30,105,237,1) 100%);
    width:200%;
    height:10px;
    animation: myloading 2s infinite;
    border-radius: 10px;
    top:0;
    position: absolute;
    left:-100%;
  }
  .animationbg1{
    background: linear-gradient(to right,rgba(30,105,237,.4) 0%,rgba(232,231,249,.7) 50%, rgba(30,105,237,.4) 100%);
    width:200%;
    height:10px;
    animation: myloading1 2s infinite;
    border-radius: 10px;
    top:0;
    position: absolute;
    left:0%;
  }
  @keyframes myloading{
    0% {left:-100%; }
    100%{left:00%;}
  }
   @keyframes myloading1{
    0% {left:0%; }
    100%{left:100%;}
  }
  .up-system>p{
    display: none;
    color:#ff0000;
    font-size: 12px;
    margin-top: 5px;
  }
  .up-system .at-btn span {
    font-size: 14px;
    display: inline-block;
    line-height: 30px;
    height:30px;
  }
  .up-system .at-btn.errbtn {
    background: #4381e6;
    cursor: pointer;
    border-color:#4381e6;
  }
  .up-system .at-btn {
    cursor: default;
    color:#fff;
    background: rgba(169,195,238);
    border-color:rgba(169,195,238);
    padding:0 12px;
    vertical-align: middle;
    height:30px;line-height: 30px;
  }
  .up-system.errorfile .at-input__original {
    border-color:#ff0000;
  }
  .up-system.errorfile>p{
    display: block;
  }
  #up-mask{
    background: rgba(70,70,70,.9);
    position: fixed;
    top:0;left:0;right:0;bottom:0;
    z-index: 999999;
  }
  #loaddinghide{
    display: none;
  }
  #up-mask #loaddinghide{
    display: block;
    position: absolute;
    top:50%;left:50%;
    margin-left:-250px;
  }
  .error-icon{
    background: url('/static/images/icon.png') no-repeat center center;
    background-position: 0 -19px;
    display: inline-block;
    width:14px;height:14px;
    vertical-align: text-bottom;
    margin-right: 5px;
  }
  .icon-down{
    display: inline-block;width: 16px;height:16px;
    background:  url('/static/images/icon.png') no-repeat center center;
    background-position: 0 -62px;
    vertical-align: text-bottom;
    margin:0 5px;
  }
  .icon-on{
    display: inline-block;width: 16px;height:16px;
    background:  url('/static/images/icon.png') no-repeat center center;
    background-position: 0 -42px;
    vertical-align: text-bottom;
    margin:0 5px;
  }
  .changetitle .pointer:hover .icon-down{
    background-position: 0 -84px;
  }
  .changetitle .pointer:hover .icon-on{
    background-position: 0 -106px;
  }
  .uptext{
    margin-top:20px;
    position: absolute;
    top:50%;
    left:50%;
    width:100px;
    margin-left:-50px;
    font-size: 12px;
    color:#fff;
  }
  .close{
    position: fixed;
    right:20px;top:20px;
    width:30px;height:30px;
    display: block;
    background:  url('/static/images/icon.png') no-repeat center center;
    background-position: -409px -298px;
    cursor: pointer;
  }
</style>

<template>
  <div class="up-content">
    <p>可通过更新规则库或应用升级保持系统为最新版本</p>
    <div class="upgroup"  @click="cur('gz')" :class="{'active':current==false}">
      <div class="upleft">
        <div class="systemUpImg"></div>
        <p class="lefttitle">规则库升级</p>
        <p><small>上次升级: 19-01-01 17:30</small></p>
      </div>
      <div class="upright">
        <p>当前版本：2.1.1 <span v-if="update">发现新版本,<span class="hreflink" @click="upload('on')">立即在线升级</span></span></p>
        <p><i class="red">*</i>手动离线升级</p>
        <div class="up-system"  :class="{'errorfile':lfile==false}">
          <at-input readonly   :value="library"   placeholder="升级包仅支持“.zip”格式"></at-input>
          <label class="button-file">
            <input type="file" id="up-library" class="hide"   ref="library"   v-on:change="changefile"  />浏览
          </label>
          <at-button :class="{'errbtn':lerr==true}"  @click="upload('off',lerr,'lerr')">上传</at-button>
          <p><i class="error-icon"></i>升级包格式错误</p>
        </div>
      </div>
    </div>
    <p class="changetitle" v-show="down"  ><span class="pointer"  @click="changeshow">展开更多选项 <i class="icon-down"></i></span></p>
    <div class="upgroup" v-show="!down" @click="cur('yy')" :class="{'active':current==true}">
      <div class="upleft">
        <div class="fnUpImg"></div>
        <p class="lefttitle">应用升级</p>
        <p><small>上次升级: 19-01-01 17:30）</small></p>
      </div>
      <div class="upright">
        <p>当前版本：2.1.1 <span v-if="update">发现新版本,<span class="hreflink" @click="upload('on')">立即在线升级</span></span></p>
        <p><i class="red">*</i>手动离线升级</p>
        <div class="up-system"  :class="{'errfile':afile==true}">
          <at-input readonly :value="apply" placeholder="升级包仅支持“.zip”格式"></at-input>
          <label class="button-file">
            <input type="file" id="up-apply" class="hide" ref="apply" v-on:change="changefile"   />浏览
          </label>
          <at-button :class="{'errbtn':aerr==true}" @click="upload('off',aerr,'aerr')">上传</at-button>
        </div>
      </div>
    </div>
    <p class="changetitle" v-show="!down"><span class="redmessage">温馨提示：不建议对应用进行升级。</span><span class="pointer"  @click="changeshow">收起更多选项 <i class="icon-on"></i></span></p>
    <div id="loaddinghide">
      <div class="close" @click="close"></div>
      <div class="w500">
        <p class="loadingbg"></p>
        <div class="loading"><p class="animationbg"></p><p class="animationbg1"></p></div>
      </div>
      <div class="uptext">
        {{ uptext }}
      </div>
    </div>
  </div>
  
</template>

<script>
  export default {
    data () {
      return {
        current:false, 
        ress:60,
        lerr:false,
        lfile:true,
        aerr:false,
        afile:true,
        down:true,
        errorfile:false,
        update:true,
        apply:'',
        library:'',
        uptext:''
      }
    },mounted () {
    },
    methods:{
      changefile(e){
        if(e.target.id == 'up-library'){
          if(this.$refs.library.value.split('.')[1] == 'zip'   ||this.$refs.library.files[0].type=='application/zip'){
            this.library = this.$refs.library.files[0].name;
            this.lfile = true;
            this.lerr = true;
          }else{
            this.lerr = false;
            this.lfile = false;
          }
        }else{
          if(this.$refs.apply.value.split('.')[1] == 'zip'){
            this.apply = this.$refs.apply.files[0].name;
            this.aerr = true;
            this.afile = true;
          }else{
            this.aerr = false;
            this.afile = false;
          }
        }
      },
      close(){
        this.$router.push({path: '/admin/home'});
        var div = document.getElementById("up-mask");
        div.parentNode.removeChild(div)
        
      },
      changeshow(){
        this.down = this.down==true?false:true
      },cur(el){
        if(el == 'gz'){
          this.current = false
        }else{
          this.current =  true
        }
      },upload(line,el,val){
          const mask = document.getElementById("app");
          const load = document.getElementById("loaddinghide");
          const div = document.createElement('div');
          div.setAttribute('id','up-mask');
        if(line == 'on'){
          div.appendChild(load)
          mask.appendChild(div);
          this.uptext = '正在在线升级...'

        }else{
          if(el == true){
            div.appendChild(load)
            mask.appendChild(div);
            this.uptext = '正在离线升级...'
          
          } 
        }
       
      }
    }
  }
</script>

