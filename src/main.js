import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import router from './router'
import store from './store'
import dateFilter from './filters/date.filter'
import localizeFilter from './filters/localize.filter'
import currencyFilter from './filters/currency.filter'
import Paginate from 'vuejs-paginate'
import tooltipDirective from './directives/tooltip.derective'
import messagePlugin from './utils/message.plugin'
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min'
import Loader from './components/app/Loader'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false
Vue.use(messagePlugin)
Vue.use(Vuelidate)
Vue.directive('tooltip', tooltipDirective)
Vue.filter('date', dateFilter)
Vue.filter('currency', currencyFilter)
Vue.filter('localize', localizeFilter)
Vue.component('Loader', Loader)
Vue.component('Paginate', Paginate)

firebase.initializeApp({
  apiKey: 'AIzaSyAabFBNTzsBgj4oUafE7P9HKkhA9nDxYmg',
  authDomain: 'vue-crm-vmc.firebaseapp.com',
  projectId: 'vue-crm-vmc',
  storageBucket: 'vue-crm-vmc.appspot.com',
  messagingSenderId: '10343981513',
  appId: '1:10343981513:web:bf53f7b22d46026dbe8818',
  measurementId: 'G-68BNBY4HVS',
})
let app

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount('#app')
  }
})
