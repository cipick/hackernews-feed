import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Match, Link } from "react-router-dom";

import DataWrapper from "./DataWrapper";

@DataWrapper
@observer
export default class PostsList extends Component {
	constructor(props) {
		super(props);
		this.store = this.props.store;
	}
	render() {
		const { items } = this.store.appState;
);

		return (
			<div className="page posts">
				<ul>
					{items && items.length
						? items.slice(0, items.length).map(post => {
								return (
									<li>
										<h1>{post.title}</h1>
										<p>{post.description}</p>
									</li>
								);
							})
						: "Loading..."}
				</ul>
			</div>
		);
	}
}
