// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import "babel-polyfill"
import router from './router'
import '../static/public.css'
import cookie from '@/common/cookie'
import dateFormat from '@/common/dateFormat'
import Vant from 'vant'
import 'vant/lib/index.css'
import Es6Promise from 'es6-promise'
Es6Promise.polyfill()

Vue.prototype.$cookie = cookie;
Vue.prototype.$http = axios;
Vue.prototype.$dateFormat = dateFormat;

Vue.config.productionTip = false;


Vue.use(Vant);



//全局路由钩子配置title和登录进入
router.beforeEach(function(to, from, next) {
    let token = cookie.get(isCookieName);

    if(to.meta.login){
        if (to.meta.title) {
            document.title = to.meta.title;
        }
    	if(token){
    		axios.defaults.headers.get['token'] = token;
    		axios.defaults.headers.post['token'] = token;
    		next();
    	}else{
    		// next('/login');
            router.replace('/login');
    	}
    }else{
    	next();
    }

})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    if(response.data.result == 2){
		cookie.delete(isCookieName);
    	setTimeout(function(){
			router.replace('/login');
    	},1000)
    }
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });






/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: {
        App
    },
    template: '<App/>'
})
