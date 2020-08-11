import h5 from './env/h5'
import miniapp from './env/miniapp'

const env = { h5, miniapp }

let installed = false

export default {
  install(Vue, options = {}) {
    if (installed) {
      return
    }

    const watcherShow = new Map()
    const watcherHide = new Map()
    const onShow = 'onShow'
    const onHide = 'onHide'

    Vue.mixin({
      created() {
        if (!this.$route || !this.$route.matched || !this.$route.matched[0]) {
          return
        }

        if (this === this.$route.matched[0].instances.default) {
          this._isRouteInstances = true
          this.$options[onShow] && watcherShow.set(this._uid, this)
          this.$options[onHide] && watcherHide.set(this._uid, this)
        } else {
          this._isRouteInstances = false
        }
      },
      destroyed() {
        if (this._isRouteInstances) {
          this.$options[onShow] && watcherShow.delete(this._uid)
          this.$options[onHide] && watcherHide.delete(this._uid)
        }
      }
    })

    const useEnv = options.env || 'h5'

    if (env[useEnv]) {
      env[useEnv]({ onShow, onHide, watcherShow, watcherHide })
    }

    installed = true
  }
}
