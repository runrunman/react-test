import React, { Component } from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'  
import dayjs from 'dayjs'
import format from 'date-fns/format'

import LinkButton from '../../../components/link-button'

import './index.less'

@connect(state => ({username: state.user.user.username}))
@withRouter  
class Header extends Component {

  state = {
    currentTime: format(Date.now(), 'yyyy-MM-dd HH:mm:ss')
  }
  logout = () => {
    alert('logout')
  }
  componentDidMount () {
    
    this.intervalId = setInterval(() => {
      this.setState({
        currentTime: dayjs().format('YYYY-MM-DD HH:mm:ss')
      })
    }, 1000);
  }
  componentWillUnmount () {
    
    clearInterval(this.intervalId)
  }
  render() {
    
    const path = this.props.location.pathname
    const {currentTime} = this.state

    return (
      <div className="header">
        <div className="header-top">
          <span>欢迎, {this.props.username}</span>
          <LinkButton onClick={this.logout}>退出</LinkButton>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">{path}</div>
          <div className="header-bottom-right">
            <span>{currentTime}</span>
            <img src="http://api.map.baidu.com/images/weather/day/xiaoyu.png" alt="weather"/>
            <span>小雨转多云</span>
          </div>
        </div>
      </div>
    )
  }
}

export default Header
