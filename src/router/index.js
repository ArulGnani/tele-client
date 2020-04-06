import Vue from 'vue'
import VueRouter from 'vue-router'
import loginPage from '../views/login-page'
import MainPage from '../views/main-page'

Vue.use(VueRouter)

  const routes = [
  {
    path : '/',
    name : 'loginPage',
    component : loginPage
  },
  {
    path : "/main",
    name : "mainPage",
    component : MainPage
  }
  
]

const router = new VueRouter({
  routes
})

export default router
