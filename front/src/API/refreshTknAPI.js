import { proxyServerAxios } from "./models";

export const refreshTokenAPI = {
  refreshToken: async () => {
    try {
      const { data: newAccessTkn } = await proxyServerAxios.get();
      return newAccessTkn;
    } catch (error) {
      return error;
    }
  },
};
