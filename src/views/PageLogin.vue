<script lang="ts" setup>
import { reactive, ref } from 'vue';

const form = reactive({
  email: '',
  password: ''
});

const isPassVisible = ref(false);
</script>

<template>
  <div class="h-100 d-flex align-center justify-center">
    <v-card class="pa-10"
            max-width="448"
            width="448">
      <v-card-title class="text-center mb-7">
        <img src="/src/assets/images/logo.svg" alt="Потеряшки">
      </v-card-title>

      <v-form @submit.prevent>
        <v-text-field label="Email" variant="outlined" />
        <v-text-field
          label="Password"
          variant="outlined"
          class="mb-5"
          :type="isPassVisible ? 'text' : 'password'"
          :append-inner-icon="isPassVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
          @click:append-inner="isPassVisible = !isPassVisible" />

        <v-btn
          block
          color="success"
          size="large"
          type="submit"
          variant="elevated"
        >
          Войти
        </v-btn>
      </v-form>
    </v-card>
  </div>
</template>
