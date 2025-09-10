type TypeId = number;
type BreedId = number;
type FurId = number;
type ColorId = number;
type CuratorId = number;

export enum AnimalStatus {
  FindingOwner = 'FINDING_OWNER',
  Lost = 'LOST',
  OwnerFound = 'OWNER_FOUND',
  Quarantine = 'QUARANTINE',
  Check = 'CHECK',
  RainbowRoad = 'RAINBOW_ROAD',
  Deleted = 'DELETED',
}

export interface Species {
  id: number;
  value: string;
}

export interface Breed {
  id: number;
  value: string;
  species: Species;
}

export interface GuideOptions<T> {
  title: string;
  value: T;
}

export interface Breed {
  id: number;
  value: string;
  species: Species;
}

export interface Fur {
  id: number;
  value: string;
  species: Species;
}

export interface AnimalColor {
  id: number;
  value: string;
  species: Species;
}

export enum CategoryCode {
  NewCat = 'NEW_CAT',
  NewDog = 'NEW_DOG',
}

export enum AnimalGender {
  Male = 'MALE',
  Female = 'FEMALE',
}

export interface AnimalPhoto {
  id: string;
  originalName: string;
  path: string;
}

export interface Animal {
  readonly id: number;
  readonly categoryCode: CategoryCode;
  readonly userCode: string;
  readonly species: TypeId;
  readonly name: string;
  readonly gender: AnimalGender;
  readonly birthdate: Date;
  readonly breed: BreedId;
  readonly fur: FurId;
  readonly color: ColorId;
  readonly status: AnimalStatus;
  readonly foundDate: Date;
  readonly placeDiscovery?: string;
  readonly dateDiscovery?: string;
  readonly specialFeatures?: string;
  readonly furtherInformation?: string;
  readonly isNeedFoster: boolean;
  readonly photos?: AnimalPhoto[];
  readonly curator?: CuratorId;
}
