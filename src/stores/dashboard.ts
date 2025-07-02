import { defineStore } from "pinia";
import { useApi } from "@/composables/useApi";
// import { IResponse } from "@/types";
// import { IResponseCalendar, IRules } from "@/types/dashboard";

export const useDashboardStore = defineStore("dashboardStore", {
  state: () => ({
    calendarDates: {} as IResponseCalendar,
    rules: {} as IRules,
    loading: false,
    // citizenship: null as ICitizenship[] | null,
  }),
  actions: {
    getTourCalendarData(
      departure: string,
      location_id: string,
      type: string | undefined,
    ): Promise<IResponseCalendar> {
      return new Promise((resolve, reject) => {
        useApi()
          .$get<IResponseCalendar>(`/v1/flight/charter-loc`, {
            params: {
              departure,
              location_id,
              type,
            },
          })
          .then((res) => {
            this.calendarDates = res.data;
            this.rules = res?.data?.rules;
            resolve(res.data);
          })
          .catch((err) => {
            this.calendarDates = {};
            reject(err);
          });
      });
    },
    getCitizenship() {
      return new Promise((resolve, reject) => {
        useApi()
          .$get<IResponse<ICitizenship[]>>("/v1/user/citizenship")
          .then((res) => {
            resolve(res);
            this.citizenship = res.data.data;
          })
          .catch((e) => {
            reject(e);
          });
      });
    },
  },
});
