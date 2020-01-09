import React, { useEffect, useState } from 'react';
import { Masonry, MasonryItem } from './Layouts';
import { sampleData } from './Data'
import './Css/App.scss';

function App() {
	const [dataArray, setDataArray] = useState(sampleData());
	const breakpointsArray = [
		{ items: 2, minWidth: 0 },
		{ items: 3, minWidth: 500 },
		{ items: 4, minWidth: 750 },
		{ items: 5, minWidth: 1000 }
	]

	useEffect(() => {
		setDataArray(sampleData())
	}, []);

	const dataElements = dataArray.map((item, index) => {
		const { imgUrl, width, height } = item;
		const paddingBottom = height / width * 100;
		const style = { paddingBottom: `${paddingBottom}%` }
		return (
			<MasonryItem key={index}>
				<div className="item__image-cover" style={style}>
					<img src={imgUrl} alt="img" />
				</div>
			</MasonryItem>
		)
	})

	return (
		<div className="app">
			<Masonry breakpointsArray={breakpointsArray}>
				{ dataElements }
			</Masonry>
		</div>
	);
}

export default App;
