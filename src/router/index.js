import { createRouter, createWebHistory } from 'vue-router'
import OshPage from '../views/OshPage.vue'
import PpPage from '../views/PpPage.vue'
import PortfolioLayout from '../layouts/PortfolioLayout.vue' // Создадим новый компонент

const routes = [
    {
        path: '/',
        name: 'Home',
        component: OshPage, // Теперь главная - это портфолио
        meta: { isMainPortfolio: true }
    },
    {
        path: '/osh',
        name: 'OSH',
        component: OshPage,
        meta: { isSpecialPage: true }
    },
    {
        path: '/PP',
        name: 'PP',
        component: PpPage,
        meta: { isSpecialPage: true }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router