<script setup lang="ts">
  import { onMounted, reactive, ref, watch } from 'vue';
  import {
    ANIMAL_GENDERS,
    ANIMAL_STATUS,
    AnimalStatus,
    createAnimal,
    CategoryCode,
    fetchBreedOptions,
    GuideOptions,
    fetchSpeciesOptions,
    fetchFurOption,
    fetchColorOptions
  } from '@/services/api/animal';
  import { VDate } from '@/common/components';

  const emits = defineEmits(['close', 'success']);

  const isDialogOpen = ref(true);
  const createAnimalForm = ref<HTMLFormElement | null>(null);

  const form = reactive({
    name: '',
    gender: '' as '' | 'MALE' | 'FEMALE',
    // categoryCode: '', // из запроса
    birthdate: '2021-11-26',
    foundDate: '2021-11-26',
    speciesCode: '',
    breedCode: '',
    furCode: '',
    colorCode: '',
    status: AnimalStatus.Quarantine,                  // 'QUARANTINE'
    curatorId: 1,                 // было: curator
    photos: [] as File[],                                    // например: '10НК-2022'
    isNeedFoster: false,                              // булево поле из запроса
  });

  const cancel = () => {
    if (createAnimalForm.value) {
      createAnimalForm.value.reset();
      form.status = AnimalStatus.Quarantine;
    }

    emits('close');
  }

  const speciesOptions = ref<GuideOptions<string>[]>([]);
  const breedOptions = ref<GuideOptions<string>[]>([]);
  const furOptions = ref<GuideOptions<string>[]>([]);
  const colorOptions = ref<GuideOptions<string>[]>([]);

  const onCreateAnimal = async () => {
    const data = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      if (key === 'photos' && Array.isArray(value)) {
        value.forEach((photo: File) => {
          data.append(key, photo);
        });
      } else if (value !== null) {
        data.append(key, value.toString());
      }
    });

    if (form.speciesCode === 'dog') {
      data.append('categoryCode', CategoryCode.NewDog);
    } else {
      data.append('categoryCode', CategoryCode.NewCat);
    }

    try {
      await createAnimal(data);
      emits('success');
    } catch (e) {
      console.log(e);
    }
  };

  const getOptions = async () => {
    const [species, furTypes, colorTypes, allBreeds] = await Promise.all([
      fetchSpeciesOptions(),
      fetchFurOption(),
      fetchColorOptions(),
      fetchBreedOptions(),
    ]);

    speciesOptions.value = species;
    furOptions.value = furTypes;
    colorOptions.value = colorTypes;
    breedOptions.value = allBreeds;
  }

  watch(
    () => form.speciesCode,
    () => (form.breedCode = ''),
  );

  onMounted(async () => {
    await getOptions();
  });
</script>

<template>
  <v-dialog v-model="isDialogOpen" width="700" class="modal">
    <v-card>
      <v-card-title class="pl-7 pt-7">
        Создание карточки животного
      </v-card-title>
      <v-card-text>
        <v-form ref="createAnimalForm" class="modal__form">
          <v-text-field v-model="form.name" name="name" label="Кличка" />
          <v-select v-model="form.gender"
                    :items="ANIMAL_GENDERS"
                    item-title="text"
                    item-value="value"
                    name="gender"
                    label="Пол"
          />
          <v-date v-model="form.birthdate"
                  name="birthdate"
                  label="Дата рождения"
          />
          <v-date v-model="form.foundDate"
                  name="foundDate"
                  label="Дата находки"
          />
          <v-select v-model="form.speciesCode"
                    :items="speciesOptions"
                    item-title="title"
                    item-value="value"
                    name="speciesCode"
                    label="Вид животного"
          />
          <v-select v-model="form.breedCode"
                    :items="breedOptions"
                    item-title="title"
                    item-value="value"
                    name="breedCode"
                    label="Порода"
          />
          <v-select v-model="form.furCode"
                    :items="furOptions"
                    item-title="title"
                    item-value="value"
                    name="furCode"
                    label="Тип шерсти"
          />
          <v-select v-model="form.colorCode"
                    :items="colorOptions"
                    item-title="title"
                    item-value="value"
                    name="colorCode"
                    label="Окрас"
          />
          <v-select v-model="form.status"
                    :items="ANIMAL_STATUS"
                    item-title="text"
                    item-value="value"
                    name="status"
                    label="Статус"
          />
          <v-select v-model="form.curatorId" name="curatorId" label="Куратор" />
          <v-file-input v-model="form.photos" name="photos" label="Фото" />
        </v-form>
      </v-card-text>
      <v-card-actions class="pr-7">
        <v-btn class="ml-auto" @click="cancel">
          Отмена
        </v-btn>
        <v-btn @click="onCreateAnimal">
          Создать
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped lang="scss">
  .modal__form {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
  }
</style>
