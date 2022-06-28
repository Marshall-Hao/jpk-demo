import { useState, useEffect } from 'react'
import SectionHeader from './SectionHeader'
import CourseCard from '@/Common/CourseCard'
import { getRecommend } from 'core/api'
import LoadMore from '@/Common/LoadMore'

const OFFSET = 10

export default function Recommend() {
  const [recommend, setRecommend] = useState({
    list: [],
    pageStart: 0,
    hasMore: true,
  })
  const fetchRecommend = async () => {
    console.log('load list')
    try {
      const list = await getRecommend({
        start: recommend.pageStart,
        offset: OFFSET,
      })

      setRecommend({
        list: recommend.list.concat(list),
        pageStart: recommend.pageStart + 1,
        hasMore: list.length === OFFSET,
      })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchRecommend()
  }, [])
  return (
    <section>
      <SectionHeader title="课程精选" subTitle="Course selection" />
      <div>
        {recommend.list.map((item, index) => (
          <CourseCard key={index} data={item} />
        ))}
      </div>
      <LoadMore onReachBottom={fetchRecommend} hasMore={recommend.hasMore} />
    </section>
  )
}
