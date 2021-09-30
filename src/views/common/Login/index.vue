<template>
  <div class="page-login">
    <div class="login-container">
      <div class="logo">
        <span>My</span><span>API</span>
      </div>
      <div class="form" v-if="state.switchUser" @keyup.enter="handler.setEmail">
        <input placeholder="请输入登录邮箱" v-model="state.email"/>
      </div>
      <div class="form" v-else @keyup.enter="handler.login">
        <div class="form-label">
          <app-icon name="user-circle" class="form-icon" @click="handler.switchEmail"/>
          <p>{{state.email}}</p>
        </div>
        <input type="password" placeholder="请输入登录密码" v-model="state.password"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import storage from '@/utils/storage'
import model from './model'

const router = useRouter()
const route = useRoute()

const state = reactive({
  switchUser: !storage.lastLogin,
  email: storage.lastLogin,
  password: ''
})

const handler = {
  setEmail () {
    state.switchUser = !state.email
  },
  switchEmail () {
    state.email = ''
    state.switchUser = true
  },
  async login () {
    const result = await model.login({
      email: state.email,
      password: state.password,
    })
    if (result) {
      storage.lastLogin = state.email
      storage.token = result.token
      storage.user = result
      router.push('/')
    }
  }
}
defineExpose({
  state,
  handler
})
</script>

<style lang="scss" scoped>
@font-face {
  font-family: generica;
  src: url('@/assets/fonts/generica/Generica.otf');
}

@font-face {
  font-family: generica-bold;
  src: url('@/assets/fonts/generica/Generica Bold.otf');
}

.page-login {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  &::after {
    content: '';
    display: block;
    position: fixed;
    z-index: 1;
    width: 100%;
    height: 100%;
    background: url('@/assets/images/login.jpg');
    background-size: cover;
    filter: grayscale(100%) brightness(20%);
  }

  .login-container {
    display: flex;
    z-index: 2;
    .logo {
      font-size: 48px;
      margin-right: 48px;
      color: #fff;

      >span {
        &:first-child {
          font-family: generica;
        }
        &:last-child {
          font-family: generica-bold;
        }
      }
    }

    .form {
      display: flex;
      justify-content: center;
      flex-direction: column;

      .form-label {
        display: flex;
        
        align-items: center;
        margin-bottom: 8px;

        .form-icon {
          margin-right: 8px;
          fill: rgba(255,255,255,0.7);
          font-size: 20px;
          cursor: pointer;
          &:hover {
            fill: rgba(255,255,255,0.9);
          }
        }
        p {
          color: rgba(255,255,255,0.5);
          font-size: 14px;
        }
      }

      >input {
        border: 1px solid $border-gray;
        height: 32px;
        border-radius: 3px;
        background: rgba(255, 255, 255, 0.1);
        padding: 0 4px;
        color: #fff;
        width: 240px;

        &:focus {
          border: 1px solid $border-green;
        }
      }
    }
  }
}
</style>