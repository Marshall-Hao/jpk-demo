import SectionHeader from './SectionHeader'
import CourseCard from '@/Common/CourseCard'

export default function Recommend() {
  const data = []
  return (
    <section>
      <SectionHeader />
      Recommend
      {data.map((item) => (
        <CourseCard key={item?.id} />
      ))}
    </section>
  )
}
