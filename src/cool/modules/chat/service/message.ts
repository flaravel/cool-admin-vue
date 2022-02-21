import { BaseService, Service, Permission } from "/@/cool";

@Service({
	namespace: "im/message",
	mock: true
})
class ImMessage extends BaseService {
	@Permission("read")
	read(data: any) {
		return this.request({
			url: "/read",
			method: "POST",
			data
		});
	}
}

export default ImMessage;
