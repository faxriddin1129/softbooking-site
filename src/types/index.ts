export interface ISearchData {
  adult_qnt: number;
  child_qnt: number;
  infant_qnt: number;
  class: string;
  currency: string;
  directions: {
    departure_code: string;
    arrival_code: string;
    date: string;
  }[];
}
export interface IAviaFilter {
  sort: string;
  page: number;
  pageSize: number;
  stops: number[];
  only_baggage: number;
  airlines: string[];
  depTimes: string[];
  arrTimes: string[];
  min_price: number | undefined;
  max_price: number | undefined;
  pagination: number;
}
interface IAirline {
  name: string;
  code: string;
  status: boolean;
}
interface ITimes {
  time: string;
  status: boolean;
}
interface ISegment {
  baggage: string;
  handbag: string;
  duration: string;
  plane: string;
  class: string;
  flight: string;
  flight_number: string;
  stop_time: string;
  departure: {
    date: number;
    date_format: string;
    terminal: string;
    time: number;
    time_format: string;
    code: string;
    name: string;
    city: string;
    country: string;
    latitude: string;
    longitude: string;
  };
  arrival: {
    date: number;
    date_format: string;
    terminal: string;
    time: number;
    time_format: string;
    code: string;
    name: string;
    city: string;
    country: string;
    latitude: string;
    longitude: string;
  };
  avia_company: {
    name: string;
    code: string;
    logo: string;
    logo_mini: string;
    marketing_name: string;
  };
}
interface IOffer {
  dir_number: number;
  baggage: string;
  baggage_status: boolean;
  handbag: string;
  price: number;
  currency: string;
  duration: string;
  duration_minutes: number;
  plane: string;
  flight: string;
  flight_number: string;
  class: string;
  stops: number;
  tariff_status: boolean;
  seats: number;
  tariff: [];
  avia_company: {
    name: string;
    code: string;
    logo: string;
    logo_mini: string;
  };
  departure: {
    date: number;
    date_format: string;
    terminal: string;
    time: number;
    time_format: string;
    code: string;
    name: string;
    city: string;
  };
  arrival: {
    date: number;
    date_format: string;
    terminal: string;
    time: number;
    time_format: string;
    code: string;
    name: string;
    city: string;
  };
  segments: ISegment[];
}
export interface ITicket {
  buy_id: string;
  duration_minutes: number;
  price: number;
  currency: string;
  dir_number_1_stops: number;
  dir_number_1_baggage: string;
  dir_number_1_baggage_status: boolean;
  tariff_status: boolean;
  departure_time: string;
  arrival_time: string;
  airline_name: string;
  airline_code: string;
  offers: IOffer[];
}
export interface IResponseAll {
  code: 1;
  status: string;
  message: string;
  airlines: IAirline[];
  min_price: number;
  max_price: number;
  dir_number: number;
  departureTimes: ITimes[];
  arrivalTimes: ITimes[];
  stops: number[];
  count: number;
  request: ISearchData;
  data: {
    code: number;
    message: string;
    data: ITicket[];
    meta: {
      totalCount: number;
      pageCount: number;
      currentPage: number;
      perPage: number;
    };
  };
}
export interface ICheckUser {
  message: "ok";
  data: {
    user: boolean;
  };
}

export interface IGetTokenResponse {
  message: "ok";
  data: {
    id: number;
    user_id: number;
    token: string;
    expire: number;
  };
}
export interface IUser {
  message: string;
  data: {
    code: 1;
    message: string;
    data: {
      id: number;
      phone: null | string;
      email: string;
      password_reset_token: null;
      status: number;
      role_id: number;
      file_id: null;
      chat_id: null;
      from_id: null;
      lang: string;
      last_login: null;
      created_at: number;
      updated_at: number;
      tg_username: null;
      verification_token: string;
      stock_shop: string;
      stock_ticket: string;
      userDetail: {
        id:number,
        first_name: string
        last_name: string
        middle_name: string
        address: string
      };
    };
  };
}

export interface IBookingForm {
  reservation_id: string;
  phone: string;
  email: string;
  first_name: string;
  last_name: string;
  full_name: string;
  from_id: string | null;
  platform: string;
  passengers: IPassenger[];
}

export interface IPassenger {
  type: string;
  first_name: string;
  last_name: string;
  birth: string;
  gender: string;
  citizenship: string;
  document_number: string;
  document_expire: string;
  save?: number | boolean | null;
  index?: number | null;
}
export interface IResponse<T> {
  code: number;
  data: T;
  message: string;
}

export interface IHistoryTicket {
  date: bigint;
  data: {
    departure_code:string,
    departure_city:string,
    arrival_code:string,
    arrival_city:string,
    date:string,
    price_uzs:string,
    price_usd:string,
    airline:string,
  };
}
