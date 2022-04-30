import Vue from "vue";
import VueRouter from "vue-router"
import Home from "@/views/Home"
import Layout from "@/views/Layout"
import Play from "@/views/Play"
import Search from "@/views/Search"


Vue.use(VueRouter)
const routes = [{
    path:'/',
    redirect:'/layout'
},
{
    path:'/layout',
    component:Layout,
    redirect:'/layout/home',
    children:[{
        path:'home',
        component:Home,
        meta:{
            title:"首页",
            name:"home"
        }
    },
    {
        path:'search',
        component:Search,
        meta:{
            title:"搜索",
            name:"search"
        }
    }]
},
{
    path:'/play',
    component:Play
}]
const router = new VueRouter({
    routes
})
export default router