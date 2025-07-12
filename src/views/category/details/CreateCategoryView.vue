<script setup lang="ts">
import ModalPersonalized from '@/components/ModalPersonalized.vue'
import { ref } from 'vue'

</script>

<template>

 <ModalPersonalized
    :title="title"
    icon="mdi-bank-transfer"
    width="650"
    @close="(v) => emit('close', v)"
  >

  <template #default>
    <CreateCategoryView />

  </template>
</ModalPersonalized>

</template>
