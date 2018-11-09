import React, { Component } from 'react'

import like from '../like.svg'
import './Tweet.css'
import api from '../services/api';

export default class Tweet extends Component {
  handleLike = async () => {
    const id = this.props.tweet._id

    await api.post(`likes/${id}`)
  }

  render () {
    const { tweet } = this.props
    return (
      <li className="tweet">
        <strong>{tweet.author}</strong>
        <p>{tweet.content}</p>
        <button type="button" onClick={this.handleLike}>
          <img src={like} alt="Curtir"/>
          {tweet.likes}
        </button>
      </li>
    )
  }
}