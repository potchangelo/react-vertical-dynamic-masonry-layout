import React, { useEffect, useState, useCallback } from 'react';
import { Masonry, MasonryItem } from './Layouts';
import { SampleElement } from './Components';
import { sampleData, api } from './Data';
import Logo from './Images/Logo64.png';
import './Css/App.scss';

const tabArray = [
	{ pageId: 'sample-image-text', title: 'Image and text' },
	{ pageId: 'sample-image', title: 'Image' },
	{ pageId: 'sample-text', title: 'Text' },
	{ pageId: 'sample-image-no-gap', title: 'Image without gap' },
	{ pageId: 'sample-image-text-append', title: 'With load more' },
	{ pageId: 'api-dota-hero-stats', title: 'Dota 2 heroes stats' }
];
const breakpointArray = [
	{ items: 2, minWidth: 0 },
	{ items: 3, minWidth: 500 },
	{ items: 4, minWidth: 750 },
	{ items: 5, minWidth: 1000 }
];

function App() {
	// States
	const [activePageId, setActivePageId] = useState('sample-image-text');
	const [dataArray, setDataArray] = useState([]);
	const [isLoading, setIsLoading] = useState(true); 
	
	// Functions
	function scheduleSetIsLoading(result, delay = 310) {
		setTimeout(() => setIsLoading(result), delay);
	}

	const scheduleSetDataArray = useCallback((array, options = {}) => {
		const _options = {
			delay: options.delay || 1500,
			isAppend: options.isAppend || false
		};
		setTimeout(() => {
			if (_options.isAppend) setDataArray(prevArray => prevArray.concat(array));
			else setDataArray(array);
			scheduleSetIsLoading(false);
		}, _options.delay);
	}, []);

	async function loadApi(pageId) {
		let apiFunction = null;
		if (pageId === 'api-dota-hero-stats') apiFunction = api.getDotaHeroStats;
		try {
			const jsonArray = await apiFunction();
			setDataArray(jsonArray);
		}
		catch(error) {
			console.error(error);
		}
		finally {
			setIsLoading(false);
		}
	}

	function onTabClick(e, pageId) {
		e.preventDefault();
		setActivePageId(pageId);
		setDataArray([]);
		setIsLoading(true);

		if (pageId.includes('api')) loadApi(pageId);
		else scheduleSetDataArray(sampleData)
	}

	function onLoadMoreClick() {
		setIsLoading(true);
		scheduleSetDataArray(sampleData, { isAppend: true })
	}

	// Effects
	useEffect(() => scheduleSetDataArray(sampleData), [scheduleSetDataArray]);

	// Elements
	const tabElements = tabArray.map(tab => {
		const { pageId, title } = tab;
		let elementClass = 'header-tabs__item';
		if (activePageId === tab.pageId) elementClass += ' is-selected';
		return (
			<a
				key={pageId}
				className={elementClass}
				href={`#${pageId}`}
				onClick={e => onTabClick(e, pageId)} >
				{title}
			</a>
		)
	});

	const dataElements = dataArray.map((data, index) => {
		let element = null;
		if (activePageId.includes('sample')) {
			element = <SampleElement pageId={activePageId} data={data} />
		}
		else if (activePageId.includes('api')) {
			// TODO
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
		if (activePageId === 'sample-image-text-append' && dataArray.length > 0) {
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
	if (activePageId !== 'sample-image-no-gap') masonryClass += 'masonry__container--gap';

	return (
		<div className="app">
			<header className="header-nav">
				<div className="header-nav__link" onClick={e => onTabClick(e, 'sample-image-text')}>
					<h1 className="title is-5">Pinterest Layout</h1>
					<h3 className="subtitle is-7">by Zinglecode</h3>
					<img className="header-nav__logo" src={Logo} alt="zinglecode" />
				</div>
			</header>
			<header className="header-tabs">
				<div className="header-tabs__scroll-area">
					<div className="header-tabs__items">
						{tabElements}
					</div>
				</div>
			</header>
			<Masonry extraClass={masonryClass} breakpointArray={breakpointArray}>
				{dataElements}
			</Masonry>
			{loadMoreElement}
			{loadingElement}
		</div>
	);
}

export default App;