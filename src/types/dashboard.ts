export interface ICalendar {
  date: string;
  id: number;
  type: "on" | "rt";
}
export interface IResponseCalendar {
  rules: IRules;
  icon: string;
  on: string[];
  rt: string[];
  type: string;
  code: string;
  message: string;
  data: ICalendar[];
}
export interface IRules {
  round_trip: { name: string; code: number }[];
  transfer: { name: string; code: string }[];
}
export interface PersonalInfo {
  type: string;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  email: string | null;
  birth: string | null;
  gender: string | null;
  citizenship: string | null;
  document_number: string | null;
  document_expire: string | null;
}
export interface ICitizenship {
  name_ru: string;
  name_en: string;
  name_uz: string;
  code: string;
}
