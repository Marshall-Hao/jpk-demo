import React, { Component } from 'react'
import s from './LoadMore.module.css'

function renderCont(isLoadingMore, hasMore, bottomText) {
  if (isLoadingMore) {
    return <div>正在加载...</div>
  }
  return hasMore ? (
    <div className={s.loadText}>下拉更多</div>
  ) : (
    <div className={s.loadText}>{bottomText}</div>
  )
}

let scrollTimer = null

class LoadMore extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoadingMore: false,
    }
  }

  handleScroll = () => {
    // console.log(this.props.hasMore)
    clearTimeout(scrollTimer)
    if (this.props.hasMore) {
      this.setState({ isLoadingMore: false })
    }
    const { onReachBottom, hasMore } = this.props

    const { isLoadingMore } = this.state
    // console.log(isLoadingMore)
    // console.log('scroll', this.state.isLoadingMore)
    const curPos = window.scrollY
    const height = window.screen.height
    const docLength = window.document.body.scrollHeight
    if (hasMore && !isLoadingMore && curPos + height + 0.5 >= docLength) {
      scrollTimer = setTimeout(() => {
        this.setState({ isLoadingMore: true })
        onReachBottom()
          .then(() => {
            console.log('then')
          })
          .catch((e) => {
            console.error(e)
            this.setState({ isLoadingMore: false })
          })
      }, 400)
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  render() {
    const { hasMore, bottomText } = this.props
    const { isLoadingMore } = this.state
    return <div className={s.loadMore}>{renderCont(isLoadingMore, hasMore, bottomText)}</div>
  }
}

export default LoadMore
