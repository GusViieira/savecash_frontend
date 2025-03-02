<script setup lang="ts">
import { userStore } from '@/stores/userStore'
import { ref } from 'vue'

const store = userStore()
const router = useRouter()

import avatarSrc from '@/assets/images/avatar.svg'
import { useRouter } from 'vue-router'

const isRail = ref(true)
</script>
<template>
  <v-layout>
    <v-navigation-drawer v-model:rail="isRail" rail permanent expand-on-hover theme="dark">
      <v-list>
        <v-avatar
          :size="isRail ? 40 : 200"
          :class="isRail ? 'elevation-12 ma-2' : 'ml-6 elevation-12 ma-2'"
        >
          <v-img :src="avatarSrc" alt="Login" class="img-fluid" />
        </v-avatar>
        <v-list-item class="text-center" :subtitle="store.email" :title="store.name"></v-list-item>
      </v-list>

      <v-divider></v-divider>
      <v-list density="compact" nav>
        <v-list-item
          prepend-icon="mdi-view-dashboard-outline"
          title="Dashboard"
          value="myfiles"
          @click="router.push({ name: 'Home' })"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-cash"
          title="Lançamentos"
          value="shared"
          @click="router.push({ name: 'Transactions' })"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-cube-outline"
          title="Caixinhas"
          value="starred"
          @click="router.push({ name: 'Boxes' })"
        ></v-list-item>
      </v-list>
      <v-list-item
        prepend-icon="mdi-exit-to-app"
        title="Logout"
        @click="router.push({ name: 'Login' })"
      ></v-list-item>
    </v-navigation-drawer>
    <v-main>
      <div class="pa-8">
        <router-view />
      </div>
    </v-main>
  </v-layout>
</template>
