export default function ({ onShow, onHide, watcherShow, watcherHide }) {
  window.addEventListener('hashchange', () => {
    watcherShow.forEach((vm) => vm.$options[onShow].call(vm))
  })

  const { navigateTo } = wx.miniProgram
  wx.miniProgram.navigateTo = (options) => {
    navigateTo.call(wx.miniProgram, {
      ...options,
      success(res) {
        options.success.call(options, res)
        watcherHide.forEach((vm) => vm.$options[onHide].call(vm))
      }
    })
  }
}
