import { useState, useEffect, useCallback } from 'react';
import { Masonry, MasonryItem } from '../layouts';
import { SectionLoading, ItemImage, ItemText } from '../components';
import { dynamicPosts } from '../helpers';

const breakpoints = [
  { columns: 2, minWidth: 0, gap: 12 },
  { columns: 3, minWidth: 500, gap: 24 },
  { columns: 4, minWidth: 750, gap: 24 },
  { columns: 5, minWidth: 1000, gap: 24 },
];

function ImageText() {
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
  useEffect(() => scheduleSetPosts(), [scheduleSetPosts]);

  // Elements
  const postElements = posts.map(post => {
    return (
      <MasonryItem key={post.id}>
        <ItemImage post={post} />
        <ItemText post={post} extraClass="tb-space" />
      </MasonryItem>
    );
  });

  // const postElements = posts.map(post => {
  //   return (
  //     <div key={uuidv4()}>
  //       <ItemImage post={post} />
  //       <ItemText post={post} extraClass="tb-space" />
  //     </div>
  //   );
  // });

  return (
    <main className="main-content">
      <Masonry breakpoints={breakpoints} extraClass="masonry__container--gap">
        {postElements}
      </Masonry>
      <SectionLoading isLoading={isLoading} />
    </main>
  );

  // return (
  //   <main className="main-content">
  //     <MasonryNew>
  //       {postElements}
  //     </MasonryNew>
  //     <SectionLoading isLoading={isLoading} />
  //   </main>
  // );
}

export default ImageText;
