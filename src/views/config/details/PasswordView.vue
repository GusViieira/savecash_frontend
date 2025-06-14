<script setup lang="ts">
import type { ResetPassModel, ResetPassRequestModel } from '@/models/request/ResetPassRequestModel'
import { ref } from 'vue'
//import { ERROR, SUCCESS } from '@/utils/constants'

const show1 = ref(false)
const show2 = ref(false)
const show3 = ref(false)

interface State {
  newPassword: ResetPassRequestModel
  error?: string
  resetPass?: ResetPassModel
}
const state = ref<State>({
  newPassword: {} as ResetPassRequestModel,
  error: '',
  resetPass: {} as ResetPassModel,
})
</script>
<template>
  <v-form ref="form3" class="mt-6">
              <v-row>
                <v-col cols="12" sm="12" md="8" lg="6" class="mx-auto">
                  <v-card-title>Digite sua senha atual</v-card-title>
                  <v-text-field
                    label="Senha atual"
                    variant="solo-filled"
                    density="compact"
                    theme="dark"
                    required
                    :append-inner-icon="show3 ? 'mdi-eye-off' : 'mdi-eye'"
                    @click:append-inner="show3 = !show3"
                    :type="show3 ? 'text' : 'password'"
                  ></v-text-field>
                </v-col>
              </v-row>
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
                    :rules="[(v) => v === state.newPassword.password || 'As senhas não coincidem']"
                    :append-inner-icon="show2 ? 'mdi-eye-off' : 'mdi-eye'"
                    @click:append-inner="show2 = !show2"
                    :type="show2 ? 'text' : 'password'"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-form>
          <div style="flex: 1; text-align: right">
            <v-btn
              color="primary">
              Confirmar
            </v-btn>
          </div>
</template>


