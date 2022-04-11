import React, { useState, useEffect, useCallback } from 'react';
import { Masonry, MasonryItem } from '../layouts';
import { SectionLoading, ItemImage } from '../components';
import { dynamicPosts } from '../helpers';

const breakpoints = [
  { columns: 2, minWidth: 0, gap: 12, outerGap: 16 },
  { columns: 3, minWidth: 500, gap: 16, outerGap: 20 },
  { columns: 4, minWidth: 750, gap: 20, outerGap: [32, 20] },
  { columns: 5, minWidth: 1000, gap: 24, outerGap: [32, 24] },
];

function Image() {
  // State
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Functions
  const getRandomPosts = useCallback(() => {
    const arr = [...dynamicPosts];
    for (let i = arr.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, []);

  const scheduleSetPosts = useCallback(
    (delay = 1500) => {
      setTimeout(() => {
        setPosts(getRandomPosts());
        setIsLoading(false);
      }, delay);
    },
    [getRandomPosts]
  );

  // Effects
  useEffect(() => scheduleSetPosts(0), [scheduleSetPosts]);

  // Elements
  const postElements = dynamicPosts.map(post => {
    return (
      <MasonryItem key={post.id}>
        <ItemImage post={post} />
      </MasonryItem>
    );
  });

  return (
    <main className="main-content">
      <Masonry breakpoints={breakpoints}>
        {postElements}
      </Masonry>
      <SectionLoading isLoading={isLoading} />
    </main>
  );
}

export default Image;
