<script setup lang="ts" name="LoginView">
import { ref } from 'vue'
import TransactionModalView from './TransactionModalView.vue'

const dialog = ref(false)

</script>

<template>
  <h1>Lançamentos</h1>
  <v-card>
    <v-card-title class="bg-lightGrey pt-6 px-5">
      <v-row>
        <v-col>
          <v-btn class="button" color="primary" rounded="xl" @click="dialog = true"> Registrar <v-icon>mdi-plus</v-icon> </v-btn>
        </v-col>
        <v-col cols="12" sm="12" md="6" lg="3">
          <v-text-field
            variant="outlined"
            density="compact"
            label="Filtro"
            append-inner-icon="mdi-magnify"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-text class="pa-5">
      <h1>Teste</h1>
    </v-card-text>
  </v-card>
  <v-dialog v-model="dialog" max-width="600">
    <TransactionModalView @close="(v) => (dialog = v)" />
  </v-dialog>
</template>
<style lang="scss" scoped></style>
