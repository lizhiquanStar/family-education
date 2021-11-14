import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Container from '../layout/container'
import CertificationRoutes from '../views/certification/index.route'
import PersonalCenterRoutes from '../views/personal-center/index.route'
import MessageCenterRoutes from '../views/message-center/index.route'
import HomeRoutes from '../views/home/index.route'
const containerRoute = {
  path: '/container',
  component: Container,
  children: [...HomeRoutes, ...MessageCenterRoutes, ...PersonalCenterRoutes]
}
const routes: Array<RouteRecordRaw> = [
  ...CertificationRoutes,
  containerRoute,
  {
    path: '/:catchAll(.*)',
    redirect: '/home'
  }
]

export default createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
