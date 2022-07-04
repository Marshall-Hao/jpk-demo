import { useState, useEffect } from 'react'
import ls from 'store2'

/**
 * localStorage 同步State
 * @param {*} key 存储的键
 * @param {*} defaultVal 默认值
 */
const useLSState = (key, defaultVal) => {
  const [data, setData] = useState(defaultVal)

  const setter = (newData) => {
    setData(newData)
    ls.set(key, newData)
  }

  useEffect(() => {
    if (ls(key) === null) {
      ls.set(key, defaultVal)
    } else {
      setData(ls(key))
    }
  }, [])

  //   * 模拟hook方式
  return [data, setter]
}

export default useLSState
