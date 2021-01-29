export default function ({ onShow, onHide, watcherShow, watcherHide }) {
  window.addEventListener('hashchange', () => {
    let back = false
    watcherShow.forEach((vm) => {
      // 微信小程序更新 hash 会导致 history 增加一层，故需要 history.back() 一次
      if (!back) {
        history.back()
        back = true
      }
      vm.$options[onShow].call(vm)
    })
  })

  const { navigateTo } = wx.miniProgram
  wx.miniProgram.navigateTo = (options) => {
    navigateTo.call(wx.miniProgram, {
      ...options,
      success(res) {
        options.success(res)
        watcherHide.forEach((vm) => vm.$options[onHide].call(vm))
      }
    })
  }
}
