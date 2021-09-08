<template>
  <div class="page-login">
    <div class="login-container">
      <div class="logo">
        <span>My</span><span>API</span>
      </div>
      <div class="form">
        <p>administrator</p>
        <input type="password" placeholder="请输入登录密码" v-model="state.password"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue"

const state = reactive({
  username: 'administrator',
  password: ''
})

defineExpose({
  state
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
      >p {
        color: #fff;
        font-size: 14px;
        margin-bottom: 8px;
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