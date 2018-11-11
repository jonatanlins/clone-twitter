import React, { Component } from 'react'
import { api, baseURL } from '../services/api'
import socket from 'socket.io-client'

import './Timeline.css'
import twitterLogo from '../twitter.svg'

import Tweet from '../components/Tweet'

export default class Timeline extends Component {
  state = {
    tweets: [],
    newTweet: ''
  }

  async componentDidMount () {
    this.subscribeToEvents()
    const response = await api.get('tweets')

    this.setState({ tweets: response.data })
  }

  subscribeToEvents = () => {
    const io = socket(baseURL)

    io.on('tweet', data => {
      this.setState({
        tweets: [ data, ...this.state.tweets ]
      })
    })
    io.on('like', data => {
      this.setState({
        tweets: this.state.tweets.map(tweet =>
          tweet._id === data._id ? data : tweet
        )
      })
    })
  }

  handleInputChange = e => {
    this.setState({ newTweet: e.target.value })
  }

  handleNewTweet = async e => {
    if (e.keyCode !== 13) return
    e.preventDefault()
    
    const content = this.state.newTweet
    const author = localStorage.getItem('@GoTwitter:username')
    this.setState({ newTweet: '' })

    await api.post('tweets', { author, content })
  }

  render () {
    return (
      <div className="timeline-wrapper">
        <img height={24} src={twitterLogo} alt="Logotipo do Twitter"/>

        <form>
          <textarea
            value={this.state.newTweet}
            onChange={this.handleInputChange}
            onKeyDown={this.handleNewTweet}
            placeholder="Manda tuas ideia aí"
          />
        </form>

        <ul className="tweet-list">
          {this.state.tweets.map(tweet => (
            <Tweet tweet={tweet} key={tweet._id}/>
          ))}
        </ul>
      </div>
    )
  }
}