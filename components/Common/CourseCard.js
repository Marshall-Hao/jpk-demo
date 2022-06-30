import { memo } from 'react'
import Link from 'next/link'
import s from './CourseCard.module.css'

function CourseCard({ data = {} }) {
  const { courseTitle = '', id, categoryName } = data
  return (
    <Link href="/course/details/[id]" as={`/course/details/;${id}`}>
      <a className={`${s.card} border-b-1px`}>
        <h5>
          <span className={s.categoryTag}>{categoryName}</span>
          <span className={s.title}>{courseTitle}</span>
        </h5>
      </a>
    </Link>
  )
}

// * 相当于pureComponent class
export default memo(CourseCard)
