import ReactDOM from 'react-dom';

const createDom = (componentsKey) => {
  const times = +new Date();
  const id = componentsKey + '_' + times;
  const div = document.createElement('div');
  div.setAttribute('id', id);
  document.body.appendChild(div);
  return id;
};

const setGlobe = (components) => {
  for (const key in components) {
    const id = createDom(key);
    window[key] = ReactDOM.render(
      React.createElement(components[key]),
      document.getElementById(id)
    );
  }
};

export default setGlobe;