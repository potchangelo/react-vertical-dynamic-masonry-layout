import React, { useEffect, useState } from 'react';
import { Masonry, MasonryItem } from './Layouts';
import { sampleData } from './Data';
import './Css/App.scss';

function App() {
	// Vars
	const [activeTab, setActiveTab] = useState('image-text');
	const [dataArray, setDataArray] = useState([]);
	const tabsArray = [
		{ id: 'image-text', title: 'Image and Text' }, 
		{ id: 'image', title: 'Image' }, 
		{ id: 'text', title: 'Text' }, 
		{ id: 'image-no-gap', title: 'Image without gap' }
	];
	const breakpointsArray = [
		{ items: 2, minWidth: 0 },
		{ items: 3, minWidth: 500 },
		{ items: 4, minWidth: 750 },
		{ items: 5, minWidth: 1000 }
	]

	// Effects
	useEffect(() => setDataArray(sampleData()) , []);

	// Functions
	function onTabClick(e, id) {
		e.preventDefault();
		setActiveTab(id);
	}

	// Elements
	const tabsElements = tabsArray.map(item => {
		let _class = '';
		if (activeTab === item.id) _class += 'is-active';
		return (
			<li key={item.id} className={_class}>
				<a href={`#${item.id}`} onClick={(e) => onTabClick(e, item.id)}>{item.title}</a>
			</li>
		)
	});

	const dataElements = dataArray.map((item, index) => {
		const { title, description, imgUrl, imgWidth, imgHeight } = item;
		const paddingBottom = imgHeight / imgWidth * 100;
		const style = { paddingBottom: `${paddingBottom}%` };

		let element = null;
		if (activeTab === 'image-text') {
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
				{ element }
			</MasonryItem>
		);
	});

	let masonryClass = '';
	if (activeTab !== 'image-no-gap') masonryClass += 'masonry__container--gap';

	return (
		<div className="app">
			<div className="container content">
				<br />
				<h2 className="title is-size-2 has-text-centered">Masonry</h2>
			</div>
			<div className="tabs is-centered">
				<ul>
					{ tabsElements }
				</ul>
			</div>
			<Masonry extraClass={masonryClass} breakpointsArray={breakpointsArray}>
				{ dataElements }
			</Masonry>
		</div>
	);
}

export default App;