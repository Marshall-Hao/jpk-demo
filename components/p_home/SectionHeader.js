import s from './SectionHeader.module.css'

export default function SectionHeader({ title = '', subTitle = '', url = '/' }) {
  return (
    <header className={s.header}>
      <div className={s.title}>
        <h4>{title}</h4>
        <h5>{subTitle}</h5>
      </div>
      <a href={url}>查看更多</a>
    </header>
  )
}
