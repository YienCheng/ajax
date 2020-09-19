/**
 * ajax
 */
window.ajaxRequest = function () {
  // 第一步:创建xhr对象
  const xhr = new XMLHttpRequest();

  // 第二步:监听服务器响应
  xhr.onreadystatechange = function () {
    // 0: 未初始化 1: 启动 2: 发送 3: 接收 4: 完成
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        console.log("请求成功");
      } else {
        console.log("请求失败");
      }
    }
  };

  // 第三步:设置请求链接
  xhr.open("post", "/ajax?username=yiencheng", true);
  xhr.setRequestHeader("Content-Type", "application/json");

  // 第四步:发送请求(如果请求方式是GET、HEAD参数将会被忽略)
  xhr.send(JSON.stringify({ age: 18 }));

  // 番外篇: 取消发送请求
  // xhr.abort();
};

/**
 * fetch
 */
window.fetchRequest = function () {
  const url = "/fetch";

  let data = {
    name: "chengyien",
  };

  // 创建请求
  const request = new Request(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  });

  // 发起请求
  fetch(request)
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.log(error);
    });
};
