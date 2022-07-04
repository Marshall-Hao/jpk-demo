import { useState, useMemo } from 'react'
import { useRouter } from 'next/router'
import { throttle } from 'lodash'
import Suggest from '@/p_search/Suggest'
import History from '@/p_search/History'
import Result from '@/p_search/Result'
import Input from '@/p_search/Input'
import { getHotWord, getSearchResult, getSearchSuggest } from '../../core/api'
import s from './search.module.css'
import useLSState from 'core/hooks/useLSState'

const TYPES = {
  HISTORY: 'history',
  SUGGEST: 'suggest',
  RESULT: 'result',
}
// * history
// * suggest

// * result
export default function Search({ kw, hotWord }) {
  const router = useRouter()

  const [contType, setContType] = useState(kw ? TYPES.RESULT : TYPES.HISTORY)
  const [inputValue, setInputValue] = useState(kw || '')
  const [suggestList, setSuggestList] = useState([])
  const [history, setHistory] = useLSState('searchHistory', [])

  // * back to history
  const showHistory = () => setContType(TYPES.HISTORY)
  // * while typing keyword
  // ! 每次组件更新，此函数都会重新被声明，于是throttle都会重新注册一个新的timer，不会触发截流
  // * https://medium.com/ichef/%E4%BB%80%E9%BA%BC%E6%99%82%E5%80%99%E8%A9%B2%E4%BD%BF%E7%94%A8-usememo-%E8%B7%9F-usecallback-a3c1cd0eb520
  const fetchSuggest = useMemo(() => {
    return throttle(async (suggestWord) => {
      console.log('fetch suggest', suggestWord)
      // * switch the rendering content
      if (contType !== TYPES.SUGGEST) setContType(TYPES.SUGGEST)

      const res = await getSearchSuggest(suggestWord)

      setSuggestList(res)
    }, 300)
  }, [contType, setContType, setSuggestList])
  // * finalize search
  const submitSearch = (kw = '') => {
    // * push the new search result into the search history array
    // * get rid of the duplicated ones
    history.unshift(kw)

    setHistory([...new Set(history)].slice(0, 6))
    setContType(TYPES.RESULT)
    // * 更新路由页面keyword,保持页面的状态
    router.replace({
      pathname: '/search',
      query: {
        kw,
      },
    })
  }
  // * rendering content
  const renderContent = () => {
    switch (contType) {
      case TYPES.HISTORY:
        return (
          <History
            submitSearch={submitSearch}
            hotWord={hotWord}
            history={history}
            deleteHistory={() => setHistory([])}
          />
        )
      case TYPES.SUGGEST:
        return <Suggest data={suggestList} submitSearch={submitSearch} />
      case TYPES.RESULT:
        return <Result submitSearch={submitSearch} />
    }
  }
  return (
    <div>
      {/* search input */}
      <Input
        inputValue={inputValue}
        setInputValue={setInputValue}
        fetchSuggest={fetchSuggest}
        showHistory={showHistory}
        submitSearch={submitSearch}
      />
      {/* content area */}
      <div className={s.content}>{renderContent()}</div>
    </div>
  )
}

export async function getServerSideProps(context) {
  const {
    query: { kw = '' },
  } = context
  let hotWord = []
  let result = []
  if (kw && kw.trim()) {
    // 热门
    // * https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled
    const [resultRes, hotWordRes] = await Promise.allSettled([
      getSearchResult(kw.trim()),
      getHotWord(),
    ])
    // console.log(resultRes)
    hotWord = hotWordRes.value
    result = resultRes.value
  } else {
    hotWord = await getHotWord()
  }

  return {
    props: {
      hotWord: hotWord || [],
      result: result || [],
      kw,
    },
  }
}
