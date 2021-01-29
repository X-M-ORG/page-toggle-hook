export default function ({ onShow, onHide, watcherShow, watcherHide }) {
  let isHide = false

  window.addEventListener('hashchange', () => {
    watcherShow.forEach((vm) => {
      // 微信小程序更新 hash 会导致 history 增加一层，故需要 history.back() 一次
      if (isHide) {
        history.back()
        isHide = false
      }
      vm.$options[onShow].call(vm)
    })
  })

  const { navigateTo } = wx.miniProgram
  wx.miniProgram.navigateTo = (options) => {
    navigateTo.call(wx.miniProgram, {
      ...options,
      success(res) {
        isHide = true
        options.success && options.success(res)
        watcherHide.forEach((vm) => vm.$options[onHide].call(vm))
      }
    })
  }
}
