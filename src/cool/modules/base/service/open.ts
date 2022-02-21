import { BaseService } from "/@/cool";

class Open extends BaseService {
	/**
	 * 用户登录
	 *
	 * @param {*} { username, password, captchaId, verifyCode }
	 * @returns
	 * @memberof CommonService
	 */
	userLogin({ username, password }: any) {
		return this.request({
			url: "/login",
			method: "POST",
			data: {
				username,
				password
			}
		});
	}

	/**
	 * 刷新 token
	 * @param {string} token
	 */
	refreshToken(token: string) {
		return this.request({
			url: "/refreshToken",
			params: {
				refreshToken: token
			}
		});
	}
}

export default Open;
