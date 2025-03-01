<script setup lang="ts">
import LoadingComponent from '@/components/LoadingComponent.vue'
import type { RegisterUserRequestModel } from '@/models/request/RegisterUserRequestModel'
import UserServices from '@/services/UserServices'
import { ref } from 'vue'

const emits = defineEmits(['close'])

const form = ref()
const valid = ref(true)

const show2 = ref(false)
const loading = ref(false)
const warning = ref('')

const rules = {
  required: (value: string) => !!value || 'Obrigatório.',
  min: (v: string) => v.length >= 8 || 'Minimo 8 caracteres',
}

interface State {
  registerUser: RegisterUserRequestModel
}

const state = ref<State>({
  registerUser: {} as RegisterUserRequestModel,
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
  <div class="pa-4 text-center">
    <v-card title="Criar uma conta" color="background">
      <v-form ref="form" v-model="valid">
        <v-card-text class="pt-5 text-start">
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
              />
              <v-text-field
                v-model="state.registerUser.password"
                :append-icon="show2 ? 'mdi-eye-off' : 'mdi-eye'"
                :rules="[rules.required, rules.min]"
                :type="show2 ? 'text' : 'password'"
                label="Senha"
                variant="solo-filled"
                density="compact"
                name="input-10-2"
                theme="dark"
                @click:append="show2 = !show2"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text="Close" variant="plain" @click="emits('close', false)"></v-btn>
          <v-btn color="primary" text="Save" variant="tonal" @click="validation"></v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
    <v-alert density="compact" :text="warning" type="warning" v-if="warning" class="mt-2"></v-alert>
  </div>
</template>
