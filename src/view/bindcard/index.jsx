import React from 'react';
import { req } from 'components/xdreq/index';
import './index.styl';
import { Con, ConMain, ConFooter } from 'components/container/index';
import FooterCon from 'components/footer/index';
import Button from '@tbj/wheel/components/button';

class BindCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '铜板街',
      idCardNo: '111*1212',
      buttonStatus: false,
      smsword: '获取验证码',
      smsstate: 0,
      hasSendCode: false,
      mobile: '',
      times: 60,
      errorMsg: '',
      bankMsg: { // 卡bin 信息
        bankCode: '',
        bankName: '',
        cardType: ''
      },
      bankNo: {
        value: '',
        inputValue: ''
      },
      lowerFlag: true,
      cardCheck: false,
      verifyCode: '',
      verifyCodeCheck: false,
      checkSelectionState: true // 是否已经校验个别手机selection状态标识
    };
  }

  static defaultProps = {
    PageName: 'bindcard',
    PageTitle: '借款申请'
  }

  componentWillMount () {
    const self = this;

    if (!self.props.depositType) {
      this.props.depositType = 1;
    }

    // xLoader.show();
    // req('//xdmapi.51tule.com/appportal/wap/api/member/userInfo').then((backData) => {
    //   xLoader.hide();
    //   if (backData.code === 0) {
    //     const data = backData.data;
    //     this.setState({
    //       name: data ? data.name : '',
    //       idCardNo: data ? data.idCardNo : ''
    //     });
    //   } else {
    //     xAlert.set(backData.errorMsg);
    //   }
    // }, () => {
    //   xLoader.show();
    // });
  }

  supportBank () {
    switchPage.go('supportbank', 'next-hover');
  }

  inputPhone = (e) => {
    const cacheValue = e.target.value;
    if (/^\+?[1-9][0-9]*$/.test(cacheValue) || cacheValue === '') {
      this.setState({
        mobile: cacheValue,
        buttonStatus: true
      });
    }
  }

  setSelectionState = (selectPosi) => {
    this.setState({ checkSelectionState: false });
    if (selectPosi === 0) {
      this.state.lowerFlag = true
    } else {
      this.state.lowerFlag = false
    }
  }

  // eslint-disable-next-line complexity
  inputCardNo = (e) => {
    // 这段逻辑来源于客户端H5绑卡插件
    const cacheValue = (e.target.value).replace(/[ ]/g, ''),
      thisInput = e.target;
    let selectPosi = thisInput.selectionStart;
    const isAdd = this.state.bankNo.value.length < cacheValue.length;
    // 根据初始返回的第一个selectionStart值判断是否是selection值异常手机
    if (this.state.checkSelectionState && thisInput.value.length === 1) {
      this.setSelectionState(selectPosi);
    }
    if (this.state.lowerFlag && isAdd) selectPosi++;
    if (this.state.lowerFlag && !isAdd && selectPosi % 5 === 0) selectPosi--;
    // 验证是否为有效数字
    if (/^\+?[1-9][0-9]*$/.test(cacheValue)) {
      // 每隔4格加一空格
      const inputValue = cacheValue.replace(/(\d{4})/g, '$1 ').replace(/\s*$/, '');
      // 若遇空位则光标+1
      if (inputValue.length > 1 && selectPosi % 5 === 0 && isAdd) {
        selectPosi++;
      }
      this.setState({
        bankNo: { value: cacheValue, inputValue: inputValue },
        errorMsg: '',
        bankMsg: {
          bankCode: '',
          bankName: '',
          cardType: ''
        },
        cardCheck: true
      });
    } else if (!cacheValue) {
      this.setState({
        bankNo: { value: '', inputValue: '' }
      });
    }
  }

  // 银行卡号 卡bin 校验逻辑
  blurEvent = () => {
    const self = this, state = this.state;
    const cardTypes = {
      '0': '借记卡',
      '1': '信用卡'
    };
    if (state.bankNo.value.length < 15) {
      self.setState({
        errorMsg: '请按正确格式填写银行卡号'
      });
    } else {
      self.setState({
        errorMsg: ''
      });
      req('//xdmapi.51tule.com/appportal/wap/api/member/bindcard/bankmsg', {
        cardNo: state.bankNo.value
      }).then((backData) => {
        if (backData.code === 0) {
          const data = backData.data;
          this.setState({
            bankMsg: {
              bankCode: data.bankCode,
              bankName: data.bankName,
              cardType: cardTypes[data.cardType]
            },
            cardCheck: true
          });
        } else {
          this.setState({
            errorMsg: backData.errorMsg,
            bankMsg: {
              bankCode: '',
              bankName: '',
              cardType: ''
            },
            cardCheck: false
          })
        }
      });
    }
  }

  confirm = () => {
    if (this.state.bankNo.value.length < 15) {
      xAlert.set('请输入正确的银行卡号')
    } else if (this.state.mobile.length != 11) {
      xAlert.set('请输入正确的手机号')
    } else {
      loader.show();
      const param = {
        mobile: this.state.mobile,
        cardNo: this.state.bankNo.value,
        bankCode: this.state.bankMsg.bankCode,
        bankName: this.state.bankMsg.bankName,
        bindType: 0,
        tjbPayUserId: this.state.tjbPayUserId,
        bindCardOrderId: this.state.bindCardOrderId
      };

      if (this.props.depositType === 2) {
        param['code'] = this.state.verifyCode
      }

      xLoader.show();
      req('//xdmapi.51tule.com/appportal/wap/api/member/bindcard/auth', param).then((backData) => {
        xLoader.hide();
        if (backData.code === 0) {
          if (backData.data.status === 2) {
            window.location.href = backData.data.url;
          } else {
            // 1 ： 绑卡成功, 3 ： 用户已绑卡, -1 ： 绑卡失败， 展示errorMsg
            switchPage.replace('bindcardresult', 'next', {
              'data': backData.data,
              'depositType': this.props.depositType
            });
          }
        } else {
          xAlert.set(backData.errorMsg);
        }
      }, () => {
        xLoader.hide();
      });
    }
  }

  /** ******************** 老存管逻辑 start *******************/

  // 触发验证码动作
  preSendCode = () => {
    if (this.state.bankNo.value.length < 15) {
      xAlert.set('请输入正确的银行卡号')
    } else if (this.state.mobile.length != 11) {
      xAlert.set('请输入正确的手机号')
    } else {
      this.sendCode()
    }
  }
  // 发送验证码
  sendCode = () => {
    const self = this;
    if (this.state.smsstate == 1) return;

    this.setState({
      smsword: '正在发送...',
      smsstate: 1
    });

    req('//xdmapi.51tule.com/appportal/wap/api/member/bindcard/getcode', {
      mobile: this.state.mobile,
      cardNo: this.state.bankNo.value,
      bindType: 0
    // eslint-disable-next-line complexity
    }).then(function(backData) {
      const result = backData;
      if (result.code === 0 && result.data.status === 1) {
        self.setState({
          hasSendCode: true,
          ...result.data
        });
        self.cuntDown();
      } else if (result.code === 0 && result.data.status === 3) {
        window.location.href = '//xdm.51tule.com/loan/index.html';
      } else if (result.code !== 0 || result.code === 0 && result.data.status === '-1') {
        xAlert.set(result.errorMsg || result.data.errorMsg);
        self.setState({
          smsword: '获取验证码',
          smsstate: 0
        });
      }
    });
  }

  inputCode = (e) => {
    const verifyCode = e.target.value;
    this.setState({
      verifyCode: e.target.value,
      verifyCodeCheck: verifyCode.length >= 4 && this.state.hasSendCode
    });
  }
  //
  cuntDown() {
    const self = this;
    const timer = setInterval(function() {
      const times = self.state.times - 1;
      if (times === 0) {
        clearInterval(timer);
        self.setState({
          smsword: '获取验证码',
          smsstate: 0,
          times: 60
        });
      } else {
        self.setState({
          smsword: '重发(' + times + 's)',
          times: times
        });
      }
    }, 1000);
  }
  /** ******************** 老存管逻辑 end *******************/

  // eslint-disable-next-line complexity
  render() {
    let tipTpl = '';
    const smsClass = this.state.smsstate === 0 ? '' : 'disable';
    const state = this.state;
    if (state.errorMsg) {
      tipTpl = <div className='bc_info_item'>
        <p className='error_msg'>{state.errorMsg}</p>
      </div>;
    }
    if (state.bankMsg.bankCode) {
      tipTpl = <div className='bc_info_item'>
        <img style={{ width: '28px', height: '28px' }} src={'//xdres.51tule.com/resources/banks/' + state.bankMsg.bankCode + '.png'} />
        <span style={{ left: 26, fontSize: '16px', color: '#666' }}> {state.bankMsg.bankName} {state.bankMsg.cardType}</span>
      </div>
    }

    const isEnabled = this.props.depositType === 1 ? (this.state.buttonStatus && this.state.cardCheck) : (this.state.buttonStatus && this.state.cardCheck && this.state.verifyCodeCheck)

    return (
      <Con className='bc_con'>
        <ConMain>
          <section className='bc_cardTip'>
            <i></i>
            <p>请绑定本人的银行卡</p>
            <h3 onClick={this.supportBank}>支持银行</h3>
          </section>

          <section className='bc_info' style={{ marginTop: '8px' }}>
            <div className='bc_info_item retina-border-bottom'>
              <h3>姓名</h3>
              <p>{this.state.name}</p>
            </div>
            <div className='bc_info_item'>
              <h3>身份证号</h3>
              <p>{this.state.idCardNo}</p>
            </div>
          </section>
          {/* 新增卡bin 校验  & 卡号异常信息由弹框改为底部文案显示 */}
          <section className='bc_info' style={{ marginTop: '8px' }}>
            <div className='bc_info_item'>
              <h3>卡号</h3>
              <input type='tel' maxLength='29' placeholder='请输入银行卡号' value={this.state.bankNo.inputValue} onChange={this.inputCardNo} onBlur={this.blurEvent}/>
            </div>
            <div className='retina-border-bottom'></div>
            {tipTpl}
          </section>

          <section className='bc_info' style={{ margin: '8px 0 30px' }}>
            <div className='bc_info_item retina-border-bottom'>
              <h3>手机号</h3>
              <input type='tel' placeholder='请输入手机号' value={this.state.mobile} onChange={this.inputPhone} maxLength='11' />
            </div>
            {/* 兼容老存管逻辑 */}
            {
              this.props.depositType === 2 &&
              <div className='bc_info_item'>
                <h3>验证码</h3>
                <input type='tel' placeholder='请输入短信验证码' maxLength='6' value={this.state.verifyCode} onChange={this.inputCode} />
                <span className={smsClass} onClick={this.preSendCode}>{this.state.smsword}</span>
              </div>
            }
          </section>
          <section style={{
            padding: '2px 16px'
          }}>
            <Button
              bgColor='#4162FF'
              text='下一步'
              disabled={!isEnabled}
              onClick={this.confirm} />
          </section>
        </ConMain>
        <ConFooter>
          <FooterCon style={{
            'background-color': '#f4f4f5'
          }}/>
        </ConFooter>
      </Con>
    );
  }
}

export default BindCard;