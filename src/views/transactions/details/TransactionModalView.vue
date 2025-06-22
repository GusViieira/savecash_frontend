<script setup lang="ts">
import LoadingComponent from '@/components/LoadingComponent.vue'
import ModalPersonalized from '@/components/ModalPersonalized.vue'
import { ref } from 'vue'

const isRevenue = ref(true)
const isExpense = ref(false)

const emit = defineEmits<{
  (e: 'close', value: boolean): void
}>()
</script>
<template>
  <LoadingComponent />
    <ModalPersonalized
      title="Novo Lançamento"
      icon="mdi-bank-transfer"
      width="650"
      @close="(v) => emit('close', v)"
    >
      <template #default>
        <v-row>
          <v-col cols="12" sm="6">
            <v-btn
              class="mr-1"
              :class="isRevenue ? 'button-revenue' : ''"
              :color="isRevenue ? 'lightGreen' : ''"
              text="Receita"
              variant="flat"
              @click="((isRevenue = true), (isExpense = false))"
            />
            <v-btn
              :class="isExpense ? 'button-expense' : ''"
              text="Despesa"
              variant="flat"
              :color="isExpense ? 'lightRed' : ''"
              @click="((isExpense = true), (isRevenue = false))"
            />
          </v-col>
        </v-row>
        <v-row no-gutters class="mt-3">
          <v-col cols="12" xl="4" lg="4" md="4" sm="12">
            <v-text-field
              label="Valor"
              variant="solo-filled"
              density="compact"
              type="text"
              class="mr-2"
            />
          </v-col>
          <v-col cols="12" xl="8" lg="8" md="8" sm="12">
            <v-text-field label="Descrição" variant="solo-filled" density="compact" />
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col cols="12" xl="4" lg="4" md="4" sm="12">
            <v-text-field
              label="Data"
              variant="solo-filled"
              density="compact"
              type="text"
              v-mask="'##/##/####'"
              class="mr-2"
            />
          </v-col>
          <v-col cols="12" xl="4" lg="4" md="4" sm="12">
            <v-select
              label="Categoria"
              variant="solo-filled"
              density="compact"
              :items="['Salário', 'Investimento', 'Outros']"
              class="mr-2"
            />
          </v-col>
          <v-col cols="12" xl="4" lg="4" md="4" sm="12">
            <v-select
              label="Status"
              variant="solo-filled"
              density="compact"
              :items="['Pago', 'Não pago', 'Outro']"
            />
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col cols="12" xl="12" lg="12" md="12" sm="12">
            <v-textarea
              rows="2"
              label="Anotações"
              variant="solo-filled"
              density="compact"
              type="text"
              auto-grow
            />
          </v-col>
        </v-row>
      </template>
      <template #actions>
        <v-row no-gutters align="center" class="mt-n8">
          <v-col cols="12" xl="1" lg="1" md="1" sm="12">
            <v-switch hide-details inset color="primary" />
          </v-col>
          <v-col class="pa-3" cols="12" xl="2" lg="2" md="2" sm="12">
            <span>Recorrente</span>
          </v-col>
          <v-col cols="12" xl="9" lg="9" md="9" sm="12" class="text-end pa-0">
            <v-btn class="bg-primary" color="purple" variant="text" rounded text="Salvar" />
          </v-col>
        </v-row>
      </template>
    </ModalPersonalized>
</template>
<style scoped>
.button-revenue {
  color: #005725 !important;
  font-weight: 800;
}

.button-expense {
  color: #961f1f !important;
  font-weight: 800;
}
</style>
