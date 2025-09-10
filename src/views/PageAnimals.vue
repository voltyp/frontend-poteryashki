<script lang="ts" setup>
  import { onBeforeMount, ref } from 'vue';
  import {
    deleteAnimal,
    fetchAnimals,
  } from '@/services/api/animal/services';
  import { Animal } from '@/services/api/animal';
  import AnimalModalCreate from '@/modules/animal/components/AnimalModalCreate.vue';

  const headers = [
    { title: 'Код', value: 'categoryCode' },
    { title: 'Польз-ий код', value: 'userCode' },
    { title: 'Кличка', value: 'name' },
    { title: 'Пол', value: 'gender' },
    { title: 'Возраст', value: 'birthdate' },
    { title: 'Порода', value: 'breed.name' },
    { title: 'Шерсть', value: 'fur.name' },
    { title: 'Окрас', value: 'color.name' },
    { title: 'Статус', value: 'status.name' },
    { title: 'Имя куратора', value: 'curator.lastName' },
    { title: 'Тел куратора', value: 'curator.phone' },
    { title: 'Действия', value: 'actions' },
  ];
  const items = ref<Animal[]>([]);

  const isModalOpen = ref(false);
  const isLoading = ref(false);

  onBeforeMount(async () => {
    items.value = await fetchAnimals();
  });

  async function createAnimal() {
    // createAnimal
    isModalOpen.value = true;
  }
  async function onSuccess() {
    isModalOpen.value = false;
    isLoading.value = true;
    items.value = await fetchAnimals();
    isLoading.value = false;
  }
  async function onDelete(animal: Animal) {
    await deleteAnimal(animal.id);
  }

  const openCard = (animal: Animal) => {
    console.log({ animal });
  }
</script>

<template>
  <v-btn class="mb-4" @click="createAnimal">
    Добавить животное
  </v-btn>
  <v-data-table :headers="headers"
                :items="items"
                @update:current-items="openCard"
  />
  <animal-modal-create v-if="isModalOpen"
                       @success="onSuccess"
                       @close="isModalOpen = false"
  />
</template>
