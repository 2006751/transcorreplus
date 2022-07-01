import Vue from 'vue';
import App from './layouts/default.vue'
import Vuetify from './plugins/vuetify.plugin';
import routes from './routes';
import './plugins/validation/vee-validate.js';


import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';


Vue.use(VueSweetalert2);

//---------------------------------------------------------------------------------------------------------------------/
// Vue Router
//---------------------------------------------------------------------------------------------------------------------/
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes,
    scrollBehavior(to, from, savedPosition) {
        return {x: 0, y: 0}
    }
});

//-----------------------------------------------------------------------------/
// VUE THE MASK
//-----------------------------------------------------------------------------/

import {mask} from 'vue-the-mask';

Vue.directive('mask', mask)

//-----------------------------------------------------------------------------/
// FIREBASE
//-----------------------------------------------------------------------------/
import {initializeApp} from "firebase/app";
import {getDatabase, ref, set, onValue, push} from "firebase/database";

const config = {
    apiKey: "AIzaSyC7JGO-OUgTpLT-dwEq-YOLwLrNbP72BLg",
    authDomain: "transcorreplus-aefa0.firebaseapp.com",
    databaseURL: "https://transcorreplus-aefa0-default-rtdb.firebaseio.com/",
    projectId: "transcorreplus-aefa0",
    storageBucket: "transcorreplus-aefa0.appspot.com",
    messagingSenderId: "74402290105",
    appId: "1:74402290105:web:dfcbdbac92195aeb25fe68"
};

const app = initializeApp(config);

class firebase {
    static get(value, path) {
        return onValue(ref(getDatabase(app), path), (response) => response);
    }

    static post(value, name) {
        return push(ref(getDatabase(app), name), value);
    }

    update(key, value) {
        // return db.child(key).update(value);
    }

    delete(key) {
        // return db.child(key).remove();
    }

    deleteAll() {
        // return db.remove();
    }
}

Vue.prototype.$firebase = firebase

new Vue({
    router,
    vuetify: Vuetify,
    render: (h) => h(App),
}).$mount('#app');
