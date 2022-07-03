<template>
  <div class="app">
    <section>
      <div>
        <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d29269.08896269312!2d-46.3798272!3d-23.5096126!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1spt-BR!2sbr!4v1656719745140!5m2!1spt-BR!2sbr"
            style="border:0;width:100vw; height:100vh"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade">
        </iframe>
      </div>
      <div class="--menu">
        <v-app-bar
            elevation="4"
            absolute
            top
        >
          <v-app-bar-nav-icon
              @click.stop="drawer = !drawer"
          />
        </v-app-bar>
        <v-navigation-drawer
            v-model="drawer"
            absolute
        >
          <v-card>
            <v-card-title>
              <v-img
                  :src="require('/src/assets/logo.png')"
                  contain
                  :max-width="150"
              />
              <v-spacer></v-spacer>
              <v-icon
                  @click="drawer = false"
                  color="primary"
              >
                mdi-close
              </v-icon>
            </v-card-title>
          </v-card>
          <v-spacer></v-spacer>
          <v-card elevation="0" max-width="100vh">
            <v-list>
              <v-list-item-group
                  v-model="model"
                  color="indigo"
              >
                <v-list-item link>
                  <v-list-item-icon>
                    <v-icon>mdi-guitar-pick-outline</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>
                    Pontos de Enchentes
                  </v-list-item-title>
                </v-list-item>
                <v-list-item link @click="dialog.questionario = !dialog.questionario">
                  <v-list-item-icon>
                    <v-icon>mdi-progress-question</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>
                    Questionário da Saúde
                  </v-list-item-title>
                </v-list-item>
                <v-list-item link @click="dialog.informacao = !dialog.informacao">
                  <v-list-item-icon>
                    <v-icon>mdi-information-outline</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>
                    Sobre Leptospirose
                  </v-list-item-title>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card>
        </v-navigation-drawer>
      </div>
    </section>
    <v-dialog
        v-model="dialog.questionario"
    >
      <v-stepper v-model="questionario">
        <v-stepper-items>
          <v-stepper-content step="1">
            <v-card>
              <v-card-title class="justify-center text-primary font-bold">
                Questionário da Saúde
              </v-card-title>
              <v-card-text class="justify-center">
                Registrar informações de sintomas de leptopirose
              </v-card-text>
              <v-card-text>
                <validation-observer ref="observer" v-slot="{handleSubmit}">
                  <form>
                    <validation-provider
                        name="nome completo"
                        vid="nome_completo"
                        rules="required"
                        v-slot="{ errors }"
                        tag="div">
                      <v-text-field
                          label="Digite seu nome completo"
                          v-model="registe.nome"
                          outlined
                          :error-messages="errors[0]"
                      ></v-text-field>
                    </validation-provider>
                    <validation-provider
                        name="data de nascimento"
                        vid="data_nascimento"
                        rules="required"
                        v-slot="{ errors }"
                        tag="div">
                      <v-text-field
                          label="Digite sua data de nascimento"
                          v-model="registe.data_nascimento"
                          v-mask="'##/##/####'"
                          outlined
                          :error-messages="errors[0]"
                      ></v-text-field>
                    </validation-provider>
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
                    <validation-provider
                        name="CEP"
                        vid="cep"
                        rules="required"
                        v-slot="{ errors }"
                        tag="div">
                      <v-text-field
                          label="Digite o CEP"
                          v-model="registe.cep"
                          v-mask="'#####-###'"
                          outlined
                          :error-messages="errors[0]"
                          @blur="viacep(registe.cep)"
                      ></v-text-field>
                    </validation-provider>
                    <div class="flex justify-center mt-4">
                      <v-btn large color="primary" @click="questionario = 2">
                        <span class="mx-8">Prosseguir</span>
                      </v-btn>
                    </div>
                  </form>
                </validation-observer>
              </v-card-text>
            </v-card>
          </v-stepper-content>
          <v-stepper-content step="2">
            <v-card>
              <v-card-title class="justify-center text-primary font-bold">
                Confirmar o seu Endereço
              </v-card-title>
              <v-card-text class="justify-center">
                Registrar informações de sintomas de leptopirose
              </v-card-text>
              <v-card-text>
                <validation-observer ref="observer" v-slot="{handleSubmit}">
                  <form>
                    <validation-provider
                        name="Endereço"
                        vid="endereço"
                        rules="required"
                        v-slot="{ errors }"
                        tag="div">
                      <v-text-field
                          label="Digite seu endereço"
                          v-model="registe.endereco"
                          outlined
                          :error-messages="errors[0]"
                      ></v-text-field>
                    </validation-provider>
                    <validation-provider
                        name="numero"
                        vid="endereço"
                        rules="required"
                        v-slot="{ errors }"
                        tag="div">
                      <v-text-field
                          label="Digite seu numero"
                          v-model="registe.numero"
                          outlined
                          :error-messages="errors[0]"
                      ></v-text-field>
                    </validation-provider>
                    <validation-provider
                        name="bairro"
                        vid="bairro"
                        rules="required"
                        v-slot="{ errors }"
                        tag="div">
                      <v-text-field
                          label="Digite seu bairro"
                          v-model="registe.bairro"
                          outlined
                          :error-messages="errors[0]"
                      ></v-text-field>
                    </validation-provider>
                    <validation-provider
                        name="cidade"
                        vid="cidade"
                        rules="required"
                        v-slot="{ errors }"
                        tag="div">
                      <v-text-field
                          label="Digite a sua cidade"
                          v-model="registe.cidade"
                          outlined
                          :error-messages="errors[0]"
                      ></v-text-field>
                    </validation-provider>
                    <validation-provider
                        name="estado"
                        vid="estado"
                        rules="required"
                        v-slot="{ errors }"
                        tag="div">
                      <v-text-field
                          label="Digite o seu estado"
                          v-model="registe.estado"
                          outlined
                          :error-messages="errors[0]"
                      ></v-text-field>
                    </validation-provider>
                    <div class="flex justify-center mt-4">
                      <v-btn large color="primary" @click="questionario = 3">
                        <span class="mx-8">Prosseguir</span>
                      </v-btn>
                    </div>
                  </form>
                </validation-observer>
              </v-card-text>
            </v-card>
          </v-stepper-content>
          <v-stepper-content step="3">
            <v-card>
              <v-card-title class="justify-center text-primary font-bold">
                Causa do Sintomas
              </v-card-title>
              <v-card-text class="justify-center">
                Registrar informações de sintomas de leptopirose
              </v-card-text>
              <v-card-text>
                <validation-observer ref="observer" v-slot="{handleSubmit}">
                  <form @submit.prevent="handleSubmit(submit)">
                    <validation-provider
                        name="febre"
                        vid="febre"
                        v-slot="{ errors }"
                        tag="div">
                      <v-checkbox
                          label="Febre"
                          v-model="registe.febre"
                          outlined
                          :error-messages="errors[0]"
                      ></v-checkbox>
                    </validation-provider>
                    <validation-provider
                        name="dor de cabeça"
                        vid="dor_cabeca"
                        v-slot="{ errors }"
                        tag="div">
                      <v-checkbox
                          label="Dor de cabeça"
                          v-model="registe.dor_cabeca"
                          outlined
                          :error-messages="errors[0]"
                      ></v-checkbox>
                    </validation-provider>
                    <validation-provider
                        name="Dor muscular"
                        vid="dor_muscular"
                        v-slot="{ errors }"
                        tag="div">
                      <v-checkbox
                          label="Dor muscular, principalmente nas panturrilhas"
                          v-model="registe.dor_muscular"
                          outlined
                          :error-messages="errors[0]"
                      ></v-checkbox>
                    </validation-provider>
                    <validation-provider
                        name="falta de apetite"
                        vid="falta_apetite"
                        v-slot="{ errors }"
                        tag="div">
                      <v-checkbox
                          label="Falta de apetite"
                          v-model="registe.falta_apetite"
                          outlined
                          :error-messages="errors[0]"
                      ></v-checkbox>
                    </validation-provider>
                    <validation-provider
                        name="náuseas"
                        vid="nauseas"
                        v-slot="{ errors }"
                        tag="div">
                      <v-checkbox
                          label="Náuseas"
                          v-model="registe.nauseas"
                          outlined
                          :error-messages="errors[0]"
                      ></v-checkbox>
                    </validation-provider>
                    <validation-provider
                        name="vômitos"
                        vid="vomitos"
                        v-slot="{ errors }"
                        tag="div">
                      <v-checkbox
                          label="Vômitos"
                          v-model="registe.vomitos"
                          outlined
                          :error-messages="errors[0]"
                      ></v-checkbox>
                    </validation-provider>
                    <div class="flex justify-center mt-4">
                      <v-btn large color="primary" type="submit">
                        <span class="mx-8">Cadastrar</span>
                      </v-btn>
                    </div>
                  </form>
                </validation-observer>
              </v-card-text>
            </v-card>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>

    </v-dialog>
    <v-dialog
        v-model="dialog.informacao"
    >
      <v-card>
        <v-card-title>Visão Geral</v-card-title>
        <v-card-text>
          <p>Doença bacteriana transmitida pela urina de animais infectados.</p>
          <p>
            Infecção humana resultante da exposição direta ou indireta à urina de animais
            infectados, por meio do contato com água, solo ou alimentos contaminados.</p>
          <p>
            Febre alta, dor de cabeça, sangramento, dor muscular, calafrios, olhos vermelhos e
            vômitos
            são alguns sintomas.
          </p>
          <p>
            Sem tratamento, a leptospirose pode causar danos renais e hepáticos e até mesmo a morte.
            Os antibióticos combatem a infecção.
          </p>
        </v-card-text>
        <v-card-title>Sintomas</v-card-title>
        <v-card-title>Requer um diagnóstico médico</v-card-title>
        <v-card-text>
          <p>Febre alta, dor de cabeça, sangramento, dor muscular, calafrios, olhos vermelhos e
            vômitos são alguns sintomas.</p>
        </v-card-text>
        <v-card-title>As pessoas podem ter:</v-card-title>
        <v-card-text>
          <p>
            Dores locais: nas articulações ou nos músculos
            No aparelho gastrointestinal: diarreia, náusea ou vômito
            No corpo: calafrios, fadiga ou febre alta
            Também é comum: dor de cabeça, dor de garganta, irritação na pele, olhos avermelhados ou
            tosse
          </p>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "map",
  data: () => ({
    drawer: false,
    model: 1,
    dialog: {
      questionario: false,
      informacao: false
    },
    registe: {
      nome: '',
      data_nascimento: '',
      email: '',
      cep: '',
      numero: '',
      bairro: '',
      cidade: '',
      estado: '',
      endereco: '',
      febre: false,
      dor_cabeca: false,
      dor_muscular: false,
      falta_apetite: false,
      nauseas: false,
      vomitos: false,
    },
    questionario: 1
  }),
  methods: {
    submit() {
      this.$firebase.post(this.registe, 'registros')
          .then(response => {
            this.$swal({
              title: 'Sucesso',
              text: 'registrado com sucesso',
              icon: 'success',
            }).then(() => {
              this.dialog.questionario = false;
              this.dialog.informacao = false;
            });
          })
          .catch(err => {
            console.log(err)
          })
    },
    viacep(value) {
      if (!value) {
        return;
      }
      let cep, i = /^[0-9]{8}$/, res;
      cep = value.replace("-", "")
      if (!i.test(cep)) {
        this.$swal({
          title: "Ops",
          text: "O CEP digitado é inválido",
          icon: "error",
        });
        return
      }
      fetch(`https://viacep.com.br/ws/${cep}/json/`, {
        method: "get",
      })
          .then((response) => {
            return response.json();
          }).then(response => {
        this.registe.bairro = response.bairro;
        this.registe.cidade = response.localidade;
        this.registe.endereco = response.logradouro;
        this.registe.estado = response.uf;
      }).catch((err) => {
        this.$swal({
          title: "Ops",
          text: "Ocorreu um erro na busca do CEP",
          icon: "error",
        });
      });
    }
  }
}
</script>

<style scoped>
.app {
  section {
    @apply flex;
  }

  .--menu {
    @apply absolute top-0 right-0  h-screen w-screen;
  }

  .v-app-bar {
    @apply bg-primary !important;

    .v-app-bar__nav-icon {
      @apply text-white;
    }
  }

  .v-navigation-drawer {
    .v-icon, .v-list-item {
      @apply text-primary font-semibold;
    }
  }
}
</style>