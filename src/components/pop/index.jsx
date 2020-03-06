import './index.styl';

class pop extends React.Component {
  constructor (props) {
    super(props);
    this.state = {};
  }

  render () {
    return (
      this.props.show && <section className='com-pop-up' onClick={this.props.hide}>
        <p>选择<span>在浏览器（或safari）打开</span></p>
        <img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAABRCAYAAAAZx2IsAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6N0NGRUMzMTRGQUM5MTFFNDlGMURCM0M4RTZCN0I2QTciIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6N0NGRUMzMTVGQUM5MTFFNDlGMURCM0M4RTZCN0I2QTciPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo3Q0ZFQzMxMkZBQzkxMUU0OUYxREIzQzhFNkI3QjZBNyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo3Q0ZFQzMxM0ZBQzkxMUU0OUYxREIzQzhFNkI3QjZBNyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PiddHL0AAAvQSURBVHja7J0LdBTl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' />
      </section>
    );
  }
}

export default pop;