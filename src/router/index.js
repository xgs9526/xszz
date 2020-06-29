import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/pages/Layout' //首页跟我的页面包裹盒子
import Home from '@/pages/Home' //首页
import Name from '@/pages/Name' //我的页面
import Error from '@/pages/Error' //404页面

import Login from '@/pages/Login' //登录
import Register from '@/pages/Register' //注册
import Wjmm from '@/pages/Wjmm' //忘记密码

import Xggrxx from '@/pages/zzdxrd/Xggrxx' //确认身份==个人信息修改==资助对象认定模块
import Sqjl from '@/pages/Sqjl' //历年申请记录
import Xxtz from '@/pages/Xxtz' //消息中心
import Tzxq from '@/pages/Tzxq' //消息详情
import Xgmm from '@/pages/Xgmm' //修改密码
import Sqpp from '@/pages/sqpp' //申请匹配
import Wdzz from '@/pages/Wdzz' //我的资助
import Grzlxg from '@/pages/Grzlxg' //个人信息修改
import TjsqXzlx from '@/pages/TjsqXzlx' //提交申请-自己申请
import GjjxjsqOne from '@/pages/gjjxjsq/GjjxjsqOne' //国家奖学金申请第一步基本信息
import GjjxjsqTwo from '@/pages/gjjxjsq/GjjxjsqTwo' //国家奖学金申请第二步填写信息
import GjjxjsqTjcg from '@/pages/gjjxjsq/GjjxjsqTjcg' //国家奖学金申请成功
import GjlzjxjsqOne from '@/pages/gjlzjxjsq/GjlzjxjsqOne' //国家励志奖学金申请第一步基本信息
import GjlzjxjsqTwo from '@/pages/gjlzjxjsq/GjlzjxjsqTwo' //国家励志奖学金申请第二步填写信息
import GjlzjxjsqTjcg from '@/pages/gjlzjxjsq/GjlzjxjsqTjcg' //国家励志奖学金申请成功
import GjzxjsqOne from '@/pages/gjzxjsq/GjzxjsqOne' //国家助学金申请第一步基本信息
import GjzxjsqTwo from '@/pages/gjzxjsq/GjzxjsqTwo' //国家助学金申请第二步填写信息
import GjzxjsqTjcg from '@/pages/gjzxjsq/GjzxjsqTjcg' //国家助学金申请成功

import Qrsf from '@/pages/Qrsf' //确认身份==个人信息修改
import Tjcg from '@/pages/Tjcg' //确认身份之后提交成功页面
import ListDetail from '@/pages/ListDetail' //列表详情--国家奖学金
import ListDetailtwo from '@/pages/ListDetailtwo' //列表详情--国家励志奖学金
import ListDetailthree from '@/pages/ListDetailthree' //列表详情--国家助学金

import Qrsftwo from '@/pages/zzdxrd/Qrsftwo' //确认身份==资助对象认定模块
import Zzdxrd from '@/pages/zzdxrd/Zzdxrd' //资助对象认定模块提交家庭情况页
import Tjcgthree from '@/pages/zzdxrd/Tjcgthree' //资助对象认定模块提交成功

import Ffxq from '@/pages/ffxq' //发放详情


import LoginAfterWrite from '@/pages/LoginAfterWrite'//登录之后没有确认身份的话填写用户信息

import Knbzsq from '@/pages/trsq/Knbzsq' //困难生生活补助申请
import SureSub from '@/pages/trsq/SureSub' //可以提交困难生活补助

