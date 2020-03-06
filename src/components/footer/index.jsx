import './index.styl';

class footer extends React.Component {
  constructor (props) {
    super(props);
    this.state = {};
  }

  render () {
    const styleList = this.props.style;

    return (
      <div className='com-footer-con' style={{ height: '37px', ...styleList }}>
        <p className='com-footer-tip'>Copyright@安徽图乐网络科技有限公司</p>
      </div>
    );
  }
}

export default footer;