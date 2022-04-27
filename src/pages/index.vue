<template>
  <section class="screen-index">
    <div class="theme__screen">
      <div class="wrapper">
        <v-card
            elevation="4"
        >
          <v-card-title>Transcorre plus</v-card-title>
          <v-card-text>Acessar conta</v-card-text>
          <div class="v-card__content">
            <validation-observer ref="observer" v-slot="{handleSubmit}">
              <form @submit.prevent="handleSubmit(submit)">
                <validation-provider
                    name="e-mail"
                    vid="email"
                    rules="required|email"
                    v-slot="{ errors }"
                    tag="div">
                  <v-text-field
                      label="Digite seu e-mail"
                      v-model="login.username"
                      outlined
                      :error-messages="errors[0]"
                  ></v-text-field>
                </validation-provider>
                <validation-provider
                    name="senha"
                    vid="senha"
                    rules="required|min:8"
                    v-slot="{ errors }"
                    tag="div">
                  <v-text-field
                      type="password"
                      label="Digite a senha"
                      v-model="login.password"
                      outlined
                      :error-messages="errors[0]"
                  ></v-text-field>
                </validation-provider>
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
  name: "index",
  data: () => ({
    login: {}
  }),
  methods: {
    submit() {

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