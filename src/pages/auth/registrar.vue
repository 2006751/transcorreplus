<template>
  <section class="screen-index">
    <div class="theme__screen">
      <div class="wrapper">
        <v-card
            elevation="4"
        >
          <v-card-title>Transcorre plus</v-card-title>
          <v-card-text>Registrar conta</v-card-text>
          <div class="v-card__content">
            <validation-observer ref="observer" v-slot="{handleSubmit}">
              <form @submit.prevent="handleSubmit(submit)">
                <div class="grid grid-cols-2 gap-4">
                  <validation-provider
                      name="nome"
                      vid="nome"
                      rules="required"
                      v-slot="{ errors }"
                      tag="div">
                    <v-text-field
                        label="Digite seu nome"
                        v-model="registe.nome"
                        outlined
                        :error-messages="errors[0]"
                    ></v-text-field>
                  </validation-provider>
                  <validation-provider
                      name="sobrenome"
                      vid="sobrenome"
                      rules="required"
                      v-slot="{ errors }"
                      tag="div">
                    <v-text-field
                        label="Digite seu sobrenome"
                        v-model="registe.sobrenome"
                        outlined
                        :error-messages="errors[0]"
                    ></v-text-field>
                  </validation-provider>
                </div>
                <validation-provider
                    name="e-mail"
                    vid="email"
                    rules="required|email"
                    v-slot="{ errors }"
                    tag="div">
                  <v-text-field
                      label="Digite seu e-mail"
                      v-model="registe.email"
                      outlined
                      :error-messages="errors[0]"
                  ></v-text-field>
                </validation-provider>
                <div class="grid grid-cols-2 gap-4">
                  <validation-provider
                      name="senha"
                      vid="senha"
                      rules="required|min:8"
                      v-slot="{ errors }"
                      tag="div">
                    <v-text-field
                        type="password"
                        label="Digite a senha"
                        v-model="registe.senha"
                        outlined
                        :error-messages="errors[0]"
                    ></v-text-field>
                  </validation-provider>
                  <validation-provider
                      name="confirmar"
                      vid="confirmar"
                      rules="required|min:8|confirmed:senha"
                      v-slot="{ errors }"
                      tag="div">
                    <v-text-field
                        type="password"
                        label="Confirmar Senha"
                        v-model="confirmar"
                        outlined
                        :error-messages="errors[0]"
                    ></v-text-field>
                  </validation-provider>
                </div>
                <div class="flex justify-center mt-4">
                  <v-btn large color="primary" type="submit">
                    <span class="mx-8">Acessar</span>
                  </v-btn>
                </div>
              </form>
            </validation-observer>
          </div>
        </v-card>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "registrar",
  data: () => ({
    registe: {},
    confirmar: ''
  }),
  methods: {
    submit() {
      this.$firebase.post(this.registe, 'auth')
          .then(response => {
            this.$swal({
              title: 'Sucesso',
              text: 'cadastrado com sucesso',
              icon: 'success',
            }).then(() => {
              this.$router.push('/')
            });
          })
          .catch(err => {
            this.$swal({
              title: 'Algo de errado ocorreu',
              text: 'Tente novamente mais tarde',
              icon: 'error',
            })
          })
    }
  }
}
</script>

<style lang="pcss" scoped>
.screen-index {
  @apply h-screen;
  background-color: rgb(234 236 229 / 20%);
}

.wrapper {

  >>> .v-card {
    @apply absolute px-4 py-8 w-full;
    @apply max-w-lg !important;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    .v-card__title, .v-card__text {
      @apply text-secondary font-extrabold;
    }

    .v-card__title {
      @apply text-3xl justify-center;
    }

    .v-card__text {
      @apply text-lg pb-0 pt-8;
    }

    .v-card__content {
      @apply p-4;
    }
  }
}
</style>