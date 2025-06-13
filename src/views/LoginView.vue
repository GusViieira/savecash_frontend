<script setup lang="ts" name="LoginView">
import { onMounted, ref } from 'vue'
import type { LoginRequestModel } from '@/models/request/LoginRequestModel'
import LoginService from '@/services/LoginService'
import { useRouter } from 'vue-router'
import LoadingComponent from '@/components/LoadingComponent.vue'
import UserRegisterView from './UserRegisterView.vue'
import { userStore } from '@/stores/userStore'
import { useTheme } from 'vuetify'

const router = useRouter()
const theme = useTheme()

const alertError = ref(false)
const form = ref()
const valid = ref(true)
const loading = ref(false)
const dialog = ref(false)
const store = userStore()
const show2 = ref(false)

interface State {
  login: LoginRequestModel
  error: string
}

const state = ref<State>({
  login: {} as LoginRequestModel,
  error: '',
})

const validation = async () => {
  await form.value?.validate()
  if (valid.value) {
    submit()
  }
}

const submit = async () => {
  try {
    const loginService = new LoginService()
    loading.value = true
    const response = await loginService.login(state.value.login)
    if (response.data.errors?.length) {
      response.data.errors.forEach((error) => {
        state.value.error = error.message
        alertError.value = true
        loading.value = false
      })
      return
    }
    localStorage.setItem('token', response.data.content?.jwt as string)
    store.name = response.data.content?.name as string
    store.email = response.data.content?.email as string
    store.idUser = response.data.content?.idUser
    loading.value = false
    router.push({ name: 'Home' })
  } catch (e) {
    console.error(e)
  }
}
onMounted(() => (theme.global.name.value = 'dark'))
</script>

<template>
  <LoadingComponent :value="loading" />
  <v-snackbar
    v-model="alertError"
    :timeout="4000"
    icon="mdi-user-off"
    class="mt-10"
    color="error"
    location="top right"
  >
    {{ state.error }}
  </v-snackbar>
  <v-container class="fill-height d-flex align-center justify-center mt-16">
    <v-row class="fill-height d-flex align-center justify-center mt-5">
      <v-col cols="12" md="6" lg="4">
        <v-sheet class="bg-transparent">
          <v-form ref="form" v-model="valid" @submit.prevent="validation">
            <v-row>
              <v-col>
                <v-text-field
                  v-model="state.login.email"
                  label="Email"
                  variant="solo-filled"
                  density="compact"
                  type="email"
                  theme="dark"
                  required
                  :rules="[
                    () => !!state.login.email || 'Email é obrigatório',
                    (v) => /.+@.+/.test(v) || 'Email inválido',
                  ]"
                />

                <v-text-field
                  v-model="state.login.password"
                  label="Senha"
                  variant="solo-filled"
                  density="compact"
                  theme="dark"
                  required
                  :rules="[() => !!state.login.password || 'Senha é obrigatória']"
                  :append-inner-icon="show2 ? 'mdi-eye-off' : 'mdi-eye'"
                  @click:append-inner="show2 = !show2"
                  :type="show2 ? 'text' : 'password'"
                />
                <v-row>
                  <v-col class="text-right mb-1">
                    <a @click="router.push({ name: 'ResetPassword' })" style="cursor: pointer"
                      >Esqueci a senha</a
                    >
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-row class="d-flex justify-center">
              <v-col cols="auto">
                <v-btn type="submit" color="primary" @click="validation"> Login </v-btn>
              </v-col>
            </v-row>
          </v-form>
          <v-row class="d-flex justify-center">
            <v-col cols="auto">
              <span>
                Não tem uma conta?
                <a @click="dialog = true" style="cursor: pointer">Inscrever-se</a>
              </span>
            </v-col>
          </v-row>
        </v-sheet>
      </v-col>
      <v-col cols="12" md="6" lg="8" class="d-none d-md-flex align-center justify-center">
        <img src="@/assets/images/login.svg" alt="Login" class="img-fluid" />
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" max-width="600">
      <UserRegisterView @close="(v) => (dialog = v)" />
    </v-dialog>
  </v-container>
</template>

<style scoped>
a {
  color: #9b51e0;
  text-decoration: none;
}
</style>
