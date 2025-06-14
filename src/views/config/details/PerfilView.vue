<script setup lang="ts">
import avatarSrc from '@/assets/images/avatar.svg'
import LoadingComponent from '@/components/LoadingComponent.vue'
import type { UserResponseModel } from '@/models/response/UserResponseModel'
import UserServices from '@/services/UserServices'
import { userStore } from '@/stores/userStore'
import { convertDate, convertDateToServe } from '@/utils/date'
import { onMounted, shallowReactive, ref } from 'vue'

const store = userStore()
const rendered = ref(false)
const loading = ref(false)
const saving = ref(false)
const alertSucess = ref(false)

interface State {
  user: UserResponseModel
  userBckup: UserResponseModel
}

const state = shallowReactive<State>({
  user: {} as UserResponseModel,
  userBckup: {} as UserResponseModel,
})

const search = async () => {
  try {
    loading.value = true
    const service = new UserServices.GetUserService()
    const response = await service.getUser(store.idUser)
    state.user = response.data.content
    if(state.user.birthDate){
      state.user.birthDate = convertDate(state.user.birthDate) as ''
      state.userBckup.birthDate = state.userBckup.birthDate?.split('-').reverse().join('-')
    }
    state.userBckup = structuredClone(response.data.content)
    loading.value = false
    rendered.value = true
  } catch (error) {
    console.error(error)
  }
}

const validateSubmit = () => {
  state.user.birthDate = convertDateToServe(state.user.birthDate)
  if(JSON.stringify(state.user) !== JSON.stringify(state.userBckup)) {
    submit()
  }
}

const submit = async () => {
  try {
    saving.value = true
    const service = new UserServices.UpdateUserService()
    const response = await service.updateUser(state.user)
    state.user = response.data.content
    updateStorage(response.data.content)
    if(state.user.birthDate){
      state.user.birthDate = convertDate(state.user.birthDate) as ''
      state.userBckup.birthDate = state.userBckup.birthDate?.split('-').reverse().join('-')
    }
    state.userBckup = structuredClone(response.data.content)
    saving.value = false
    alertSucess.value = true
  } catch (error) {
    console.error(error)
  }
}

const updateStorage = (user: UserResponseModel) => {
  store.name = user.name
  store.email = user.email
}

onMounted(() => {
  search()
})
</script>
<template>
  <LoadingComponent :value="saving" />
  <v-snackbar
    v-model="alertSucess"
    :timeout="4000"
    icon="mdi-check-outline"
    class="mt-10"
    color="success"
    location="top right"
  >
    {{ 'Suas alterações foram salvas com sucesso.' }}
  </v-snackbar>
  <v-skeleton-loader type="card" v-if="loading"></v-skeleton-loader>
  <div class="pa-5" v-if="!loading">
    <v-row class="px-10">
      <v-col cols="12" sm="12" md="4" lg="2" class="mr-10 pa-2">
        <v-avatar size="190">
          <v-img :src="avatarSrc" alt="Login" class="img-fluid" />
        </v-avatar>
      </v-col>
      <v-col class="mt-2" cols="12" sm="12" md="8" lg="6">
        <v-form ref="form" v-click-outside="validateSubmit">
          <v-row no-gutters>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="state.user.name"
                label="Nome"
                variant="solo-filled"
                density="compact"
                type="text"
                class="mr-2"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="state.user.surname"
                label="Sobrenome"
                variant="solo-filled"
                density="compact"
                type="text"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="state.user.email"
                label="Email"
                variant="solo-filled"
                density="compact"
                type="text"
                class="mr-2"
                disabled
              />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="state.user.birthDate"
                label="Data de nascimento"
                variant="solo-filled"
                density="compact"
                type="text"
                v-mask="'##/##/####'"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="state.user.country"
                label="País"
                variant="solo-filled"
                density="compact"
                type="text"
                class="mr-2"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="state.user.phoneNumber"
                label="Telefone"
                variant="solo-filled"
                density="compact"
                type="text"
              />
            </v-col>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
  </div>
</template>
