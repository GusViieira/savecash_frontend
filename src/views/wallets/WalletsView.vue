<script setup lang="ts" name="WalletsView">
import { ref } from 'vue'
import WalletCardView from './detail/WalletCardView.vue';

const dialog = ref(false)
</script>

<template>
  <h1>Gerenciar contas</h1>
  <v-card>
    <v-card-title class="bg-lightGrey pt-6 px-5">
      <v-row>
        <v-col>
          <v-btn class="button" color="primary" rounded="xl" @click="dialog = true">
            Criar conta <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-text class="pa-5">
      <v-col>
        <v-row>
          <v-col>
            <WalletCardView>
            </WalletCardView>
          </v-col>
          <v-col>
            <WalletCardView>
            </WalletCardView>
          </v-col>
        </v-row>
      </v-col>
      teste
    </v-card-text>
  </v-card>
  <v-dialog v-model="dialog" max-width="600" />
</template>
