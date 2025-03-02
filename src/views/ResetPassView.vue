<script setup lang="ts">
</script>

<template>
  <div class="d-flex align-center" style="height: 100vh">
    <v-sheet width="40%" class="mx-auto bg-transparent">
    <v-stepper theme="dark" :items="['Step 1', 'Step 2', 'Step 3']">
  <template v-slot:item.1>
    <v-card title="Redefina aqui a sua senha" flat>
    <v-form ref="form">
      <v-row>
          <v-text-field
            label="Email"
            variant="solo-filled"
            density="compact"
            type="email"
            theme="dark"
            required>
          </v-text-field>
      </v-row>
      <v-row>
          <v-text-field
            label="Data de nascimento"
            variant="solo-filled"
            density="compact"
            type="date"
            theme="dark"
            required>
          </v-text-field>
      </v-row>
    </v-form>
    </v-card>
  </template>

  <template v-slot:item.2>
    <v-card title="Step Two" flat>...</v-card>
  </template>

  <template v-slot:item.3>
    <v-card title="Step Three" flat>...</v-card>
  </template>
</v-stepper>


 <!--  <v-stepper theme="dark" :items="['Passo 1', 'Passo 2', 'Passo 3']">
    <v-sheet width="40%" class="mx-auto bg-transparent">
    <h1 class="mb-5">Redefina aqui a sua senha </h1> <!-- como se fosse uma div
    <v-form ref="form">
      <v-row>
          <v-text-field
            label="Email"
            variant="solo-filled"
            density="compact"
            type="email"
            theme="dark"
            required>
          </v-text-field>
      </v-row>
      <v-row>
          <v-text-field
            label="Data de nascimento"
            variant="solo-filled"
            density="compact"
            type="date"
            theme="dark"
            required>
          </v-text-field>
      </v-row>
      <v-row>
        <v-col class="text-right mb-1">
          <v-btn color="primary" style="cursor: pointer">BOTÃO AQUI</v-btn>
        </v-col>
        </v-row>
    </v-form>
  </v-sheet>
  </v-stepper> -->
</v-sheet>
  </div>
</template>
