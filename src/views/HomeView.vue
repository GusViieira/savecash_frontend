<script setup lang="ts">
import { userStore } from '@/stores/userStore'

const storeUser = userStore()
</script>

<template>
  <div>
    <h1>Olá {{ storeUser.name }}</h1>
  </div>
</template>
