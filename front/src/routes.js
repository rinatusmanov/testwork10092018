import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);



import WorkerList from './components/WorkerList';
import WorkerAdd from './components/WorkerAdd';
import WorkerEdit from './components/WorkerEdit';
import E404 from './components/E404';



import {store} from './store';

const routes = [
	{
		path: '',
		// redirect: {name: 'WorkerList'},
		component: WorkerList
	},
	{
        name: 'WorkerList',
		path: 'WorkerList',
		component: WorkerList
	},
	{
        name: 'WorkerEdit',
		path: '/WorkerEdit/:id',
		component: WorkerEdit,
        beforeEnter(from, to, next){
            store.dispatch('worker/editWorker',{
                surname:"", 
                name:"", 
                patronymic:"",
                items:[],
                itogo:0,    
            });
            next();
        }
	},
	{
		path: '*',
		component: E404
	},
];

export const router = new VueRouter({
	routes,
	mode: 'history'
});