import { useState, useCallback } from 'react'
import CourseCard from '@/Common/CourseCard'
import LoadMore from '@/Common/LoadMore'
import { getSearchResult } from '../../core/api'

const OFFSET = 10

export default function Result({ data = [], kw = '' }) {
  const [result, setResult] = useState({
    list: data, // * 一开始ssr传入的10条数据
    page: 1,
    hasMore: true,
  })

  const fetchResult = useCallback(async () => {
    try {
      const list = await getSearchResult(kw, result.page)

      setResult({
        list: result.list.concat(list),
        page: result.page + 1,
        hasMore: list.length === OFFSET,
      })
    } catch (e) {
      console.error(e)
    }
  }, [result, kw])

  if (data && data.length) {
    return (
      <section>
        <div>相关课程</div>
        {result.list.map((item) => {
          return <CourseCard data={item} key={item.id} />
        })}
        <LoadMore hasMore={result.hasMore} onReachBottom={fetchResult} bottomText="我是有底线的" />
      </section>
    )
  }
  return <div>result case</div>
}
