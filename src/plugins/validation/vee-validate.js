import Vue from 'vue';
import {
    ValidationObserver,
    ValidationProvider,
    extend,
    localize,
    setInteractionMode
} from 'vee-validate';
import en from 'vee-validate/dist/locale/pt_BR.json';
import * as rules from 'vee-validate/dist/rules';

Object.keys(rules).forEach(rule => {
    extend(rule, rules[rule]);
});

extend('senha', {
    validate: value => {
        let expression = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!#%*?&]{8,}$');
        return expression.test(value);
    },
    message: 'O campo senha deve ter uma letra maiúscula, uma letra minúscula, um número e um caractere especial (@$!%#?&)',
});

extend('horario',{
    validate: value => {
        let reg = new RegExp('^([01]?[0-9]|2[0-3]):[0-5][0-9]$');
        let time  = reg.exec(value);
        if (time != null) {
            return true;
        }
        return false;
    },
    message: 'O horário informado é inválido',
});

extend('data_nascimento', {
    validate: value => {
        let exploded = value.split('/');
        let date = +new Date(exploded[2], exploded[1],
            exploded[0]);
        let idade = ~~((Date.now() - date) / (31557600000));

        if (idade >= '18') {
            return true;
        }
        return false;
    },
    message: 'Você deve ter no mínimo 18 anos para se cadastrar',
});

extend('cpf', {
    validate: value => {
        let doc = value.replace(/[^\d]+/g, '');

        if (doc == '00000000000') {
            return false;
        }

        let r, i, n;
        let s = 0;

        for (i = 1; i <= 9; i++) {
            s = s + parseInt(doc[i - 1]) * (11 - i);
        }

        r = (s * 10) % 11;

        if ((r == 10) || (r == 11)) {
            r = 0;

        }

        if (r != parseInt(doc[9])) {
            return false;
        }

        s = 0;

        for (i = 1; i <= 10; i++) {
            s = s + parseInt(doc[i - 1]) * (12 - i);
        }

        r = (s * 10) % 11;

        if ((r == 10) || (r == 11)) {
            r = 0;
        }

        if (r != parseInt(doc[10])) {
            return false;
        }

        return true;
    },
    message: 'O CPF informado é inválido',
});

extend('cnpj', {
    validate: value => {
        let doc = value.replace(/[^\d]+/g, '');

        let b = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
        let i, n;

        for (i = 0, n = 0; i < 12; n += doc[i] * b[++i]) ;
        if (doc[12] != (((n %= 11) < 2) ? 0 : 11 - n)) {
            return false;
        }

        for (i = 0, n = 0; i <= 12; n += doc[i] * b[i++]) ;
        if (doc[13] != (((n %= 11) < 2) ? 0 : 11 - n)) {
            return false;
        }

        return true;
    },
    message: 'O CNPJ informado é inválido',
});

setInteractionMode('eager')
localize('en', en);

Vue.component('validation-observer', ValidationObserver);
Vue.component('validation-provider', ValidationProvider);


