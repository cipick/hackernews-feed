import React, { Component } from "react";
import { inject, observer } from "mobx-react";

import Navbar from "./Navbar";
import StoryList from "./StoryList";

@inject("store")
@observer
export default class Home extends Component {
	constructor(props) {
		super(props);
		this.store = this.props.store;
	}

	render() {
		const store = this.store;
		return (
			<div className="page home">
				<header>
					<Navbar />
				</header>
				<main>
					<StoryList />
				</main>
			</div>
		);
	}
}
