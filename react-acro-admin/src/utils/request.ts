// 使用单例模式封装axios请求
import { Message } from '@arco-design/web-react';
import axios, {
  AxiosResponse,
  AxiosRequestConfig,
  CancelTokenStatic,
} from 'axios';
import qs from 'qs';

class Request {
  protected baseURL: any = './';
  protected service: any = axios;
  protected pending: Array<{
    url: string;
    cancel: Function;
  }> = [];
  protected CancelToken: CancelTokenStatic = axios.CancelToken;
  protected axiosRequestConfig: AxiosRequestConfig = {};
  protected successCode: Array<Number> = [200, 201, 204];
  private static _instance: Request;

  constructor() {
    this.requestConfig();
    this.service = axios.create(this.axiosRequestConfig);
    this.interceptorsRequest();
    this.interceptorsResponse();
  }

  public static getInstance(): Request {
    // 如果 instance 是一个实例 直接返回，  如果不是 实例化后返回
    this._instance || (this._instance = new Request());
    return this._instance;
  }

  protected requestConfig(): void {
    this.axiosRequestConfig = {
      baseURL: this.baseURL,
      headers: {
        // timestamp: new Date().getTime(),
        'Content-Type': 'application/json',
      },
      transformRequest: [(obj) => qs.stringify(obj)],
      transformResponse: [
        function (data: AxiosResponse) {
          return data;
        },
      ],
      paramsSerializer: function (params: any) {
        return qs.stringify(params, { arrayFormat: 'brackets' });
      },
      timeout: 30000,
      withCredentials: false,
      responseType: 'json',
      xsrfCookieName: 'XSRF-TOKEN',
      xsrfHeaderName: 'X-XSRF-TOKEN',
      maxRedirects: 5,
      maxContentLength: 2000,
      validateStatus: function (status: number) {
        return status >= 200 && status < 500;
      },
      // httpAgent: new http.Agent({ keepAlive: true }),
      // httpsAgent: new https.Agent({ keepAlive: true }),
    };
  }

  protected interceptorsRequest() {
    this.service.interceptors.request.use(
      (config: any) => {
        this.removePending(config);
        config.CancelToken = new this.CancelToken((c: any) => {
          this.pending.push({
            url: `${config.url}/${JSON.stringify(config.data)}&request_type=${config.method
              }`,
            cancel: c,
          });
        });
        // if (UserModule?.token) {
        //   config.headers['authorization'] = UserModule.token;
        // }
        this.requestLog(config);
        return config;
      },
      (error: any) => {
        return Promise.reject(error);
      }
    );
  }

  protected interceptorsResponse(): void {
    this.service.interceptors.response.use(
      (response: any) => {
        // this.responseLog(response);
        this.removePending(response.config);
        if (this.successCode.indexOf(response.status) === -1) {
          switch (response.status) {
            case 401:
              Message.error('无效token，请重新登录');
              break;
            case 404:
              Message.error('接口不存在, 请联系后台开发人员');
              break;
            default: /* 可选的 */
              Message.error(response?.statusText ?? '发生错误');
          }
          return Promise.reject(new Error(response.message || 'Error'));
        } else {
          return response.data;
        }
      },
      (error: any) => {
        return Promise.reject(error);
      }
    );
  }

  protected removePending(config: any): void {
    for (let p in this.pending) {
      let item: any = p;
      let list: any = this.pending[p];
      if (
        list.url ===
        `${config.url}/${JSON.stringify(config.data)}&request_type=${config.method
        }`
      ) {
        list.cancel();
        console.log('=====', this.pending);
        this.pending.splice(item, 1);
        console.log('+++++', this.pending);
      }
    }
  }

  public async post(
    url: string,
    params: any = {},
    data: any = {},
    config: object = {}
  ) {
    let newUrl = url
    if (params && Object.keys(params).length) {
      const queryString = Object.entries(params)
        .reduce((acc, [key, value]) => {
          return `${acc}${key}=${value}&`;
        }, '?')
        .slice(0, -1);
      newUrl = `${url}${queryString}`;
    }
    try {
      const result = await this.service.post(
        newUrl,
        qs.stringify(data),
        config
      );
      return result.data;
    } catch (error) {
      console.error(error);
    }
  }

  public async delete(url: string, config: object = {}) {
    try {
      await this.service.delete(url, config);
    } catch (error) {
      console.error(error);
    }
  }

  public async put(url: string, data: any = {}, config: object = {}) {
    try {
      await this.service.put(url, qs.stringify(data), config);
    } catch (error) {
      console.error(error);
    }
  }

  public async get(url: string, parmas: any = {}, config: object = {}) {
    try {
      await this.service.get(url, parmas, config);
    } catch (error) {
      console.error(error);
    }
  }

  protected requestLog(request: any): void { }

  // protected responseLog(response: any): void {
  //   if (process.env.NODE_ENV === 'development') {
  //     const randomColor = `rgba(${Math.round(Math.random() * 255)},${Math.round(
  //       Math.random() * 255
  //     )},${Math.round(Math.random() * 255)})`;
  //     console.log(
  //       '%c┍------------------------------------------------------------------┑',
  //       `color:${randomColor};`
  //     );
  //     console.log('| 请求地址：', response.config.url);
  //     console.log('| 请求参数：', qs.parse(response.config.data));
  //     console.log('| 返回数据：', response.data);
  //     console.log(
  //       '%c┕------------------------------------------------------------------┙',
  //       `color:${randomColor};`
  //     );
  //   }
  // }
}

export default Request.getInstance();
