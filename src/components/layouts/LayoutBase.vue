<script setup lang="ts">
import { userStore } from '@/stores/userStore'
import { onMounted, ref, watch } from 'vue'
import avatarSrc from '@/assets/images/avatar.svg'
import { useRouter } from 'vue-router'
import { useTheme } from 'vuetify'

const theme = useTheme()
const store = userStore()
const router = useRouter()

const isRail = ref(true)

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
watch(() => theme.global.name.value, applyThemeToBody)
onMounted(() => applyThemeToBody(savedTheme))
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
              <v-btn class="pa-2" variant="text" @click="logout" icon="mdi-exit-to-app"> </v-btn>
            </v-col>
          </v-slide-x-transition>
        </v-row>
      </template>
    </v-navigation-drawer>
    <v-main>
      <div class="pa-8">
        <router-view />
      </div>
    </v-main>
  </v-layout>
</template>
<style scoped>
a {
  color: #9b51e0;
  text-decoration: none;
}
</style>
