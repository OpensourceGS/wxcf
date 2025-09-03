// 简化后的代码，只保留推送功能，采用后台请求方式
const UtoolsUtils = {
  outPlugin() {
    utools.hideMainWindow();
    utools.outPlugin();
  },
  sendPushInBackground(content) {
    // 对内容进行 URL 编码，确保 URL 格式正确
    const encodedContent = encodeURIComponent(content);
    // 手动构建查询参数
    const queryParams = [
      `group=${encodeURIComponent('Windows消息')}`,
      'autoCopy=1',
      `title=${encodeURIComponent('Windows消息')}`,
      `copy=${encodedContent}`,
      `icon=${encodeURIComponent('https://raw.githubusercontent.com/luestr/IconResource/main/Other_icon/120px/KeLee.png')}`
    ].join('&');
    // 这里自定义，icon自己选你自己喜欢的，其余参数见Bark详细文档
    // 构建最终URL
    const pushUrl = `http://---------------------------------/${encodedContent}?${queryParams}`;

    // 使用 fetch API 在后台发送 GET 请求
    fetch(pushUrl)
      .then(response => {
        if (response.ok) {
          utools.showNotification("推送内容已发送成功");
        } else {
          utools.showNotification(`推送失败: ${response.status}`);
        }
      })
      .catch(error => {
        utools.showNotification(`推送出错: ${error.message}`);
      })
      .finally(() => {
        this.outPlugin();
      });
  }
}

// 获取选中的文本
const selectedText = `${quickcommand.enterData.payload}`;

// 直接在后台发送推送
UtoolsUtils.sendPushInBackground(selectedText);
