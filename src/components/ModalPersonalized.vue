<script setup lang="ts">
const props = defineProps<{
  icon: string
  title: string
}>()

const emit = defineEmits<{
  (e: 'close', value: boolean): void
}>()
</script>

<template>
  <v-card class="mx-auto" color="secondary" max-width="850" min-height="300" variant="flat">
    <v-sheet color="third">
      <v-card-item>
        <template v-slot:prepend>
          <v-card-title>
            <v-icon :icon="props.icon" start></v-icon>
            <span class="text-h6">{{ props.title }}</span>
          </v-card-title>
        </template>

        <template v-slot:append>
          <v-btn
            class="bg-primary"
            color="purple"
            variant="text"
            size="20"
            icon
            @click="emit('close', false)"
          >
            <v-icon size="16">$close</v-icon>
          </v-btn>
        </template>
      </v-card-item>
    </v-sheet>
    <v-card-text class="pa-3">
      <slot></slot>
    </v-card-text>
    <v-card-actions class="pa-3">
      <slot name="actions"> </slot>
    </v-card-actions>
  </v-card>
</template>
<style lang="scss" scoped></style>
