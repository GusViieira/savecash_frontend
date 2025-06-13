<script setup lang="ts">
import type { ResetPassModel, ResetPassRequestModel } from '@/models/request/ResetPassRequestModel'
import UserServices from '@/services/UserServices'
import { ERROR, SUCCESS } from '@/utils/constants'
import { ref } from 'vue'

const show1 = ref(false)
const show2 = ref(false)
const alertError = ref(false)

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

const step = ref()
const form1 = ref()
const form2 = ref()
const form3 = ref()

const isDisabled = ref(false)
const isValid = ref(false)

const color = ref()

const previous = () => {
  if (step.value > 1) {
    step.value--
  }
}

const submitHandler = async (actualStep: number) => {
  console.log(`Submitting step: ${actualStep}`)
  switch (actualStep) {
    case 1:
      isValid.value = await form1.value?.validate()
      const response = await submitEmail(state.value.newPassword.email)
      if (response) step.value++
      break
    case 2:
      isValid.value = await form2.value?.validate()
      const result = await submitOtp(state.value.newPassword.code)
      if (result) step.value++
      break
    case 3:
      state.value.resetPass!.email = state.value.newPassword.email
      state.value.resetPass!.password = state.value.newPassword.password
      isValid.value = await form3.value?.validate()
      await submitNewPassword(state.value.resetPass!)
      break
    default:
      break
  }
}

const submitEmail = async (email: string) => {
  const service = new UserServices.RecoverPasswordService()
  try {
    const response = await service.recoverPassword(email)
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
    return true
  } catch (error) {
    console.error('Error sending email:', error)
  }
}

const submitOtp = async (code: number) => {
  const service = new UserServices.RecoverPasswordService()
  try {
    const response = await service.verfyRecoverCode(code, state.value.newPassword.email)
    if (response.data.errors?.length) {
      response.data.errors.forEach((error) => {
        state.value.error = error.message
        color.value = ERROR
        alertError.value = true
      })
      return false
    }
    state.value.newPassword.idUser = response.data.content
    return true
  } catch (error) {
    console.error('Error validating code:', error)
  }
}

const submitNewPassword = async (resetPassModel: ResetPassModel) => {
  const service = new UserServices.RecoverPasswordService()
  try {
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
  <div class="d-flex align-center" style="height: 20vh">
    <v-sheet width="60%" height="50%" class="mx-auto bg-transparent">
      <v-stepper
        background=""
        theme="dark"
        hide-actions
        alt-labels
        :items="['Passo 1', 'Passo 2', 'Passo 3']"
        v-model="step"
      >
        <template v-slot:item>
          <div v-if="step === 1" class="px-16 text-center">
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
          <div v-else-if="step === 2" class="px-16 text-center">
            <v-card-title>Digite o código de validação</v-card-title>
            <v-form ref="form2" class="mt-6">
              <v-sheet
                class="py-8 px-6 mx-auto ma-4 text-center"
                elevation="4"
                max-width="500"
                rounded="lg"
                width="100%"
              >
                <v-otp-input
                  v-model="state.newPassword.code"
                  class="mb-8"
                  divider="•"
                  length="6"
                  variant="outlined"
                ></v-otp-input>
              </v-sheet>
              <!--v-row>
                <v-col cols="12" sm="12" md="8" lg="6" class="mx-auto">
                  <v-text-field
                    v-model="state.newPassword.code"
                    label="Código de verificação"
                    variant="solo-filled"
                    density="compact"
                    type="number"
                    theme="dark"
                    required
                    :rules="[
                      () => !!state.newPassword.code || 'Código de verificação é obrigatório',
                    ]"
                  ></v-text-field>
                </v-col>
              </v-row-->
            </v-form>
          </div>
          <div v-else-if="step === 3" class="px-16 text-center">
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
          <div style="flex: 1">
            <v-btn color="primary" @click="previous" v-show="step != 1">Voltar</v-btn>
          </div>

          <div style="flex: 1; text-align: right">
            <v-btn
              color="primary"
              @click="submitHandler(step)"
              :disabled="isDisabled"
              v-show="step != 3"
            >
              Próximo
            </v-btn>

            <v-btn
              color="primary"
              @click="submitHandler(step)"
              :disabled="isDisabled"
              v-show="step === 3"
            >
              Confirmar
            </v-btn>
          </div>
        </div>
      </v-stepper>
    </v-sheet>
  </div>
</template>
