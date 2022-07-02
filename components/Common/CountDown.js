import React, { Component } from 'react'
import s from './CountDown.module.css'

/**
 * 时间格式化
 * @param {number} ms 剩余倒计时的时间，单位ms
 * @return {Array} ['hour:min:sec', 'day']
 */
const formatCountdown = (ms) => {
  if (ms < 0) return ['00:00:00']
  const t = ms / 1000
  let sec = parseInt(t % 60, 10)
  let m = parseInt((t / 60) % 60, 10)
  const ho = parseInt(t / 60 / 60, 10)
  let h = parseInt(ho % 24, 10)
  const d = parseInt(ho / 24, 10)

  sec = sec >= 10 ? sec : `0${sec}`
  m = m >= 10 ? m : `0${m}`
  h = h >= 10 ? h : `0${h}`
  return d === 0 ? [`${h}:${m}:${sec}`] : [`${h}:${m}:${sec}`, `${d}`]
}

class CountDown extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // * 可以请求服务器时间 确保最佳准确
      curTimeStamp: new Date().getTime(),
    }
    this.timer = null
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({
        curTimeStamp: new Date().getTime(),
      })
    }, 500)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
    this.timer = null
  }

  componentDidUpdate() {
    const { end, onEnd } = this.props
    const { curTimeStamp } = this.state
    if (end - curTimeStamp < 0 && this.timer) {
      clearInterval(this.timer)
      this.timer = null
      onEnd()
    }
  }

  render() {
    const { end } = this.props
    const { curTimeStamp } = this.state

    const countDownArr = formatCountdown(end - curTimeStamp)
    return (
      <span>
        {countDownArr.length > 1 ? (
          <span>
            <span className={s.warningColor}>{countDownArr[1]}</span>天
          </span>
        ) : null}
        <span className={s.warningColor}>{countDownArr[0]}</span>
      </span>
    )
  }
}

export default CountDown
