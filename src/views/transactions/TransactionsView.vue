<script setup lang="ts" name="LoginView">
import { ref } from 'vue'
import TransactionModalView from './details/TransactionModalView.vue'
import TransactionTableView from './details/TransactionTableView.vue'

const dialog = ref(false)
const typeTransaction = ref(1)

const handleDialog = (value: number) => {
  dialog.value = true
  typeTransaction.value = value === 1 ? 1 : 2
  return
}
</script>

<template>
  <v-card>
    <v-card-title class="bg-lightGrey pa-5">
      <v-row>
        <v-col>
          <v-menu transition="slide-y-transition">
            <template v-slot:activator="{ props }">
              <v-btn color="primary" v-bind="props" rounded="xl">
                {{ 'Registrar' }}
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item value="fixed-item">
                <v-list-item-title @click="handleDialog(1)">
                  <v-icon color="green" left>mdi-arrow-up</v-icon>
                  <span class="ml-2">Receita</span>
                </v-list-item-title>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item>
                <v-list-item-title @click="handleDialog(2)">
                  <v-icon color="red" left>mdi-arrow-down</v-icon>
                  <span class="ml-2">Despesa</span>
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>

        <v-col cols="12" sm="12" md="6" lg="3" class="text-right">
          <v-btn class="button" color="primary" icon size="small">
            <v-icon class="pa-5">mdi-filter-variant</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-text class="pa-5">
      <TransactionTableView :update-view="!dialog" />
    </v-card-text>
  </v-card>
  <v-dialog v-model="dialog" max-width="600">
    <TransactionModalView :type="typeTransaction" @close="(v) => (dialog = v)" />
  </v-dialog>
</template>
<style lang="scss" scoped></style>
