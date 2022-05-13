import Vue from 'vue';
import App from './layouts/default.vue'
import Vuetify from './plugins/vuetify.plugin';
import routes from './routes';
import './plugins/validation/vee-validate.js';

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
// FIREBASE
//-----------------------------------------------------------------------------/
import {initializeApp} from "firebase/app";
import {getDatabase, ref, set} from "firebase/database";

const config = {
    apiKey: "AIzaSyCnFwlBXu5WTvFPFjWGyK_oahDBXFUYRW4",
    authDomain: "transcorreplus-a7ded.firebaseapp.com",
    databaseURL: "https://transcorreplus-a7ded-default-rtdb.firebaseio.com/",
    projectId: "transcorreplus-a7ded",
    storageBucket: "transcorreplus-a7ded.appspot.com",
    messagingSenderId: "869956711585",
    appId: "1:869956711585:web:ebed29126e305e8c852ce0"
};

const app = initializeApp(config);
const db = ref(getDatabase(app), 'auth');

class firebase {
    getAll() {
        return db;
    }

    static create(value, name) {
        return set(ref(getDatabase(app), name), value);
    }

    update(key, value) {
        return db.child(key).update(value);
    }

    delete(key) {
        return db.child(key).remove();
    }

    deleteAll() {
        return db.remove();
    }
}

Vue.prototype.$firebase = firebase


new Vue({
    router,
    vuetify: Vuetify,
    render: (h) => h(App),
}).$mount('#app');
