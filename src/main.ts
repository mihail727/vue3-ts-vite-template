import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from '@/router';
import { middlewareFactoryPlugin } from './plugins';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(middlewareFactoryPlugin);

app.mount('#app');
