import { BaseService, Service, Permission } from "/@/cool";

@Service("system/department")
class Department extends BaseService {
	/**
	 * 排序
	 *
	 * @returns
	 * @memberof DepartmentService
	 * @param data
	 */
	@Permission("order")
	order(data: any) {
		return this.request({
			url: "/order",
			method: "POST",
			data
		});
	}
}

export default Department;
