import M from 'materialize-css'; //elisnt error without M
export default {
  install(Vue) {
    Vue.prototype.$msg = function(html) {
      M.toast({html})
    }

    Vue.prototype.$error = function(html) {
      M.toast({html: `[Error]: ${html}`})
    }
  } 
}