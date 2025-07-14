<script setup lang="ts">
import { userStore } from '@/stores/userStore'
import { onMounted, reactive, ref, watch } from 'vue'
import avatarSrc from '@/assets/images/avatar.svg'
import { useRouter } from 'vue-router'
import { useTheme } from 'vuetify'
import AccountService from '@/services/AccountService'
import type AccountResponseModel from '@/models/response/AccountResponseModel'
import { accountStore as useAccountStore } from '@/stores/accountStore'

const theme = useTheme()

const accountStore = useAccountStore()
const store = userStore()


const router = useRouter()
const accountName = ref()
const viewKey = ref(0)

const isRail = ref(true)

interface state {
  account: AccountResponseModel[]
}

const state = reactive<state>({
  account: [],
})

const savedTheme = localStorage.getItem('theme') || 'light'
theme.global.name.value = savedTheme

const applyThemeToBody = (themeName: string) => {
  document.documentElement.style.setProperty(
    '--color-background',
    themeName === 'dark' ? '#181818' : '#ffffff',
  )
}

const logout = () => {
  localStorage.removeItem('token')
  theme.global.name.value = 'dark'
  router.push({ name: 'Login' })
}

const toggleTheme = () => {
  const newTheme = theme.global.current.value.dark ? 'light' : 'dark'
  theme.global.name.value = newTheme
  localStorage.setItem('theme', newTheme)
  applyThemeToBody(newTheme)
}

const getCurrentPageTitle = () => {
  const route = router.currentRoute.value
  return route.meta?.title || route.meta?.displayName
}

const searchAccount = async () => {
  try {
    const service = new AccountService.AccountService()
    const response = await service.getAccounts(store.idUser)
    if (response.status === 200) {
      state.account = response.data.content
      accountStore.account = state.account[0]
      accountName.value = state.account[0].name
    }
    else console.error('Failed to fetch accounts:', response.status)
  } catch (error) {
    console.error('Error searching account:', error)
  }
}

watch(() => theme.global.name.value, applyThemeToBody)

const handleAccountBtn = (account: AccountResponseModel) => {
  accountStore.account = account
  accountName.value = account.name
  viewKey.value++
}

onMounted(() => {
  console.log()
  applyThemeToBody(savedTheme)
  searchAccount()
})
</script>
<template>
  <v-layout>
    <v-navigation-drawer v-model:rail="isRail" permanent expand-on-hover theme="dark">
      <v-list>
        <v-avatar
          :size="isRail ? 40 : 200"
          :class="isRail ? 'elevation-12 ma-2' : 'ml-6 elevation-12 ma-2'"
        >
          <v-img :src="avatarSrc" alt="Login" class="img-fluid" />
        </v-avatar>
        <v-slide-x-transition v-if="!isRail">
          <v-list-item
            v-if="!isRail"
            class="text-center"
            :subtitle="store.email"
            :title="store.name"
          ></v-list-item>
        </v-slide-x-transition>
      </v-list>

      <v-divider></v-divider>
      <v-list density="compact" nav>
        <v-list-item
          prepend-icon="mdi-view-dashboard-outline"
          title="Dashboard"
          value="dash"
          @click="router.push({ name: 'Home' })"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-wallet-outline"
          title="Lançamentos"
          value="transactions"
          @click="router.push({ name: 'Transactions' })"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-cube-outline"
          title="Caixinhas"
          value="boxes"
          @click="router.push({ name: 'Boxes' })"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-bullseye-arrow"
          title="Metas financeiras"
          value="goals"
          @click="router.push({ name: 'Goals' })"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-account-group-outline"
          title="Gerenciar carteiras"
          value="account-group"
          @click="router.push({ name: 'Wallets' })"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-shape-outline"
          title="Gerenciar categorias"
          value="category"
          @click="router.push({ name: 'Category' })"
        ></v-list-item>
      </v-list>
      <template v-slot:append>
        <v-row class="pa-2 justify-space-between align-center">
          <v-col cols="auto">
            <v-btn
              class="pa-2"
              variant="text"
              :icon="theme.global.current.value.dark ? 'mdi-weather-sunny' : 'mdi-weather-night'"
              @click="toggleTheme"
            >
            </v-btn>
          </v-col>
          <v-slide-x-transition v-if="!isRail">
            <v-col cols="auto">
              <v-btn
                class="pa-2"
                variant="text"
                @click="router.push({ name: 'Settings' })"
                icon="mdi-cog-outline"
              />
              <v-btn class="pa-2" variant="text" @click="logout()" icon="mdi-exit-to-app"> </v-btn>
            </v-col>
          </v-slide-x-transition>
        </v-row>
      </template>
    </v-navigation-drawer>

<v-main>
  <v-row justify="center" class="px-8">
    <v-col cols="12" sm="12" md="12" lg="12" xxl="8">

      <!-- LINHA com título e menu -->
      <v-row>
        <!-- Título à esquerda -->
        <v-col cols="12" sm="6" md="6" lg="6">
          <h1 class="pa-3">
            {{
              getCurrentPageTitle() === 'Olá, '
                ? getCurrentPageTitle() + store.name + '👋'
                : getCurrentPageTitle()
            }}
          </h1>
        </v-col>

        <!-- Botão de contas à direita -->
        <v-col cols="12" sm="6" md="6" lg="6" class="text-right mt-5">
          <v-menu transition="slide-y-transition">
            <template v-slot:activator="{ props }">
              <v-btn color="primary" v-bind="props" variant="outlined">
                {{ state.account.length > 0 ? accountName : 'Selecione uma conta' }}
                <v-icon right>mdi-chevron-down</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item value="fixed-item">
                <v-list-item-title>
                  <v-icon left>mdi-bank-plus</v-icon>
                  <span class="ml-2">Criar conta</span>
                </v-list-item-title>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item
                v-for="(account, i) in state.account"
                :key="i"
                :value="i"
              >
                <v-list-item-title @click="handleAccountBtn(account)">
                  {{ account.name }}
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>
      </v-row>

      <!-- CONTEÚDO -->
      <router-view :key="viewKey" />

    </v-col>
  </v-row>
</v-main>

  </v-layout>
</template>
<style scoped>
a {
  color: #9b51e0;
  text-decoration: none;
}
</style>
