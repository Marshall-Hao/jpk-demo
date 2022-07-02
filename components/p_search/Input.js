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
      showHistory()
      return
    }
    if (trimVal !== inputValue) {
      fetchSuggest(trimVal)
    }
  }

  const handleKeyUp = (e) => {
    if (e.keyCode !== 13 || !inputEl.current) return
    const filteredVal = inputEl.current.value.trim()
    if (!filteredVal) {
      setInputValue('')
      return
    }
    submitSearch(filteredVal)
    //*  blur,手机端收起虚拟键盘
    inputEl.current.blur()
  }
  return <input ref={inputEl} value={inputValue} onChange={handleChange} onKeyUp={handleKeyUp} />
}
