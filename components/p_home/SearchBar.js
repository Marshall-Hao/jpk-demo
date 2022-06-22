import Link from 'next/link'
import css from './SearchBar.module.scss'

export default function SearchBar() {
  return (
    <section className={css.wrapper}>
      <Link href="/search">
        <a className={css.wrapper_search}>Search</a>
      </Link>
      <Link href="/user">
        <a className={css.wrapper_user}></a>
      </Link>
    </section>
  )
}
