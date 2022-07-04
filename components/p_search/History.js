import Link from 'next/link'
import s from './History.module.css'

export default function History({ hotWord, submitSearch }) {
  const renderHotItem = (item, index) => {
    const text = item.title.slice(0, 6)
    if (item.type === 2) {
      return (
        <Link key={index} href="/course/details/[id]" as={`/course/details/${item.id}`}>
          <a className={s.item}>{text}</a>
        </Link>
      )
    }
    return (
      <span className={s.item} key={index} onClick={() => submitSearch(text)}>
        {text}
      </span>
    )
  }

  return (
    <>
      {/* hot search */}
      {hotWord && hotWord.length ? (
        <section className={s.container}>
          <div className={s.hotHead}>热门搜索</div>
          <div>{hotWord.slice(0, 6).map(renderHotItem)}</div>
        </section>
      ) : null}
      {/* search history */}
    </>
  )
}
