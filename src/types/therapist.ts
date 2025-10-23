export interface Therapist {
  id: string;
  name: string;
  credentials: string;
  photo?: string;
  rating: number;
  reviewCount: number;
  distance: number;
  lat: number;
  lng: number;
  specializations: string[];
  modalities: string[];
  languages: string[];
  insurance: string[];
  inPerson: boolean;
  telehealth: boolean;
  acceptingNew: boolean;
  nextAvailable?: string;
  yearsExperience: number;
  bio: string;
  feeRange: string;
  phone: string;
  email: string;
  website?: string;
  address: string;
  verified: boolean;
  schedule: {
    [key: string]: string;
  };
}

export interface FilterState {
  radius: number;
  inPerson: boolean;
  telehealth: boolean;
  specializations: string[];
  insurance: string;
  languages: string[];
  priceRange: [number, number];
  acceptingNew: boolean;
  gender?: string;
}
