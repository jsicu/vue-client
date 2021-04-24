<!--
 * @Author: linzq
 * @Date: 2021-03-30 20:55:07
 * @LastEditors: linzq
 * @LastEditTime: 2021-04-24 23:17:52
 * @Description: 
-->
<template>
  <div id="login-container" :style="{'color': color}">
    <h3 id="title">案例演示平台</h3>
    <el-form id="login-form" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
      <el-form-item prop="userName">
        <el-input name="userName" type="text" prefix-icon="el-icon-user" v-model="loginForm.userName" placeholder="用户名"
          @keyup.enter.native="handleLogin" />
      </el-form-item>
      <el-form-item prop="password">
        <el-input name="password" :type="pwdType" prefix-icon="el-icon-lock" v-model="loginForm.password" placeholder="密码"
          @keyup.enter.native="handleLogin">
          <svg-icon slot="suffix" :icon-class="pwdType === 'password' ? 'eye' : 'eye-open'" @click="showPwd" />
          <!-- <i slot="suffix" class="el-input__icon el-icon-open" @click="showPwd" v-if="pwdType === 'password'"></i>
          <i slot="suffix" class="el-input__icon el-icon-view" @click="showPwd" v-else></i> -->
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">
          登录
        </el-button>
      </el-form-item>
      <div id="tips">
        <span v-if="IsNormal">服务器状态：<span :style="{color:'#00ff00', 'font-weight':'bold'}">正常</span></span>
        <span v-else>服务器状态：<span :style="{color:'#ff0000', 'font-weight':'bold'}">异常</span></span>
        <span>延迟：<span :style="{'font-weight':'bold'}">{{commDelay}}</span></span>
      </div>
    </el-form>
    <div v-if=" elegantSentences" id="elegant-sentences">
      <div id="elegant-sentences-content">
        {{elegantSentences.content}}
      </div>
      <div id="elegant-sentences-inscribe">
        —— {{elegantSentences.name}}
      </div>
    </div>
  </div>
</template>


<script>
import { setTimer, touchError } from '@/utils/timer'
import { chooseElegantSentencesLogin } from '@/utils/chooseElegantSentences'
import { JSEncrypt } from 'jsencrypt'
import { rsaEncrypt } from '@/utils/index.js'

export default {
  name: 'loginWidget',
  props: {
    color: {
      default: '#000',
      type: String
    }
  },
  data() {
    return {
      elegantSentences: null,
      commDelay: 0,
      dataBeforeTime: 0,
      IsNormal: false,
      loginForm: {
        userName: 'admin',
        password: 'admin'
      },
      loginRules: {
        userName: [{ required: true, trigger: 'blur' }],
        password: [{ required: true, trigger: 'blur' }]
      },
      loading: false,
      pwdType: 'password'
    }
  },
  computed: {},

  methods: {
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          // window.location.href = 'main.html' // 跳过登录
          this.publicKey()
        } else {
          return false
        }
      })
    },
    async publicKey() {
      // 获取加密公钥
      const res = await this.$api.login.publicKey()
      if (res) {
        this.$wsCache.set('publicKey', res)
        const encrypt = new JSEncrypt()
        encrypt.setPublicKey(res)
        const encrypted = encrypt.encrypt(this.loginForm.password)
        this.$set(this.loginForm, 'password', encrypted)
        this.login()
      }
    },
    async login() {
      //  加密后登录
      try {
        const res = await this.$api.login.login(this.loginForm)
        if (res) {
          this.loading = false
          this.$wsCache.set('userInfo', res)
          window.location.href = 'main.html'
        }
      } catch (error) {
        this.loading = false
      }
    },
    // 服务器可接入测试
    async serverAttachTest() {
      this.dataBeforeTime = new Date().getTime()
      try {
        await this.$api.common.serveTest()
        this.IsNormal = true
        this.commDelay = new Date().getTime() - this.dataBeforeTime + 'ms'
      } catch (error) {
        this.IsNormal = false
        this.commDelay = '--'
      }
    }
  },
  mounted: function () {
    this.elegantSentences = chooseElegantSentencesLogin()
    setTimer(this.serverAttachTest, 1000)
  }
}
</script>

<style scoped>
#login-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  width: 100%;
  position: absolute;
  z-index: 100;
  color: #000;
  background-color: #54444499;
}
#title {
  min-width: 580px;
  font-size: 56px;
  text-align: center;
  font-weight: bold;
}
#login-form {
  max-width: 350px;
  min-width: 250px;
  margin: 0 auto;
  width: 25%;
}
#tips {
  display: flex;
  justify-content: space-between;
}
i {
  color: grey;
}
#elegant-sentences {
  padding-top: 25px;
  margin: 0 auto;
  max-width: 660px;
  min-width: 30%;
}
#elegant-sentences-content {
  width: 100%;
}
#elegant-sentences-inscribe {
  margin-top: 15px;
  width: 100%;
  text-align: right;
}
</style>
