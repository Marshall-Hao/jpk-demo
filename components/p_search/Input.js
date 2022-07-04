import { useRef } from 'react'
import s from './Input.module.css'

export default function Input({
  inputValue,
  setInputValue,
  fetchSuggest,
  showHistory,
  submitSearch,
}) {
  const inputEl = useRef(null)

  const handleChange = (e) => {
    const searchVal = e.target.value
    const trimVal = searchVal.trim()
    setInputValue(e.target.value)
    if (!trimVal) {
      // * 停止截流函数的timer 因为已经到历史页了 不需要在fetch suggest
      fetchSuggest.cancel()
      showHistory()
      return
    }
    if (trimVal !== inputValue) {
      fetchSuggest(trimVal)
    }
  }

  const handleKeyUp = (e) => {
    if (e.keyCode !== 13 || !inputEl.current) return
    // * 停止截流函数的timer 因为已经到结果页了 不需要在fetch suggest
    const event = e || window.event
    event.preventDefault() //* 阻止回车默认行为
    fetchSuggest.cancel()
    const filteredVal = inputEl.current.value.trim()
    if (!filteredVal) {
      setInputValue('')
      return
    }
    submitSearch(filteredVal)
    //*  获取blur状态,手机端收起虚拟键盘
    inputEl.current.blur()
    //  * 禁止回车表单自动提交
    return false
  }

  const clearInput = () => {
    fetchSuggest.cancel()
    showHistory()
    setInputValue('')
    // * 获取focus状态 弹出模拟键盘
    inputEl.current.focus()
  }
  return (
    //  ! 让软键盘enter键显示搜索字样
    <div className={s.container}>
      <div className={`${s.formCont} border-b-1px ${inputValue ? '' : s.empty}`}>
        <form action="">
          <input
            type="search"
            ref={inputEl}
            className={s.search}
            value={inputValue}
            placeholder="请输入搜索内容"
            onChange={handleChange}
            onKeyUp={handleKeyUp}
          />
          {/* 隐藏输入框，防止form自动提交 */}
          <input type="text" style={{ display: 'none' }} />
        </form>
        {inputValue ? <button className={s.clean} onClick={clearInput}></button> : null}
      </div>
    </div>
  )
}
