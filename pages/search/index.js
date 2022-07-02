import { useState } from 'react'
import { useRouter } from 'next/router'
import Suggest from '@/p_search/Suggest'
import History from '@/p_search/History'
import Result from '@/p_search/Result'
import Input from '@/p_search/Input'
import { getHotWord, getSearchResult, getSearchSuggest } from '../../core/api'

const TYPES = {
  HISTORY: 'history',
  SUGGEST: 'suggest',
  RESULT: 'result',
}
// * history
// * suggest

// * result
export default function Search({ kw }) {
  const router = useRouter()

  const [contType, setContType] = useState(kw ? TYPES.RESULT : TYPES.HISTORY)
  const [inputValue, setInputValue] = useState(kw || '')
  const [suggestList, setSuggestList] = useState([])
  // * back to history
  const showHistory = () => setContType(TYPES.HISTORY)
  // * while typing keyword
  const fetchSuggest = async () => {
    // * switch the rendering content
    if (contType !== TYPES.SUGGEST) setContType(TYPES.SUGGEST)

    const res = await getSearchSuggest(inputValue)

    setSuggestList(res)
  }
  // * finalize search
  const submitSearch = (kw = '') => {
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
        return <History submitSearch={submitSearch} />
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
      {renderContent()}
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
    console.log(resultRes)
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
