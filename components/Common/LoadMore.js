import React, { Component } from 'react'

let scrollTimer = null

class LoadMore extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoadingMore: false,
    }
  }

  handleScroll = () => {
    console.log(this.props.hasMore)
    clearTimeout(scrollTimer)
    if (this.props.hasMore) {
      this.setState({ isLoadingMore: false })
    }
    const { onReachBottom, hasMore } = this.props

    const { isLoadingMore } = this.state
    console.log(isLoadingMore)
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
    return <div>{!this.state.isLoadingMore ? 'loading...' : 'finished'}</div>
  }
}

export default LoadMore
