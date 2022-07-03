import { useRef } from 'react'

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
    //*  blur,手机端收起虚拟键盘
    inputEl.current.blur()
    //  * 禁止回车表单自动提交
    return false
  }
  return (
    //  ! 让软键盘enter键显示搜索字样
    <form action="">
      <input
        type="search"
        ref={inputEl}
        value={inputValue}
        onChange={handleChange}
        onKeyUp={handleKeyUp}
      />
      {/* 隐藏输入框，防止form自动提交 */}
      <input type="text" style={{ display: 'none' }} />
    </form>
  )
}
