<script setup lang="ts">
import type AccountResponseModel from '@/models/response/AccountResponseModel';
import { ref } from 'vue';

const saldo = ref(1234.56);

const props = defineProps<{
  account: AccountResponseModel;
}>();
</script>

<template>
  <v-card
    class="pa-4 d-flex flex-column justify-space-between"
    color="lightGrey"
    max-width="340"
    max-height="215"
    height="215"
    width="340"
    rounded="lg"
  >

  <v-row no-gutters align="center">
      <v-col cols="9">
        <h3 class="text-h6 mb-1">{{ props.account.name }}</h3>
        <h4 class="text-subtitle-2">Moeda: {{ props.account.currency }}</h4>
      </v-col>
      <v-col cols="3" class="d-flex justify-end">
        <v-icon
          size="48"
          style="color: rgba(0, 0, 0, 0.3)"
        >
          mdi-wallet-outline
        </v-icon>
      </v-col>
    </v-row>

    <div>
      <h4 class="text-subtitle-2 font-weight-bold mt-2">Conta: {{ props.account.account }}</h4>
    </div>

    <div
      class="mt-2 py-2 px-3"
      style="background: rgba(0, 0, 0, 0.15); border-radius: 8px"
    >
      <div class="text-caption" style="color: #fff; opacity: 0.7">SALDO ATUAL</div>
      <div class="text-h6" style="color: #4be27e; font-weight: bold">
        {{ saldo.toLocaleString('pt-PT', { style: 'currency', currency: 'EUR' }) }}
      </div>
    </div>
  </v-card>
</template>
