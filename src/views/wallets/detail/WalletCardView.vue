<template>
   <v-card
  class="mx-lg"
  color="lightGrey"
  max-width="450"
  min-height="200"
  rounded="lg"
>
  <!-- Cabeçalho com título, subtítulo e ícone -->
  <v-row class="d-flex justify-space-between align-center pa-4">
    <v-col cols="12" sm="12" md="6" lg="3" >
      <div class="text-caption" style="color: #fff; opacity: 0.7;">
        Conta em grupo
      </div>
      <v-card-subtitle class="pa-0" style="color: #fff; opacity: 0.6;">
        Moeda: EUR
      </v-card-subtitle>

    </v-col>
    <v-icon color="darkGrey" size="90" style="opacity: 0.6;">mdi-wallet-outline</v-icon>
  </v-row>

  <!-- Saldo atual destacado -->
  <v-row class="d-flex justify-end pr-6 pt-2">
    <v-col style="background: rgba(0,0,0,0.15); border-radius: 8px; padding: 8px 16px;">
      <div class="text-caption" style="color: #fff; opacity: 0.7;">SALDO ATUAL</div>
      <div style="color: #4be27e; font-size: 1.3rem; font-weight: bold;">2.890,00</div>
    </v-col>
  </v-row>

  <!-- Ações do card -->
  <template v-slot:actions>
     <v-card-actions class="pa-5" style="color: #fff; font-size: 1.25rem;">
        Finanças familiares
       </v-card-actions>
  </template>
</v-card>
</template>
