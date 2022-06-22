import { memo } from 'react'

function CourseCard({ data = {} }) {
  const { courseTitle = '' } = data
  return (
    <div>
      <p>{courseTitle}</p>
    </div>
  )
}

// * 相当于pureComponent class
export default memo(CourseCard)
