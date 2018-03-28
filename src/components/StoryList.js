import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { AutoSizer, InfiniteLoader, List } from 'react-virtualized';
import DataWrapper from "./DataWrapper";
import StoryItem from "./StoryItem";

const STATUS_LOADING = 1;
const STATUS_LOADED = 2;

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
		const { newStories, stories } = this.store.appState;
		const {loadedRowCount, loadingRowCount} = this.state;
		const storiesCount = stories.size;

		if(!storiesCount) {
			return (
				<div className="progress">
      		<div className="indeterminate"></div>
  			</div>
			)
		}

		return (
			<div>
			<button onClick={this._clearData}>
        Flush Cached Data
      </button>
			Loaded: {loadedRowCount}, Loading: {loadingRowCount}
			<InfiniteLoader
				isRowLoaded={this._isRowLoaded}
				loadMoreRows={this._loadMoreRows}
				rowCount={storiesCount}>
				{({onRowsRendered, registerChild}) => (
					<AutoSizer disableHeight>
						{({width}) => (
							<List
								ref={registerChild}
								className='collection'
			          height={400}
								width={width}
								rowHeight={84}
			          rowCount={storiesCount}
								rowRenderer={this._rowRenderer}
								onRowsRendered={onRowsRendered}
			        />
						)}
					</AutoSizer>
				)}
     		</InfiniteLoader>
			</div>
		);
	}

	_rowRenderer({index, key, style}) {
		const { newStories, stories } = this.store.appState;
		const storyId = newStories.get(index);
		const story = stories.get(storyId);

		return (
			<StoryItem className="collection-item avatar"
								key={key}
								style={style}
								story={story}
			/>
		)
  }

	_clearData() {
		this.setState({
			loadedRowCount: 0,
			loadedRowsMap: {},
			loadingRowCount: 0,
		});
	}

	_isRowLoaded({index}) {
		const {loadedRowsMap} = this.state;
		return !!loadedRowsMap[index]; // STATUS_LOADING or STATUS_LOADED
	}

	_loadMoreRows({startIndex, stopIndex}) {
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
