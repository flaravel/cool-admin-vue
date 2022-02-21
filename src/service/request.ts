import axios from "axios";
import store from "/@/store";
import { isDev } from "/@/config/env";
import { href, storage } from "/@/cool/utils";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { ElMessage } from "element-plus";

axios.defaults.timeout = 30000;
axios.defaults.withCredentials = true;

NProgress.configure({
	showSpinner: false
});

// 忽略规则
const ignore = {
	NProgress: ["/sys/info/record"],
	token: ["/login"]
};

// Request
axios.interceptors.request.use(
	(config: any) => {
		const token = store.getters.token || "";
		const tokenType = store.getters.tokenType || "Bearer";

		if (config.url) {
			if (!ignore.token.some((e) => config.url.includes(e))) {
				config.headers["Authorization"] = token;
			}

			if (!ignore.NProgress.some((e) => config.url.includes(e))) {
				NProgress.start();
			}
		}

		// 请求信息
		if (isDev) {
			console.group(config.url);
			console.log("method:", config.method);
			console.table("data:", config.method == "get" ? config.params : config.data);
			console.groupEnd();
		}

		// 验证 token
		if (token) {
			// 判断 token 是否过期
			if (storage.isExpired("token")) {
				store.dispatch("userRemove");
				return href("/login");
			}
		}
		config.headers["Authorization"] = tokenType + " " + token;
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// Response
axios.interceptors.response.use(
	(res) => {
		NProgress.done();
		const { code, data, message } = res.data;

		if (!res.data) {
			return res;
		}

		switch (code) {
			case 0:
				return data;
			default:
				return Promise.reject(message);
		}
	},
	async (error) => {
		NProgress.done();

		if (error.response) {
			const { status, config } = error.response;
			switch (status) {
				case 401:
					await store.dispatch("userRemove");
					ElMessage.error(`登录失效，请重新登录 `);
					href("/login");
					break;

				case 403:
					if (isDev) {
						ElMessage.error(`${config.url} 无权限访问！！`);
					} else {
						href("/403");
					}
					break;

				case 404:
					if (!isDev) {
						href("/404");
					}
					break;

				case 500:
					if (!isDev) {
						href("/500");
					}
					break;

				case 502:
					if (isDev) {
						ElMessage.error(`${config.url} 服务异常！！`);
					} else {
						href("/502");
					}
					break;

				default:
					console.error(status, config.url);
			}
		}

		return Promise.reject();
	}
);

export default axios;
