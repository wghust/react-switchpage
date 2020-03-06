import React from 'react';
import './index.styl';
import { Con, ConMain, ConFooter } from 'components/container/index';
import FooterCon from 'components/footer/index';
import { req } from 'components/xdreq/index';

class SupportBank extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bankList: []
    };
  }

  static defaultProps = {
    PageName: 'supportbank',
    PageTitle: '支持银行'
  }

  componentWillMount () {
    xLoader.show();
    req('//xdmapi.51tule.com/appportal/wap/api/member/bindcard/banklist').then((backData) => {
      xLoader.hide();
      if (backData.code === 0) {
        this.setState({
          bankList: backData.data && backData.data.list ? backData.data.list : []
        });
      } else {
        xAlert.set(backData.errorMsg);
      }
    }, () => {
      xLoader.hide();
    });
  }

  goTo () {
    switchPage.back();
  }

  render() {
    return (
      <Con className='sb_con'>
        <ConMain>
          <section className='sb_supportbank'>
            <h3 className='retina-border-bottom'>目前仅支持以下银行的借记卡</h3>
            <ul className='clearfix'>
              {
                (this.state.bankList).map(function(bank, i) {
                  return (
                    <li>
                      <div>
                        <img src={'//xdres.51tule.com/resources/banks/' + bank.bankCode + '.png'} />
                        <h5>{ bank.bankName }</h5>
                      </div>
                    </li>
                  )
                })
              }
            </ul>
          </section>
        </ConMain>
        <ConFooter>
          <FooterCon />
        </ConFooter>
      </Con>
    );
  }
}

export default SupportBank;