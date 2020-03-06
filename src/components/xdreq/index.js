import xdReq from '@tbj/magneto/lib/xdreq';

const req = (url, options) => {
  return new Promise((reslove, reject) => {
    xdReq(url, options).then((result) => {
      if (result.statusText === 'OK') {
        const rd = result.data;
        if (rd && rd.code === 10) {
          xAlert.set('登录超时，请重新登录', () => {
            window.location.href = '//xdm.51tule.com/loan/index.html' + window.location.search;
          });
        } else if (window.urlproxy && rd && rd.code === 9999) {
          xLoader.hide();
        } else {
          reslove(rd);
        }
      } else {
        xAlert.set('服务器出错，请稍后重试');
      }
    }, (code, msg) => {
      // 处理请求失败操作
      xAlert.set(msg);
    });
  });
};

export {
  req
};