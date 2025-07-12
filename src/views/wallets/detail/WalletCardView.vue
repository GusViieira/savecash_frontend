<script setup lang="ts">
import { ref } from 'vue'

const saldo = ref(1234.56)

</script>

<template>
  <v-card class="pa-5" color="lightGrey" max-width="440" max-height="250" rounded="lg">
    <!-- Cabeçalho com título, subtítulo e ícone -->
    <v-row class="px-2">
      <v-col cols="12" sm="12" md="6" lg="9">
        <span>
          <h3>Conta de Família</h3>
        </span>
        <span>
          <h4>Moeda: EUR</h4>
        </span>
      </v-col>
      <v-col class="mt-n2" cols="12" sm="12" md="6" lg="3">
        <v-icon style="color: rgba(0, 0, 0, 0.3)" size="115" class="ml-n4">
          mdi-wallet-outline
        </v-icon>
      </v-col>
    </v-row>

    <!-- Saldo atual destacado -->
    <v-row>
      <v-col cols="12" sm="12" md="6" lg="7">
        <v-card-text class="mt-8">
          <h4 style="font-weight: bold">Conta: 002000329183</h4>
        </v-card-text>
      </v-col>
      <v-col cols="12" sm="12" md="6" lg="5">
        <v-card style="background: rgba(0, 0, 0, 0.15)">
          <v-card-text class="mt-n3">
            <span style="color: #fff; opacity: 0.7; font-size: 0.7rem"> SALDO ATUAL </span>
            <div class="text-center mt-2">
              <span style="color: #4be27e; font-size: 1.2rem; font-weight: bold">
                {{ saldo.toLocaleString('pt-PT', { style: 'currency', currency: 'EUR' }) }}
              </span>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-card>
</template>
