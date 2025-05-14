//import { createAlova } from 'alova';
//import adapterFetch from 'alova/fetch';
//// import { getToken } from "@/utils/auth"
//const Alova = createAlova({
//	baseURL: '/dev-api',
//	timeout: 1000 * 60 * 5,
//	requestAdapter: adapterFetch(),
//	beforeRequest(method) {
//		method.config.headers['Content-Type'] = 'application/json;charset=utf-8';
//		// if (getToken()) {
//		//   method.config.headers['Authorization'] = 'Bearer ' + getToken()
//		// }
//	},
//	responded: {
//		onSuccess: async (response, method) => {
//			if (response.status >= 400) {
//				throw new Error(response.statusText);
//			}
//			const data = await response.json();
//			if (data.code !== 200) {
//				throw new Error(data.msg);
//			}
//			return data;
//		},
//		onError: (err: Error, method: string) => {
//			return Promise.reject(err);
//		},
//		onComplete: async (method) => {
//			// 处理请求完成逻辑
//			console.log('fff', method.config);
//			if (method.config.headers['Content-Type'] == 'blob') {
//				// return
//			}
//		},
//	},
//});
//
//export default Alova;