import SelectRole from '@/pages/applyProcess/SelectRole' // 申请人角色选择
import ParentRole from '@/pages/applyProcess/ParentRole' // 家长选择学生
import TeacherRole from '@/pages/applyProcess/TeacherRole' // 老师选择学生

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			component: Layout,
			children: [
			{
				path: '',
				name: 'Home',
				component: Home,
				meta: {
                    login: true,
					title: "浙江省学生资助精准认定平台"
				}
			},
			{
				path: '/name',
				name: 'Name',
				component: Name,
				meta: {
                    login: true,
					title: "我的"
				}
			}
			]

		},
		{
        	path: '/teacherrole',
        	name: 'TeacherRole',
        	component: TeacherRole,
        	meta: {
                // login: true,
        		title: "选择代申请学生"
        	}
        },
		{
        	path: '/parentrole',
        	name: 'ParentRole',
        	component: ParentRole,
        	meta: {
                // login: true,
        		title: "选择代申请学生"
        	}
        },
        {
        	path: '/selectrole',
        	name: 'SelectRole',
        	component: SelectRole,
        	meta: {
                // login: true,
        		title: "申请角色"
        	}
        },
        {
        	path: '/loginafterwrite',
        	name: 'LoginAfterWrite',
        	component: LoginAfterWrite,
        	meta: {
                login: true,
        		title: "确认身份"
        	}
        },
        {
        	path: '/sqpp',
        	name: 'Sqpp',
        	component: Sqpp,
        	meta: {
                login: true,
        		title: "申请匹配"
        	}
        },
        {
        	path: '/ffxq',
        	name: 'Ffxq',
        	component: Ffxq,
        	meta: {
                login: true,
        		title: "发放详情"
        	}
        },
		{
			path: '/wdzz',
			name: 'Wdzz',
			component: Wdzz,
			meta: {
                login: true,
				title: "我的资助"
			}
		},
		{
			path: '/tjcgthree',
			name: 'Tjcgthree',
			component: Tjcgthree,
			meta: {
                login: true,
				title: "确认身份"
			}
		},
		{
			path: '/zzdxrd',
			name: 'Zzdxrd',
			component: Zzdxrd,
			meta: {
                login: true,
				title: "资助对象认定"
			}
		},
		{
			path: '/listdetail',
			name: 'ListDetail',
			component: ListDetail,
			meta: {
                login: true,
				title: "详情查看"
			}
		},
		{
			path: '/listdetailtwo',
			name: 'ListDetailtwo',
			component: ListDetailtwo,
			meta: {
                login: true,
				title: "详情查看"
			}
		},
		{
			path: '/Listdetailthree',
			name: 'ListDetailthree',
			component: ListDetailthree,
			meta: {
                login: true,
				title: "详情查看"
			}
		},
		{
			path: '/tjcg',
			name: 'Tjcg',
			component: Tjcg,
			meta: {
                login: true,
				title: "确认身份"
			}
		},
        {
        	path: '/gjzxjsqjbxx',
        	name: 'GjzxjsqOne',
        	component: GjzxjsqOne,
        	meta: {
                login: true,
        		title: "国家助学金申请"
        	}
        },
        {
        	path: '/gjzxjsqqtxx',
        	name: 'GjzxjsqTwo',
        	component: GjzxjsqTwo,
        	meta: {
                login: true,
        		title: "国家助学金申请"
        	}
        },
		{
			path: '/knbzsq',
			name: 'Knbzsq',
			component: Knbzsq,
			meta: {
		        login: true,
				title: "困难生生活补助申请"
			}
		},
		{
			path: '/suresub',
			name: 'SureSub',
			component: SureSub,
			meta: {
		        login: true,
				title: "困难生生活补助申请"
			}
		},
        {
        	path: '/gjzxjsqtjcg',
        	name: 'GjzxjsqTjcg',
        	component: GjzxjsqTjcg,
        	meta: {
                login: true,
        		title: "提交成功"
        	}
        },
        {
        	path: '/gjlzjxjsqjbxx',
        	name: 'GjlzjxjsqOne',
        	component: GjlzjxjsqOne,
        	meta: {
                login: true,
        		title: "国家励志奖学金申请"
        	}
        },
        {
        	path: '/gjlzjxjsqqtxx',
        	name: 'GjlzjxjsqTwo',
        	component: GjlzjxjsqTwo,
        	meta: {
                login: true,
        		title: "国家励志奖学金申请"
        	}
        },
        {
        	path: '/gjlzjxjsqtjcg',
        	name: 'GjlzjxjsqTjcg',
        	component: GjlzjxjsqTjcg,
        	meta: {
                login: true,
        		title: "提交成功"
        	}
        },
        {
        	path: '/gjjxjsqjbxx',
        	name: 'GjjxjsqOne',
        	component: GjjxjsqOne,
        	meta: {
                login: true,
        		title: "国家奖学金申请"
        	}
        },
        {
        	path: '/gjjxjsqqtxx',
        	name: 'GjjxjsqTwo',
        	component: GjjxjsqTwo,
        	meta: {
                login: true,
        		title: "国家奖学金申请"
        	}
        },
        {
        	path: '/gjjxjsqtjcg',
        	name: 'GjjxjsqTjcg',
        	component: GjjxjsqTjcg,
        	meta: {
                login: true,
        		title: "提交成功"
        	}
        },
        {
        	path: '/xzlx',
        	name: 'TjsqXzlx',
        	component: TjsqXzlx,
        	meta: {
                login: true,
        		title: "提交申请"
        	}
        },
        {
        	path: '/tzxq',
        	name: 'Tzxq',
        	component: Tzxq,
        	meta: {
                login: true,
        		title: "通知"
        	}
        },
        {
        	path: '/xxtz',
        	name: 'Xxtz',
        	component: Xxtz,
        	meta: {
                login: true,
        		title: "消息中心"
        	}
        },
		{
			path: '/grzlxg',
			name: 'Grzlxg',
			component: Grzlxg,
			meta: {
                login: true,
				title: "个人资料修改"
			}
		},
		{
			path: '/qrsf',
			name: 'Qrsf',
			component: Qrsf,
			meta: {
                login: true,
				title: "确认身份"
			}
		},
		{
			path: '/qrsftwo',
			name: 'Qrsftwo',
			component: Qrsftwo,
			meta: {
                login: true,
				title: "资助对象认定"
			}
		},
		{
			path: '/xggrxx',
			name: 'Xggrxx',
			component: Xggrxx,
			meta: {
                login: true,
				title: "修改个人信息"
			}
		},
		{
			path: '/sqjl',
			name: 'Sqjl',
			component: Sqjl,
			meta: {
                login: true,
				title: "历年申请记录"
			}
		},
		{
			path: '/login',
			name: 'Login',
			component: Login,
			meta: {
				title: "登录"
			}
		},
        {
        	path: '/register',
        	name: 'Register',
        	component: Register,
        	meta: {
        		title: "注册"
        	}
		},
		{
        	path: '/xgmm',
        	name: 'Xgmm',
        	component: Xgmm,
        	meta: {
        		title: "修改密码"
        	}
		},
		{
        	path: '/wjmm',
        	name: 'Wjmm',
        	component: Wjmm,
        	meta: {
        		title: "忘记密码"
        	}
        },
		{
			path: '/error',
			name: 'Error',
			component: Error,
			meta: {
                login: true,
				title: "找不到页面了"
			}
		},
		{
			path: '*',
			redirect: '/error'
		}
	]
})
