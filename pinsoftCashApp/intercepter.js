export const createAxiosInterceptor = (api, token) => {
  const interceptRequest = (config) => {
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    config.headers['Accept'] = 'application/json';
    config.headers['Content-Type'] = 'application/json';

    return config;
  };

  const interceptError = (error) => {
    return Promise.reject(error);
  };

  api.interceptors.request.use(interceptRequest, interceptError);
};
