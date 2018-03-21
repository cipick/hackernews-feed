import React, { Component } from "react";
import { inject, observer } from "mobx-react";

import PostsList from "./PostsList";

@inject("store")
@observer
export default class Home extends Component {
	constructor(props) {
		super(props);
		this.store = this.props.store;
	}

	render() {
		const store = this.store;
		const apiKey = this.store.apiKey;
		return (
			<div className="page home">
				<header>
					<h1>Hacker-news feed</h1>
				</header>
				<main>
					<PostsList
						url=`https://newsapi.org/v2/everything?sources=hacker-news&apiKey=${apiKey}`
					/>
				</main>
			</div>
		);
	}
}
