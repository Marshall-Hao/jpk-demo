import { memo } from 'react'
import s from './Suggest.module.css'

function Suggest({ data, submitSearch }) {
  if (!data.length) return null
  return (
    <ul className={s.container}>
      {data.map((item, index) => {
        return (
          <li
            className={`${s.suggestItem} border-b-1px`}
            key={`search-suggest-${index}`}
            onClick={() => submitSearch(item)}>
            {item}
          </li>
        )
      })}
    </ul>
  )
}

export default memo(Suggest)
