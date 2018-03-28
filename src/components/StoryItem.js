import moment from 'moment';
import React, { Component } from "react";

export default class StoryItem extends Component {
	render() {
    const { story, className, style } = this.props;
		const userUrl = `https://news.ycombinator.com/user?id=${story.by}`;
		const time = moment().startOf(story.time).fromNow();

		return (
      <div className={className} style={style}>
  	    <i className="material-icons circle red">play_arrow</i>
  	    <a target="_blank"
  				 href={story.url}
  	       className="title">
  	       {story.title}
  	    </a>
  	    <p>by <a href={userUrl}>{story.by}</a> - {time}</p>
  	    <a href="#!" className="secondary-content">
  				{story.score}
  				<i className="material-icons">arrow_drop_up</i>
        </a>
      </div>
		);
  }
}
