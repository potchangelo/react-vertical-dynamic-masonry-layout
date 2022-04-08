import React, { useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Masonry, MasonryItem } from '../Layout';
import { SectionLoading, ItemImage, ItemText } from '../Component';
import { samplePostArray } from '../Helper';

const breakpointArray = [
  { columns: 2, minWidth: 0, gap: 12 },
  { columns: 3, minWidth: 500, gap: 24 },
  { columns: 4, minWidth: 750, gap: 24 },
  { columns: 5, minWidth: 1000, gap: 24 },
];

function ImageText() {
  // State
  const [postArray, setPostArray] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Functions
  const getRandomPostArray = useCallback(() => {
    const arr = [...samplePostArray];
    for (let i = arr.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, []);

  const scheduleSetPostArray = useCallback(
    (delay = 1500) => {
      setTimeout(() => {
        setPostArray(getRandomPostArray());
        setIsLoading(false);
      }, delay);
    },
    [getRandomPostArray]
  );

  // Effects
  useEffect(() => scheduleSetPostArray(), [scheduleSetPostArray]);

  // Elements
  const postElements = postArray.map(post => {
    return (
      <MasonryItem key={uuidv4()}>
        <ItemImage post={post} />
        <ItemText post={post} extraClass="tb-space" />
      </MasonryItem>
    );
  });

  return (
    <main className="main-content">
      <Masonry breakpointArray={breakpointArray} extraClass="masonry__container--gap">
        {postElements}
      </Masonry>
      <SectionLoading isLoading={isLoading} />
    </main>
  );
}

export default ImageText;
