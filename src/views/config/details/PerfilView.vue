<script setup lang="ts">
import avatarSrc from '@/assets/images/avatar.svg'
import LoadingComponent from '@/components/LoadingComponent.vue'
import type { CountriesListModel } from '@/models/response/ExternalApisModel'
import type { UserResponseModel } from '@/models/response/UserResponseModel'
import ExternalAPIS from '@/services/ExternalAPIS'
import UserServices from '@/services/UserServices'
import { userStore } from '@/stores/userStore'
import { convertDate, convertDateToServe } from '@/utils/date'
import { parse, format } from 'date-fns'
import { onMounted, reactive, ref, watch } from 'vue'

const store = userStore()
const rendered = ref(false)
const loading = ref(false)
const saving = ref(false)
const alertSucess = ref(false)

const menu = ref(false)
const pickerDate = ref(new Date())

interface State {
  user: UserResponseModel
  countries: CountriesListModel[]
}

const state = reactive<State>({
  user: {} as UserResponseModel,
  countries: [],
})

// Se digitar manualmente, tenta sincronizar com o picker
watch(
  () => state.user.birthDate,
  (newVal) => {
    const parsed = parse(newVal, 'dd/MM/yyyy', new Date())
    if (isValid(parsed)) {
      pickerDate.value = parsed
    }
  },
)

const selectDate = (selectedDate: Date) => {
  if (selectedDate) {
    const formattedDate = format(selectedDate, 'yyyy-MM-dd')
    state.user.birthDate = convertDate(formattedDate)
  }
  menu.value = false
}

const search = async () => {
  try {
    loading.value = true
    const service = new UserServices.GetUserService()
    const response = await service.getUser(store.idUser)
    state.user = response.data.content
    countrySearch()
    if (
      state.user.birthDate !== null &&
      state.user.birthDate !== '' &&
      state.user.birthDate !== undefined
    ) {
      state.user.birthDate = convertDate(state.user.birthDate) as ''
    }
    loading.value = false
    rendered.value = true
  } catch (error) {
    console.error(error)
  }
}

const countrySearch = async () => {
  try {
    const response = await ExternalAPIS.getCountries()
    state.countries = response
  } catch (error) {
    console.error(error)
    return []
  }
}

const submit = async () => {
  try {
    saving.value = true
    const service = new UserServices.UpdateUserService()
    state.user.birthDate = convertDateToServe(state.user.birthDate) as ''
    state.user.phoneNumber = state.user.phoneNumber
      .replace('(', '')
      .replace(')', '')
      .replace('-', '')
      .split(' ')
      .join('')
    const response = await service.updateUser(state.user)
    state.user = response.data.content
    updateStorage(response.data.content)
    if (state.user.birthDate) {
      state.user.birthDate = convertDate(state.user.birthDate) as ''
    }
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

const isValid = (parsed: Date) => {
  return parsed instanceof Date && !isNaN(parsed.getTime())
}
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
        <v-form ref="form">
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
              <v-menu
                v-model="menu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
              >
                <template #activator="{ props }">
                  <v-text-field
                    v-model="state.user.birthDate"
                    label="Data de nascimento"
                    variant="solo-filled"
                    density="compact"
                    type="text"
                    v-bind="props"
                    v-mask="'##/##/####'"
                    @click:append-inner="menu = true"
                    class="mr-2"
                  >
                    <template #append-inner>
                      <v-icon>mdi-calendar</v-icon>
                    </template>
                  </v-text-field>
                </template>
                <v-row no-gutters>
                  <v-col cols="12" sm="8" xs="6" xl="6" style="max-width: 100%">
                    <v-card class="pa-2">
                      <v-date-picker
                        v-model="pickerDate"
                        @update:model-value="selectDate"
                        color="primary"
                        show-adjacent-months
                      />
                      <v-card-actions class="justify-end">
                        <v-btn @click="menu = false">Fechar</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-col>
                </v-row>
              </v-menu>
            </v-col>
            <v-col cols="11" sm="6">
              <v-autocomplete
                v-model="state.user.country"
                :items="state.countries"
                item-title="name"
                item-value="name"
                label="País"
                density="compact"
                variant="solo-filled"
                class="mr-2"
              >
                <template v-slot:item="{ props, item }">
                  <v-list-item
                    v-bind="props"
                    :prepend-avatar="item.raw.flags"
                    :title="item.raw.name"
                  ></v-list-item>
                </template>
              </v-autocomplete>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="state.user.phoneNumber"
                label="Telefone"
                variant="solo-filled"
                density="compact"
                type="text"
                v-mask="
                  state.user.country === 'Brazil'
                    ? '(##) #####-####'
                    : state.user.country === 'Portugal'
                      ? '### ### ###'
                      : ''
                "
              />
            </v-col>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
    <div style="flex: 1; text-align: right">
      <v-btn color="primary" @click="submit"> Salvar </v-btn>
    </div>
  </div>
</template>
