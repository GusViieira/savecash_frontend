<script setup lang="ts">
import type { ResetPassRequestModel } from '@/models/request/ResetPassRequestModel'
import { ref, watch } from 'vue'

const show1 = ref(false)
const show2 = ref(false)

interface State {
  newPassword: ResetPassRequestModel
}
const state = ref<State>({
  newPassword: {} as ResetPassRequestModel
})

const step = ref(1)
const form1 = ref()
const form2 = ref()
const form3 = ref()

const isDisabled = ref(false)


const isValid = ref(false)
const next = async () => {
  if (step.value === 1) {
    isValid.value = await form1.value?.validate()
  } else if (step.value === 2) {
    isValid.value = await form2.value?.validate()
  } else if (step.value === 3) {
    isValid.value = await form3.value?.validate()
  }

  if (isValid.value && step.value < 3) {
    step.value++
  }
}



const previous = () => {
  if (step.value > 1) {
    step.value--
  }
}

watch(()=>
  state.newPassword, isDisabled.value = !state.newPassword.email || !state.newPassword.code || !state.newPassword.password || !state.newPassword.confirmPassword
)




</script>

<template>
  <div class="d-flex align-center" style="height: 20vh">
    <v-sheet width="60%" height="50%" class="mx-auto bg-transparent">
      <v-row>
        <v-col class="d-none d-md-flex align-center justify-center">
          <img src="@/assets/images/login.svg" alt="Login" class="img-fluid mt=-20 mb-10" width="40%" />
        </v-col>
      </v-row>
      <v-stepper background="" theme="dark" hide-actions alt-labels :items="['Passo 1', 'Passo 2', 'Passo 3']" v-model="step">
        <template v-slot:item.1>
          <div class="px-16 text-center">
            <v-card-title>Informe seu e-mail</v-card-title>
            <v-form ref="form1" class="mt-6">
              <v-row>
                <v-col cols="12" sm="12" md="8" lg="6" class="mx-auto">
                  <v-text-field
                    v-model="state.newPassword.email"
                    label="Email"
                    variant="solo-filled"
                    density="compact"
                    type="email"
                    theme="dark"
                    required
                    :rules="[(v) => /.+@.+/.test(v) || 'Email inválido']"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-form>
          </div>
        </template>

        <template v-slot:item.2>
          <div class="px-16 text-center">
            <v-card-title>Digite o código de validação</v-card-title>
            <v-form ref="form2" class="mt-6">
              <v-row>
                <v-col cols="12" sm="12" md="8" lg="6" class="mx-auto">
                  <v-text-field
                    v-model="state.newPassword.code"
                    label="Código de verificação"
                    variant="solo-filled"
                    density="compact"
                    type="number"
                    theme="dark"
                    required
                    :rules="[() => !!state.newPassword.code || 'Código de verificação é obrigatório']"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-form>
          </div>
        </template>

        <template v-slot:item.3>
          <div class="px-16 text-center">
            <v-form ref="form3" class="mt-6">
              <v-row>
                <v-col cols="12" sm="12" md="8" lg="6" class="mx-auto">
                  <v-card-title>Defina nova senha</v-card-title>
                  <v-text-field
                    v-model="state.newPassword.password"
                    label="Nova senha"
                    variant="solo-filled"
                    density="compact"
                    theme="dark"
                    required
                    :rules="[(v) => v.length >= 8 || 'Senha deve ter no mínimo 8 caracteres']"
                    :append-inner-icon="show1 ? 'mdi-eye-off' : 'mdi-eye'"
                    @click:append-inner="show1 = !show1"
                    :type="show1 ? 'text' : 'password'"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="12" md="8" lg="6" class="mx-auto">
                  <v-card-title class="mt-n4">Confirme a nova senha</v-card-title>
                  <v-text-field
                    label="Confirme a nova senha"
                    variant="solo-filled"
                    density="compact"
                    theme="dark"
                    required
                    :rules="[(v) => v.length >= 8 || 'Senha deve ter no mínimo 8 caracteres']"
                    :append-inner-icon="show2 ? 'mdi-eye-off' : 'mdi-eye'"
                    @click:append-inner="show2 = !show2"
                    :type="show2 ? 'text' : 'password'"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-form>
          </div>
        </template>

        <div class="d-flex justify-space-between mt-4 pa-8">
          <v-btn color="primary" @click="previous" :disabled="step === 1" >Voltar</v-btn>
          <v-btn color="primary" @click="next" :disabled="isDisabled"
            >Próximo</v-btn>
        </div>
      </v-stepper>
    </v-sheet>
  </div>
</template>
