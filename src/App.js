import React, { useEffect, useState } from 'react';
import { Masonry, MasonryItem } from './Layouts';
import { sampleData } from './Data';
import './Css/App.scss';

const tabArray = [
	{ id: 'image-text', title: 'Image and text' },
	{ id: 'image', title: 'Image' },
	{ id: 'text', title: 'Text' },
	{ id: 'image-no-gap', title: 'Image without gap' },
	{ id: 'image-text-append', title: 'With load more' }
];
const breakpointArray = [
	{ items: 2, minWidth: 0 },
	{ items: 3, minWidth: 500 },
	{ items: 4, minWidth: 750 },
	{ items: 5, minWidth: 1000 }
];

function App() {
	// States
	const [activeTab, setActiveTab] = useState('image-text');
	const [dataArray, setDataArray] = useState([]);
	const [isLoading, setIsLoading] = useState(true); 
	
	// Functions
	function onTabClick(e, id) {
		e.preventDefault();
		setActiveTab(id);
		setDataArray([]);
		setIsLoading(true);
		scheduleSetDataArray(sampleData).then(_ => scheduleSetIsLoading(false));
	}

	function onLoadMoreClick() {
		setIsLoading(true);
		scheduleSetDataArray(sampleData, { isAppend: true }).then(_ => scheduleSetIsLoading(false));
	}

	function scheduleSetDataArray(array, options = {}) {
		const _options = {
			delay: options.delay || 1500,
			isAppend: options.isAppend || false
		};
		return new Promise(resolve => {
			setTimeout(() => {
				if (_options.isAppend) setDataArray(prevArray => prevArray.concat(array));
				else setDataArray(array);
				resolve({ status: 'DONE' });
			}, _options.delay);
		});
	}

	function scheduleSetIsLoading(result, delay = 310) {
		return new Promise(resolve => {
			setTimeout(() => {
				setIsLoading(result);
				resolve({ status: 'DONE' });
			}, delay);
		});
	}

	// Effects
	useEffect(() => {
		scheduleSetDataArray(sampleData).then(_ => scheduleSetIsLoading(false));
	}, []);

	// Elements
	const tabElements = tabArray.map(tab => {
		let elementClass = 'button is-info';
		if (activeTab !== tab.id) elementClass += ' is-outlined';
		return (
			<a
				key={tab.id}
				className={elementClass}
				href={`#${tab.id}`}
				onClick={e => onTabClick(e, tab.id)} >
				{tab.title}
			</a>
		)
	});

	const dataElements = dataArray.map((data, index) => {
		const { title, description, imgUrl, imgWidth, imgHeight } = data;
		const paddingBottom = imgHeight / imgWidth * 100;
		const style = { paddingBottom: `${paddingBottom}%` };

		let element = null;
		if (activeTab === 'image-text' || activeTab === 'image-text-append') {
			element = (
				<>
					<div className="item__image-cover" style={style}>
						<img src={imgUrl} alt="img" />
					</div>
					<div className="item__text-cover">
						<h6 className="title is-size-6">{title}</h6>
						<p className="description has-text-grey is-size-7">{description}</p>
					</div>
				</>
			);
		}
		else if (activeTab === 'image' || activeTab === 'image-no-gap') {
			element = (
				<div className="item__image-cover" style={style}>
					<img src={imgUrl} alt="img" />
				</div>
			);
		}
		else if (activeTab === 'text') {
			element = (
				<div className="item__text-box box">
					<h6 className="title is-size-6">{title}</h6>
					<p className="description has-text-grey is-size-7">{description}</p>
				</div>
			);
		}

		return (
			<MasonryItem key={index}>
				{element}
			</MasonryItem>
		);
	});

	let loadMoreElement = null;
	let loadingElement = (
		<section className="section">
			<div className="container content has-text-centered">
				<span className="icon is-medium">
					<i className="fas fa-spinner fa-2x fa-spin"></i>
				</span>
			</div>
		</section>
	);

	if (!isLoading) {
		if (activeTab === 'image-text-append' && dataArray.length > 0) {
			loadMoreElement = (
				<section className="section">
					<div className="container content has-text-centered">
						<button
							className="button is-dark"
							type="button"
							onClick={onLoadMoreClick}>
							Load more
						</button>
					</div>
				</section>
			);
		}
		loadingElement = null;
	}

	let masonryClass = '';
	if (activeTab !== 'image-no-gap') masonryClass += 'masonry__container--gap';

	return (
		<div className="app">
			<section className="section">
				<div className="container content">
					<h2 className="title is-size-2 has-text-centered">Pinterest Layout</h2>
				</div>
				<div className="buttons is-centered">
					{tabElements}
				</div>
			</section>
			<Masonry extraClass={masonryClass} breakpointArray={breakpointArray}>
				{dataElements}
			</Masonry>
			{loadMoreElement}
			{loadingElement}
		</div>
	);
}

export default App;