import React, { useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Masonry, MasonryItem } from '../layouts';
import { SectionLoading, ItemText } from '../components';
import { dynamicPosts } from '../helpers';

const breakpointArray = [
  { items: 1, minWidth: 0 },
  { items: 2, minWidth: 500 },
  { items: 3, minWidth: 750 },
  { items: 4, minWidth: 1000 },
  { items: 5, minWidth: 1250 },
];

function Text() {
  // State
  const [postArray, setPostArray] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Functions
  const getRandomPostArray = useCallback(() => {
    const arr = [...dynamicPosts];
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
        <ItemText post={post} extraClass="box" />
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

export default Text;
