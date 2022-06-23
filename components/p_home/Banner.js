import Slider from 'react-slick'
import s from './Banner.module.css'
import Link from 'next/link'

export default function Banner({ data = [] }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    dotsClass: 'banner-dots',
    className: 'home-banners',
  }

  const renderSlide = (item, index) => (
    <Link key={index} href="/course/detail/[id]" as={`/course/detail/${item.courseId}`}>
      <img src={item.img} alt={item.title} className={s.slide} />
    </Link>
  )

  return (
    <section className={s.wrap}>
      <Slider {...settings}>{data.map(renderSlide)}</Slider>
      <div className={s.mask}></div>
    </section>
  )
}
