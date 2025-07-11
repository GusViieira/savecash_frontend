<script setup lang="ts">
import { defineProps, defineEmits, ref, watch } from 'vue'
import { VDialog, VCard, VCardText, VCardActions, VSpacer } from 'vuetify/components'

const props = defineProps<{
  title: string
  text: string
  alert: boolean
}>()

const emit = defineEmits<{
  (e: 'close', value: boolean): void
  (e: 'confirm:modelValue', value: boolean): void
}>()

const localAlert = ref(props.alert)

const onConfirm = () => {
  emit('confirm:modelValue', true)
  localAlert.value = false
}

watch(() => props.alert, (newVal) => {
  localAlert.value = newVal
}, { immediate: true })

watch(localAlert, (newVal) => {
  if (newVal !== props.alert) {
    emit('close', newVal)
  }
})
</script>

<template>
  <v-dialog max-width="500" v-model="localAlert">
    <v-card :title="props.title">
      <v-card-text>
        {{ props.text }}
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="localAlert = false">Cancelar</v-btn>
        <v-btn @click="onConfirm" color="error">Confirmar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
