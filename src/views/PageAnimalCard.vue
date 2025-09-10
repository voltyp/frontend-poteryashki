<script setup lang="ts">
  import { computed, onMounted, reactive, ref, watch } from 'vue';
  import {
    Animal,
    ANIMAL_GENDERS,
    ANIMAL_STATUS,
    AnimalColor,
    AnimalGender,
    AnimalPhoto,
    AnimalStatus,
    Breed,
    CategoryCode,
    fetchAnimal,
    fetchBreeds,
    fetchColorTypesList,
    fetchFurTypesList,
    fetchSpecies,
    Fur,
    Species,
  } from '@/services/api/animal';

  const props = defineProps<{
    id: number;
  }>();

  const form = reactive({
    name: '',
    gender: '',
    birthdate: '2021-11-26',
    species: null as number | null,
    breed: null as number | null,
    fur: null as number | null,
    color: null as number | null,
    status: AnimalStatus.Quarantine,
    curator: '1',
    photos: [] as File[],
  });

  const animal = ref<Animal>({
    id: 0,
    userCode: '',
    name: '',
    gender: AnimalGender.Male,
    birthdate: new Date(),
    species: 0,
    breed: 0,
    fur: 0,
    color: 0,
    status: AnimalStatus.Quarantine,
    curator: 0,
    photos: [] as AnimalPhoto[],
    categoryCode: CategoryCode.NewCat,
    foundDate: new Date(),
    isNeedFoster: true,
  });

  const speciesList = ref<Species[]>([]);
  const breedsList = ref<Breed[]>([]);
  const furTypesList = ref<Fur[]>([]);
  const colorTypesList = ref<AnimalColor[]>([]);

  const filteredBreeds = computed(() =>
    form.species
      ? breedsList.value.filter((breed) => form.species === breed.species.id)
      : breedsList.value,
  );

  const isLoading = ref(true);
  onMounted(async () => {
    const [
      species,
      furTypes,
      colorTypes,
      allBreeds,
      animalData,
    ] = await Promise.all([
        fetchSpecies(),
        fetchFurTypesList(),
        fetchColorTypesList(),
        fetchBreeds(),
        fetchAnimal(props.id),
      ]);

    speciesList.value = species;
    furTypesList.value = furTypes;
    colorTypesList.value = colorTypes;
    breedsList.value = allBreeds;
    animal.value = animalData;

    isLoading.value = false;
  });
  watch(
    () => form.species,
    () => (form.breed = null),
  );
</script>

<template>
  <div class="animal-card">
    <img :src="`http://localhost:3000/${animal.photos[0].path}`"
         alt="imgAnimal">
    <v-form ref="createAnimalForm" class="modal__form">
      <v-text-field v-model="animal.name"
                    name="name"
                    label="Кличка"
      />
      <v-select v-model="animal.gender"
                :items="ANIMAL_GENDERS"
                item-title="text"
                item-value="value"
                name="gender"
                label="Пол"
      />
      <div>
        <span>Дата рождения</span>
        <v-date-picker v-model="animal.birthdate" />
      </div>
      <v-select v-model="animal.species"
                :items="speciesList"
                item-title="value"
                item-value="id"
                name="species"
                label="Вид животного"
      />
      <v-select v-model="animal.breed"
                :items="filteredBreeds"
                item-title="value"
                item-value="id"
                name="breed"
                label="Порода"
      />
      <v-select v-model="animal.fur"
                :items="furTypesList"
                item-title="value"
                item-value="id"
                name="fur"
                label="Тип шерсти"
      />
      <v-select v-model="animal.color"
                :items="colorTypesList"
                item-title="value"
                item-value="id"
                name="color"
                label="Окрас"
      />
      <v-select v-model="animal.status"
                :items="ANIMAL_STATUS"
                item-title="text"
                item-value="value"
                name="status"
                label="Статус"
      />
      <v-select v-model="animal.curator"
                name="curator"
                label="Куратор"
      />
      <!--    <v-file-input v-model="form.photos" name="photos" label="Фото" />-->
    </v-form>
  </div>
</template>

<style scoped lang="scss">
  .animal-card {
    display: grid;
    grid-template-columns: 300px 1fr;
    gap: 30px;
  }
</style>
