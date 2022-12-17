import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VueParticlesBg from "particles-bg-vue";
import VueConfetti from 'vue-confetti';
import Particles from "particles.vue";
import VueCryptojs from 'vue-cryptojs'
import VuePapaParse from 'vue-papa-parse'


Vue.config.productionTip = false
Vue.use(VueParticlesBg);
Vue.use(VueConfetti);
Vue.use(Particles);
Vue.use(VueCryptojs);
Vue.use(VuePapaParse);

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
