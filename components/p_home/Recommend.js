import SectionHeader from './SectionHeader'
import CourseCard from '@/Common/CourseCard'

export default function Recommend() {
  const data = []
  return (
    <section>
      <SectionHeader title="课程精选" subTitle="Course selection" />
      Recommend
      {data.map((item) => (
        <CourseCard key={item?.id} />
      ))}
    </section>
  )
}
