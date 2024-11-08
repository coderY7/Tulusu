export default function silenceUpdate(url) {
	uni.downloadFile({
		url,
		success: res => {
			if (res.statusCode === 200) {
				plus.runtime.install(
					res.tempFilePath, {
						force: true //true表示强制安装，不进行版本号的校验；false则需要版本号校验，
					},
					function() {
						uni.showModal({
							title: 'hint',
							content: 'Please restart the application',
							showCancel: false,
							success: function(res) {
								if (res.confirm) {
									// console.log('用户点击确定');
									plus.runtime.restart()
								}
							}
						});
						// console.log('install success...');
					},
					function(e) {
						console.error('install fail...');
					}
				);
			}
		}
	});
}
