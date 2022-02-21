import { BaseService } from "/@/cool";

class Common extends BaseService {
	/**
	 * 文件上传模式
	 */
	uploadMode() {
		return this.request({

			url: "/uploadMode"
		});
	}

	/**
	 * 文件上传，如果模式是 cloud，返回对应参数
	 *
	 * @returns
	 * @memberof CommonService
	 */
	upload(params: any) {
		return this.request({
			url: "/upload",
			method: "POST",
			params
		});
	}

	/**
	 * 用户退出
	 */
	userLogout() {
		return this.request({
			url: "/logout",
			method: "POST"
		});
	}

	/**
	 * 用户信息
	 *
	 * @returns
	 * @memberof CommonService
	 */
	userInfo() {
		return this.request({
			url: "/user"
		});
	}

	/**
	 * 用户信息修改
	 *
	 * @param {*} params
	 * @returns
	 * @memberof CommonService
	 */
	userUpdate(params: any) {
		return this.request({
			url: "/personUpdate",
			method: "POST",
			data: {
				...params
			}
		});
	}

	/**
	 * 权限信息
	 *
	 * @returns
	 * @memberof CommonService
	 */
	permMenu() {
		return this.request({
			url: "/permmenu"
		});
	}

	/**
	 * 数据接口
	 */
	eps() {
		return this.request({
			url: "/eps"
		});
	}
}

export default Common;
