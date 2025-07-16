<script setup lang="ts">
import { accountStore as useAccountStore } from '@/stores/accountStore'

const accountStore = useAccountStore()

const props = defineProps<{
  title: string
  subtitle: string
  value: number
  subvalue: number
}>()
</script>
<template>
  <v-card variant="tonal">
    <v-card-title>
      {{ props.title }}
    </v-card-title>
    <v-card-text>
      <v-row class="text-h4">
        <v-col>
          <span
            :class="{
              'text-red': props.title === 'Balanço mensal' && props.value < 0,
              'text-green': props.title === 'Balanço mensal' && props.value > 0,
            }"
          >
            {{
              props.value.toLocaleString('pt-BR', {
                style: 'currency',
                currency: accountStore.account.currency,
              })
            }}
          </span>
        </v-col>
      </v-row>

      <v-row class="mt-n4">
        <v-col>
          <span
            :class="{
              'text-red': props.subtitle === 'Saldo atual' && props.subvalue < 0,
              'text-green': props.subtitle === 'Saldo atual' && props.subvalue > 0,
            }"
          >
            {{
              props.subtitle +
              ': ' +
              Number(props.subvalue).toLocaleString('pt-BR', {
                style: 'currency',
                currency: accountStore.account.currency
              })
            }}
          </span>
        </v-col>
      </v-row>
      <span class="detail-bg float-end">$</span>
    </v-card-text>
  </v-card>
</template>
<style lang="css" scoped>
.detail-bg {
  color: white;
  position: absolute;
  right: 10px;
  top: 27%;
  font-size: 10em !important;
  margin-top: -72px;
  opacity: 0.1;
}
</style>
