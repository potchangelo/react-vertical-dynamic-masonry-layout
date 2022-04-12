import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Masonry, MasonryItem } from '../layouts';
import { ItemImage, ItemText, SectionLoadMore } from '../components';
import { dynamicPosts } from '../helpers';

const breakpoints = [
  { columns: 2, minWidth: 0, gap: 12, outerGap: 16 },
  { columns: 3, minWidth: 500, gap: 16, outerGap: 20 },
  { columns: 4, minWidth: 750, gap: 20, outerGap: [32, 20] },
  { columns: 5, minWidth: 1000, gap: 24, outerGap: [32, 24] },
];

function _ImageTextAppend() {
  const [posts, setPosts] = useState(dynamicPosts);
  const [isLoading, setIsLoading] = useState(false);

  function loadMore() {
    setPosts(prevPosts => {
      const clonedDynamicPosts = dynamicPosts.map(p => ({ ...p, id: uuidv4() }));
      return [...prevPosts, ...clonedDynamicPosts];
    });
    setIsLoading(false);
  }

  function onLoadMoreClick() {
    setIsLoading(true);
    loadMore();
  }

  const postElements = posts.map(post => {
    return (
      <MasonryItem key={post.id}>
        <ItemImage post={post} />
        <ItemText post={post} extraClass="tb-space" />
      </MasonryItem>
    );
  });

  return (
    <main className="main-content">
       <Masonry breakpoints={breakpoints}>
        {postElements}
      </Masonry>
      <SectionLoadMore isShow={!isLoading} onLoadMoreClick={onLoadMoreClick} />
    </main>
  );
}

export default _ImageTextAppend;
