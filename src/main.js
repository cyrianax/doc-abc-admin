import '@/assets/styles/global.scss'

import { createApp } from 'vue'
import router from './routes'
import component from './components'
// import { util } from './utils'

import App from './App.vue'

const app = createApp(App)

app.use(router)
app.use(component)
// app.use(util)

app.mount('#app')