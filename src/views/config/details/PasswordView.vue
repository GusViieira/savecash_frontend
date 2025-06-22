<script setup lang="ts">
import type { ResetPassModel } from '@/models/request/ResetPassRequestModel'
import UserServices from '@/services/UserServices'
import { userStore } from '@/stores/userStore'
import { ERROR, SUCCESS } from '@/utils/constants'
import { ref } from 'vue'

const show1 = ref(false)
const show2 = ref(false)
const loading = ref(false)

const alertError = ref(false)
const color = ref()

const store = userStore()

interface State {
  error: string
  resetPass: ResetPassModel
}
const state = ref<State>({
  error: '',
  resetPass: {} as ResetPassModel,
})

const submitNewPassword = async (resetPassModel: ResetPassModel) => {
  const service = new UserServices.RecoverPasswordService()
  try {
    state.value.resetPass.email = store.email
    const response = await service.changePassword(resetPassModel)
    if (response.data.errors?.length) {
      response.data.errors.forEach((error) => {
        state.value.error = error.message
        color.value = ERROR
        alertError.value = true
      })
      return false
    }
    alertError.value = true
    color.value = SUCCESS
    state.value.error = response.data.content
    state.value.resetPass = {} as ResetPassModel
    return true
  } catch (error) {
    console.error('Error resetting password:', error)
  }
}
</script>
<template>
    <v-snackbar
    v-model="alertError"
    :timeout="4000"
    icon="mdi-user-off"
    class="mt-10"
    :color="color"
    location="top right"
  >
    {{ state.error }}
  </v-snackbar>
  <div class="pa-5" v-if="!loading">
    <v-form ref="form3" class="mt-6">
      <v-row>
        <v-col cols="12" sm="12" md="8" lg="6" class="mx-auto">
          <v-card-title>Defina nova senha</v-card-title>
          <v-text-field
            v-model="state.resetPass.password"
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
            :rules="[(v) => v === state.resetPass.password || 'As senhas não coincidem']"
            :append-inner-icon="show2 ? 'mdi-eye-off' : 'mdi-eye'"
            @click:append-inner="show2 = !show2"
            :type="show2 ? 'text' : 'password'"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-form>
    <div style="flex: 1; text-align: right">
      <v-btn color="primary" @click="submitNewPassword(state.resetPass)"> Salvar </v-btn>
    </div>
  </div>
</template>
