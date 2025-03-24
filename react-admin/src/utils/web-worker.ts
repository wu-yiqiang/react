self.onmessage = function (e) {
	console.log('接收到主线程消息:', e.data);
	const result = complexComputation(e.data);
	// 计算完成后，发送结果回主线程
	self.postMessage(result);
};

function complexComputation(data) {
	let sum = 0;
	for (let i = 0; i < data.count; i++) {
		sum += i;
	}
	return sum;
}
