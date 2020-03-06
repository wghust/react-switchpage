import './index.styl';

class Con extends React.Component {
  constructor (props) {
    super(props);
    this.state = {};
  }

  render () {
    const classList = 'com-con ' + this.props.className;
    return (
      <div className={classList}>
        {this.props.children}
      </div>
    );
  }
};

class ConHeader extends React.Component {
  constructor (props) {
    super(props);
    this.state = {};
  }

  render () {
    return (
      <div className='com-con-header'>
        {this.props.children}
      </div>
    );
  }
};

class ConFooter extends React.Component {
  constructor (props) {
    super(props);
    this.state = {};
  }

  render () {
    return (
      <div className='com-con-footer'>
        {this.props.children}
      </div>
    )
  }
}

class ConMain extends React.Component {
  constructor (props) {
    super(props);
    this.state = {};
  }

  render () {
    return (
      <div className='com-con-main'>
        {this.props.children}
      </div>
    )
  }
}

export {
  Con,
  ConHeader,
  ConFooter,
  ConMain
};