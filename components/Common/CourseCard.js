import { memo, useState } from 'react'
import Link from 'next/link'
import s from './CourseCard.module.css'
import icTeacher from 'public/img/teacher1.png'
import CountDown from './CountDown'

function CourseCard({ data = {} }) {
  const {
    courseTitle = '',
    id,
    categoryName,
    courseTime,
    lessonNum,
    teacherList,
    saleType,
    saleNum = 0,
    price,
    salePrice,
    saleEndTime,
  } = data

  const [countDownFinished, setCountDownFinished] = useState(false)

  const renderSimplePrice = (p) => {
    return (
      <span className={s.price}>
        <span className={s.ico}>¥</span>
        {p}
      </span>
    )
  }

  const renderPromotion = () => {
    // * 促销
    if (saleType === 1 && !countDownFinished) {
      return (
        <div className={s.promoCont}>
          <div>
            <span className={s.deleted}>
              <span className={s.ico}>¥</span>
              {price}
            </span>
            {renderSimplePrice(salePrice)}
          </div>
          <div className={s.desc}>
            剩<CountDown end={saleEndTime} onEnd={() => setCountDownFinished(true)} />
            &nbsp;恢复原价
          </div>
        </div>
      )
    }
    // * 普通卡片
    return (
      <div className={s.promoCont}>
        <div>{price === 0 ? <span>免费</span> : renderSimplePrice(price)}</div>
        <div className={s.desc}>已有{saleNum}人购买</div>
      </div>
    )
  }
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
          {renderPromotion()}
        </div>
      </a>
    </Link>
  )
}

// * 相当于pureComponent class
export default memo(CourseCard)
