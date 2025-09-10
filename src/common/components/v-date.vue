<script setup lang="ts">
  import { ref } from 'vue'

  const props = defineProps<{
    label: string;
    name: string;
  }>();

  const model = defineModel<string | null>();

  const isOpen = ref(false);

  const toggleOpen = () => {
    isOpen.value = !isOpen.value;
  };
</script>

<template>
  <v-menu v-model="isOpen"
          :close-on-content-click="false"
          transition="scale-transition"
          location="bottom start">
    <template #activator="{ props }">
      <v-text-field v-bind="props"
                    v-model="model"
                    :name="name"
                    :label="label"
                    readonly
                    clearable
                    @click:clear="model = null"
      />
    </template>
    <v-date-picker v-model="model"
                   locale="ru-RU"
                   show-adjacent-months
                   hide-header
                   @update:model-value="toggleOpen"
    />
  </v-menu>
</template>

<style scoped lang="scss">
  /* при необходимости можно донастроить ширину меню/пикера */
</style>
