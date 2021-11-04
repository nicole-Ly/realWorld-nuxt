import axios from 'axios'
export const request = axios.create({
  baseURL: 'https://conduit.productionready.io'
});

export default ({ store }) => {//插件拿到上下文
  request.interceptors.request.use(function (config) {
    const { user } = store.state;
    if (user && user.token) {
      config.headers.Authorization = `Token ${user.token}`
    }
    return config;
  }, function (error) {
    return Promise.reject(error);
  });
}