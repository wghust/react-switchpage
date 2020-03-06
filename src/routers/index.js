export default {
  'bindcard': function() {
    return import(/* webpackChunkName: 'bindcard.chunk' */'../view/bindcard/index.jsx').then(_ => {
      return _.default;
    })
  },
  'supportbank': function() {
    return import(/* webpackChunkName: 'supportbank.chunk' */'../view/supportbank/index.jsx').then(_ => {
      return _.default;
    })
  }
}