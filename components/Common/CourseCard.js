import { memo } from 'react'
import Link from 'next/link'
import s from './CourseCard.module.css'
import icTeacher from 'public/img/teacher1.png'

function CourseCard({ data = {} }) {
  const { courseTitle = '', id, categoryName, courseTime, lessonNum, teacherList } = data
  return (
    <Link href="/course/details/[id]" as={`/course/details/;${id}`}>
      <a className={`${s.card} border-b-1px`}>
        <h5>
          <span className={s.categoryTag}>{categoryName}</span>
          <span className={s.title}>{courseTitle}</span>
        </h5>
        <div className={s.time}>
          <span>开课时间：&nbsp;&nbsp;{courseTime || '随到随学'}</span>
          <span className={s.lessonNum}>{lessonNum}课时</span>
        </div>
        <div className={s.footer}>
          <div className={s.teacherCont}>
            {teacherList && teacherList.length > 0
              ? teacherList.slice(0, 3).map((teacher, index) => {
                  return (
                    <div key={`teahcer-${index}`} className={s.teacherBox}>
                      <div className={s.imgWrapper}>
                        <img
                          src={teacher.img || icTeacher}
                          alt="teacher_avatar"
                          className={s.avatar}
                        />
                        <div className={s.avatarBorder}></div>
                      </div>
                      <span>{teacher.name}</span>
                    </div>
                  )
                })
              : null}
          </div>
        </div>
      </a>
    </Link>
  )
}

// * 相当于pureComponent class
export default memo(CourseCard)
