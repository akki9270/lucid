export class Patient {
  patient_id: string;
  intake_id: string;
  first_name: string;
  last_name: string;
  health_plan: string;
  days_of_soc: number;
  dob: string;
  gender: string;
  phone_number: string;
  address: string;
  city: string;
  state: string;
  zipcode: string;
  insurance_name: string;
  subscribe_id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  key_indicator: any;
  service: any;

  constructor(patient_id: string, intake_id: string, first_name: string, last_name: string,
    health_plan: string, days_of_soc: number, dob: string, gender: string,
    phone_number: string, address: string, city: string, state: string,
    zipcode: string, insurance_name: string, subscribe_id: string, createdAt: string,
    updatedAt: string, deletedAt: string, key_indicator: any,service: any) {
    this.patient_id = patient_id;
    this.intake_id = intake_id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.health_plan = health_plan;
    this.days_of_soc = days_of_soc;
    this.dob = dob;
    this.gender = gender;
    this.phone_number = phone_number;
    this.address = address;
    this.city = city;
    this.state = state;
    this.zipcode = zipcode;
    this.insurance_name = insurance_name;
    this.subscribe_id = subscribe_id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
    this.key_indicator = key_indicator;
    this.service = service;
  }

}