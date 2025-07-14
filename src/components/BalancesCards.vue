<script setup lang="ts">
import { accountStore as useAccountStore } from '@/stores/accountStore';


const accountStore = useAccountStore()

const props = defineProps<{
  title: string
  value: number
}>()
</script>
<template>
  <v-card variant="tonal">
    <v-card-title>
      {{ props.title }}
    </v-card-title>
    <v-card-text
      class="text-h4"
      :class="{
        'text-red': props.title === 'Saldo final' && props.value < 0,
        'text-green': props.title === 'Saldo final' && props.value > 0,
      }"
    >
      {{ props.value.toLocaleString('pt-BR', { style: 'currency', currency: accountStore.account.currency }) }}
      <span class="detail-bg d-flex float-end">$</span>
    </v-card-text>
  </v-card>
</template>
<style lang="css" scoped>
.detail-bg {
  color: white;
  position: absolute;
  right: 10px;
  top: 50%;
  font-size: 3em !important;
  margin-top: -72px;
  opacity: 0.1;
}
</style>
