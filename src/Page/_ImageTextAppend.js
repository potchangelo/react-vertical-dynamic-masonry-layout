import React, { useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Masonry, MasonryItem } from '../Layout';
import { SectionLoading, ItemImage, ItemText, SectionLoadMore } from '../Component';
import { samplePostArray } from '../Helper';

const breakpointArray = [
	{ items: 2, minWidth: 0 },
	{ items: 3, minWidth: 500 },
	{ items: 4, minWidth: 750 },
	{ items: 5, minWidth: 1000 }
];

function ImageText() {
    // State
    const [postArray, setPostArray] = useState([]);
    const [isLoading, setIsLoading] = useState(true); 

    // Functions
    const scheduleSetPostArray = useCallback((delay = 1500, isAppend = false) => {
        const randomPostArray = getRandomPostArray()
		setTimeout(() => {
            if (isAppend) {
                setPostArray(prevArray => prevArray.concat(randomPostArray))
            }
			else {
                setPostArray(randomPostArray);
            }
			setIsLoading(false);
		}, delay);
    }, []);
    
    const getRandomPostArray = useCallback(() => {
        const arr = [...samplePostArray];
        for (let i = arr.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }, []);

    function onLoadMoreClick() {
        setIsLoading(true);
        scheduleSetPostArray(1500, true);
    }
    
    // Effects
    useEffect(() => scheduleSetPostArray(), [scheduleSetPostArray]);
    
    // Elements
    const postElements = postArray.map(post => {
		return (
			<MasonryItem key={uuidv4()}>
				<ItemImage post={post} />
                <ItemText post={post} extraClass='tb-space' />
			</MasonryItem>
		);
	});

    return (
        <main className="main-content">
            <Masonry 
                breakpointArray={breakpointArray} 
                extraClass="masonry__container--gap">
                {postElements}
            </Masonry>
            <SectionLoading isLoading={isLoading} />
            <SectionLoadMore isShow={!isLoading} onLoadMoreClick={onLoadMoreClick} />
        </main>
    );
}

export default ImageText;