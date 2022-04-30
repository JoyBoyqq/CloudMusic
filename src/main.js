import Vue from 'vue'
import App from './App.vue'
import "@/mobile/flexible"
import "@/styles/reset.css"
import router from "@/router"
import { Tabbar, TabbarItem ,NavBar,Col, Row,Image as VanImage,Cell, CellGroup,Icon,Search,List} from 'vant';
import {recommendMusicAPI, userLoginAPI} from "@/api"

Vue.use(Col);
Vue.use(Row);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(NavBar);
Vue.use(VanImage);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Icon);
Vue.use(Search);
Vue.use(List);
Vue.config.productionTip = false 

async function fn(){
  const res = await recommendMusicAPI()
  console.log(res)
}
fn()

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
