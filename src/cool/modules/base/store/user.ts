import { storage, href } from "/@/cool/utils";
import store from "/@/store";
import { Token } from "../types";

const state: any = {
	// 授权标识
	token: storage.get("token") || null,
	// 用户信息
	info: storage.get("userInfo") || {},
	tokenType: storage.get("tokenType") || ""
};

const getters = {
	userInfo: (state: any) => state.info,
	token: (state: any) => state.token,
	tokenType: (state: any) => state.tokenType
};

const actions = {
	// 用户登录
	userLogin({ commit }: any, form: any): Promise<any> {
		return store.service.base.open.userLogin(form).then((res: Token) => {
			commit("SET_TOKEN", res);
			return res;
		});
	},

	// 用户退出
	async userLogout({ dispatch }: any): Promise<any> {
		await store.service.base.common.userLogout();
		return dispatch("userRemove");
	},

	// 用户信息
	userInfo({ commit }: any): Promise<any> {
		return store.service.base.common.userInfo().then((res: any) => {
			commit("SET_USERINFO", res);
			return res;
		});
	},

	// 用户移除
	userRemove({ commit }: any) {
		commit("CLEAR_USER");
		commit("CLEAR_TOKEN");
		commit("RESET_PROCESS");
		commit("SET_MENU_GROUP", []);
		commit("SET_VIEW_ROUTES", []);
		commit("SET_MENU_LIST", 0);
	},

	// 刷新token
	refreshToken({ commit, dispatch }: any) {
		return new Promise((resolve, reject) => {
			store.service.base.open
				.refreshToken(storage.get("refreshToken"))
				.then((res: any) => {
					commit("SET_TOKEN", res);
					resolve(res.token);
				})
				.catch((err: Error) => {
					dispatch("userRemove");
					href("/login");
					reject(err);
				});
		});
	}
};

const mutations = {
	// 设置用户信息
	SET_USERINFO(state: any, val: any) {
		state.info = val;
		storage.set("userInfo", val);
	},

	// 设置授权标识
	SET_TOKEN(state: any, { token, token_type, expires_in }: Token) {
		// 请求的唯一标识
		state.token = token;
		storage.set("token", token, expires_in);
		storage.set("token_type", token_type);
	},

	// 移除授权标识
	CLEAR_TOKEN(state: any) {
		state.token = null;
		storage.remove("token");
		storage.remove("token_type");
	},

	// 移除用户信息
	CLEAR_USER(state: any) {
		state.info = {};
		storage.remove("userInfo");
	}
};

export default {
	state,
	getters,
	actions,
	mutations
};
