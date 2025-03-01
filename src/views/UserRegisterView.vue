<script setup lang="ts">
import LoadingComponent from '@/components/LoadingComponent.vue'
import type { RegisterUserRequestModel } from '@/models/request/RegisterUserRequestModel'
import UserServices from '@/services/UserServices'
import { ref } from 'vue'

const emits = defineEmits(['close'])

const form = ref()
const valid = ref(true)

const loading = ref(false)
const warning = ref('')

const rules = {
  required: (value: string) => !!value || 'Obrigatório.',
  min: (v: string) => v.length >= 8 || 'Minimo 8 caracteres',
  passwordMatch: (v: string) =>
    v === state.value.registerUser.password || 'As senhas não coincidem',
}

interface State {
  registerUser: RegisterUserRequestModel
  passwordConfirmation: string
}

const state = ref<State>({
  registerUser: {} as RegisterUserRequestModel,
  passwordConfirmation: '',
})

const validation = async () => {
  await form.value?.validate()
  if (valid.value) {
    submit()
  }
}

const submit = async () => {
  try {
    loading.value = true
    const userServices = new UserServices()
    const response = await userServices.register(state.value.registerUser)
    if (response.data.errors?.length) {
      response.data.errors.forEach((error) => {
        warning.value = error.message
        loading.value = false
      })
      return
    }
    emits('close', false)
    loading.value = false
  } catch (error) {
    console.log(error)
  }
}
</script>
<template>
  <LoadingComponent :value="loading" />
  <div class="pa-15 text-center">
    <v-card title="Criar uma conta" color="background">
      <v-divider></v-divider>
      <v-card-text class="pt-5 text-start">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-row>
            <v-col>
              <v-text-field
                v-model="state.registerUser.name"
                label="Nome"
                variant="solo-filled"
                density="compact"
                type="text"
                theme="dark"
                required
                :rules="[() => !!state.registerUser.name || 'Obrigatório.']"
                class="pb-2"
              />
              <v-text-field
                v-model="state.registerUser.surname"
                label="Sobrenome"
                variant="solo-filled"
                density="compact"
                type="text"
                theme="dark"
                required
                :rules="[() => !!state.registerUser.surname || 'Obrigatório.']"
                class="pb-2"
              />
              <v-text-field
                v-model="state.registerUser.email"
                label="Email"
                variant="solo-filled"
                density="compact"
                type="email"
                theme="dark"
                required
                :rules="[
                  () => !!state.registerUser.email || 'Obrigatório.',
                  (v) => /.+@.+/.test(v) || 'Invalid Email address',
                ]"
                class="pb-2"
              />
              <v-text-field
                v-model="state.registerUser.password"
                :rules="[rules.required, rules.min]"
                label="Senha"
                variant="solo-filled"
                density="compact"
                theme="dark"
                class="pb-2"
                type="password"
              ></v-text-field>
              <v-text-field
                v-model="state.passwordConfirmation"
                :rules="[rules.required, rules.min, rules.passwordMatch]"
                label="Confirmar senha"
                variant="solo-filled"
                density="compact"
                theme="dark"
                class="pb-2"
                type="password"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text="Cancelar" variant="plain" @click="emits('close', false)"></v-btn>
        <v-btn color="primary" text="Criar" variant="tonal" @click="validation"></v-btn>
      </v-card-actions>
    </v-card>
    <v-alert density="compact" :text="warning" type="warning" v-if="warning" class="mt-2"></v-alert>
  </div>
</template>
