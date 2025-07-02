import axios from "axios";
import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  CreateAxiosDefaults,
} from "axios";

import i18n from "@/plugins/i18-n";
import { useAuthStore } from "@/stores/auth";
import router from "@/router";
export const useApi = (apiUrl?: string) => {
  const BaseUrl = apiUrl || import.meta.env.VITE_APP_BASE_URL;
  const authStore = useAuthStore();
  const { locale } = i18n.global;
  const $service = (config?: CreateAxiosDefaults): AxiosInstance => {
    const headers = {
      ...config?.headers,
    };
    Object.assign(headers, {
      "Accept-language": locale.value,
    });
    const token = authStore.getTokens();
    if (token) {
      Object.assign(headers, {
        Authorization: `Bearer ${token}`,
        UserId: authStore.user?.data?.data?.id,
      });
    }
    const _axios = axios.create({
      ...config,
      baseURL: BaseUrl,
      headers,
    });
    _axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response.status === 401) {
          localStorage.removeItem("access_token");
          await router.push({ name: "Home" });
        }
        throw error;
      },
    );
    // _axios.interceptors.request.use((config) => {
    //   abortController =  new AbortController();
    //   config.signal = abortController.signal;
    //   config.cancelToken = cancelToken.token;
    //   console.log(config);
    //   return config;
    // });
    return _axios;
  };

  function $get<R = unknown>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<R>> {
    return new Promise((resolve, reject) => {
      $service()
        .get<R>(url, config)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  }

  function $delete<R = unknown>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<R>> {
    return new Promise((resolve, reject) => {
      $service()
        .delete<R>(url, config)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  }

  function $post<R = unknown, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<R>> {
    return new Promise((resolve, reject) => {
      $service()
        .post<R>(url, data, config)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  }

  function $put<R = unknown, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<R>> {
    return new Promise((resolve, reject) => {
      $service()
        .put<R>(url, data, config)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  }

  function $patch<R = unknown, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<R>> {
    return new Promise((resolve, reject) => {
      $service()
        .patch<R>(url, data, config)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  }

  return { $get, $delete, $post, $patch, $put };
};
