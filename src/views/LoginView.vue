<script setup lang="ts" name="LoginView">
import { ref } from 'vue'
import type { LoginRequestModel } from '@/models/request/LoginRequestModel'
import LoginService from '@/services/LoginService'
import { useRouter } from 'vue-router'
import LoadingComponent from '@/components/LoadingComponent.vue'
import UserRegisterView from './UserRegisterView.vue'
import { userStore } from '@/stores/userStore'

const router = useRouter()

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
    loading.value = false
    router.push({ name: 'Home' })
  } catch (e) {
    console.error(e)
  }
}
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
  <div class="d-flex align-center" style="height: 100vh">
    <v-sheet width="20%" class="bg-transparent ml-16">
      <v-form ref="form" v-model="valid">
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
                (v) => /.+@.+/.test(v) || 'Invalid Email address',
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
                <a @click="dialog = true" style="cursor: pointer">Esqueci a senha</a>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row class="d-flex justify-center">
          <v-col cols="auto">
            <v-btn color="primary" @click="validation"> Login </v-btn>
          </v-col>
        </v-row>
      </v-form>
      <v-row class="d-flex justify-center">
        <v-col cols="auto">
          <span
            >Não tem uma conta?
            <a @click="dialog = true" style="cursor: pointer">Inscrever-se</a></span
          >
        </v-col>
      </v-row>
    </v-sheet>
    <v-sheet class="bg-transparent text-right mr-10" width="80%">
      <img src="@/assets/images/login.svg" alt="Login" />
    </v-sheet>
    <div class="pa-4">
      <v-dialog v-model="dialog" max-width="600">
        <UserRegisterView @close="(v) => (dialog = v)" />
      </v-dialog>
    </div>
  </div>
</template>

<style scoped>
a {
  color: #9b51e0;
  text-decoration: none;
}
</style>
