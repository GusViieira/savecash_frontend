<script setup lang="ts">

import { userStore } from '@/stores/userStore'


const storeUser = userStore()

</script>

<template>
  <div>
    <h1>Olá, {{ storeUser.name }} 👋</h1>
  </div>


  <div>
    <p>Bem-vindo ao SaveCash, a sua plataforma de gestão financeira!</p>
    <p>Explore as funcionalidades e comece a organizar suas finanças hoje mesmo.</p>
  </div>

  <v-row>
    <v-col cols="12" sm="6" md="4" lg="3">

    </v-col>
  </v-row>
</template>
