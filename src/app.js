// 路由插件
import switchPage from '@tbj/switchpage';
// 公共组件配置工具
import GlobalCom from 'components/globalcom';
// 加载公共组件
import Alert from '@tbj/wheel/components/alert';
import Toast from '@tbj/wheel/components/toast';
import Loading from '@tbj/wheel/components/loading';
// 通用css
import 'base/base.styl';
// 路由配置
import Router from './routers/index';

// 全局化组件
GlobalCom({
  xAlert: Alert,
  xToast: Toast,
  xLoader: Loading
});

window.switchPage = switchPage;

switchPage.init({
  pageList: Router
}).then(() => {
  // 根据配置的key前往相应页面
  switchPage.go('bindcard')
});