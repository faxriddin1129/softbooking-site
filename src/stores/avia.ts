import { defineStore } from "pinia";
import { useApi } from "@/composables/useApi";
import type {IAviaFilter, IHistoryTicket, IResponseAll, ITicket} from "@/types";
import {ElNotification} from "element-plus";

export const useAviaStore = defineStore("aviaStore", {
  state: () => ({
    requestId: "",
    tickets: [] as ITicket[],
    allResponse: null as IResponseAll | null,
  }),
  actions: {
    fetchRequestId(data) {
      return new Promise((resolve, reject) => {
        useApi()
          .$post("/v1/flight/search", data)
          .then((res) => {
            this.requestId = res.data?.data?.request_id;
            resolve(res.data);
          })
          .catch((err) => {
            console.log(err);
            reject(err);
          });
      });
    },
    async fetchAviaTickets(params: IAviaFilter) {

      let error = false;
      try {
        const res = await useApi().$get<IResponseAll>("/v1/flight/get-offers", {
          params: {
            request_id: this.requestId,
            ...params,
          },
        });
        this.allResponse = res.data;


        if (params.page > 1) {
          this.tickets = [...this.tickets, ...res.data?.data.data];
        } else {
          this.tickets = res.data?.data.data;
        }
      } catch (err) {
        console.log(err);
        error = true;
      }
      if (this.allResponse?.status !== "Ready" && !error) {
        await this.fetchAviaTickets(params);
      }
    },
  },
});
