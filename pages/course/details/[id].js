import { useRouter } from 'next/router'

export default function CourseDetail() {
  const router = useRouter()
  const { id } = router.query

  return (
    <main>
      <h3>课程详情页{id}</h3>
    </main>
  )
}
