import moment from 'moment';
import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Match, Link } from "react-router-dom";
import { AutoSizer, InfiniteLoader, List } from 'react-virtualized';
import DataWrapper from "./DataWrapper";

@DataWrapper
@observer
export default class PostsList extends Component {
	constructor(props) {
		super(props);
		this.store = this.props.store;

		this.state = {
			loadedRowCount: 0,
			loadedRowsMap: {},
			loadingRowCount: 0,
		};

		this._timeoutIdMap = {};

		this._clearData = this._clearData.bind(this);
		this._isRowLoaded = this._isRowLoaded.bind(this);
		this._loadMoreRows = this._loadMoreRows.bind(this);
		this._rowRenderer = this._rowRenderer.bind(this);
	}

	componentWillUnmount() {
		Object.keys(this._timeoutIdMap).forEach(timeoutId => {
			clearTimeout(timeoutId);
		});
	}

	render() {
		const { items } = this.store.appState;
		if(!items.length) {
			return (<div>loading..</div>)
		}

		return (
			<div>
			<InfiniteLoader
				isRowLoaded={this._isRowLoaded}
				loadMoreRows={this._loadMoreRows}
				rowCount={items.length}>
				{({onRowsRendered, registerChild}) => (
					<AutoSizer disableHeight>
						{({width}) => (
							<List
								className='collection'
			          height={400}
								width={width}
								rowHeight={100}
			          rowCount={items.length}
								rowRenderer={this._rowRenderer}
			        />
						)}
					</AutoSizer>
				)}
     		</InfiniteLoader>
			</div>
		);
	}

	_rowRenderer({index, key, style}) {
    const list = this.store.appState['items'];
    const row = list.get(index);
		const title = row['title'];
		const userUrl = `https://news.ycombinator.com/user?id=${row.by}`;
		const userName = row.by;
		const time = moment().startOf(row.time).fromNow();

		return (
		  <div key={key} style={{height: '100px'}} className='collection-item avatar'>
		    <i className="material-icons circle red">play_arrow</i>
		    <a target="_blank"
					 href={row.url}
		       className="title">
		       {title}
		    </a>
		    <p>via <a href={userUrl}>{userName}</a></p>
		    <a href="#!" className="secondary-content">
					{row.score}
					<i className="material-icons">arrow_drop_up</i></a>
				- {time}
		  </div>
		);
  }

	_clearData() {
		this.setState({
			loadedRowCount: 0,
			loadedRowsMap: {},
			loadingRowCount: 0,
		});
	}

	_isRowLoaded({index}) {
		console.log('is loaded');
		const {loadedRowsMap} = this.state;
		return !!loadedRowsMap[index]; // STATUS_LOADING or STATUS_LOADED
	}

	_loadMoreRows({startIndex, stopIndex}) {
		console.log('load more');
		const {loadedRowsMap, loadingRowCount} = this.state;
		const increment = stopIndex - startIndex + 1;

		for (var i = startIndex; i <= stopIndex; i++) {
			loadedRowsMap[i] = STATUS_LOADING;
		}

		this.setState({
			loadingRowCount: loadingRowCount + increment,
		});

		const timeoutId = setTimeout(() => {
			const {loadedRowCount, loadingRowCount} = this.state;

			delete this._timeoutIdMap[timeoutId];

			for (var i = startIndex; i <= stopIndex; i++) {
				loadedRowsMap[i] = STATUS_LOADED;
			}

			this.setState({
				loadingRowCount: loadingRowCount - increment,
				loadedRowCount: loadedRowCount + increment,
			});

			promiseResolver();
		}, 1000 + Math.round(Math.random() * 2000));

		this._timeoutIdMap[timeoutId] = true;

		let promiseResolver;

		return new Promise(resolve => {
			promiseResolver = resolve;
		});
	}
}
