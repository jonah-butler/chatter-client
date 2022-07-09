import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import 'tachyons/css/tachyons.min.css';
import './assets/style/globals.css';

createApp(App).use(store).use(router).mount('#app')
