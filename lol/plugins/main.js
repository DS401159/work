import Vue from 'vue'
import './filter'
import "../styles/index.css";
import Vant from 'vant'

import VueResource from 'vue-resource'
Vue.use(VueResource)

import axios from './axios'
Vue.prototype.$axios=axios

Vue.use(Vant)
