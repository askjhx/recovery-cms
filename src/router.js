import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter)
import workLog from './views/workLog/index.vue'
import workLogAdd from './views/workLog/import.vue'
const routes =[
    { path: '/workLog', component: workLog},
    // { path: '/workLog/add', component: workLogAdd}
]
const router= new VueRouter({
    routes
})

export default router