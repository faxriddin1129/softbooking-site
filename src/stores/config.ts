import { defineStore } from "pinia";
import type {IHistoryTicket} from "@/types";

export const useConfigStore = defineStore('configStore', {
    state: () => ({
        mode: 'dark',
        currency: localStorage.getItem('currency') || 'UZS',
        locale: localStorage.getItem('locale') || 'ru',
        historyData: [] as IHistoryTicket[] | null,
        historyGetStatus:true,
    })
})