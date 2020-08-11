export default function ({ onShow, onHide, watcherShow, watcherHide }) {
  let prevIsHide = false

  document.addEventListener('visibilitychange', () => {
    const isHide = document.hidden

    if (prevIsHide && !isHide) {
      watcherShow.forEach((vm) => vm.$options[onShow].call(vm))
    } else if (!prevIsHide && isHide) {
      watcherHide.forEach((vm) => vm.$options[onHide].call(vm))
    }

    prevIsHide = isHide
  })
}
