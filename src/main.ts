/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

import { createPinia } from 'pinia'


// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'

// Easy Data Table Registration
import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';

const app = createApp(App).use(createPinia())
app.component('EasyDataTable', Vue3EasyDataTable);

registerPlugins(app)

app.mount('#app')
