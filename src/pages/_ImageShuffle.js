import { useState } from 'react';
import { Main, Masonry, MasonryItem } from '../layouts';
import { ItemImage } from '../components';
import { dynamicPosts } from '../helpers';

const breakpoints = [
  { columns: 2, minWidth: 0, gap: 12, outerGap: 16 },
  { columns: 3, minWidth: 500, gap: 16, outerGap: 20 },
  { columns: 4, minWidth: 750, gap: 20, outerGap: [32, 20] },
  { columns: 5, minWidth: 1000, gap: 24, outerGap: [32, 24] },
];

function _ImageShuffle() {
  const [posts, setPosts] = useState(getShufflePosts());

  function getShufflePosts() {
    const arr = [...dynamicPosts];
    for (let i = arr.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function shufflePosts() {
    setPosts(getShufflePosts());
    // setPosts([]);
    // setTimeout(() => {
    //   setPosts(getShufflePosts());
    // }, 300);
  }

  const postElements = posts.map(post => (
    <MasonryItem key={post.id}>
      <ItemImage post={post} />
    </MasonryItem>
  ));

  return (
    <Main>
      <button onClick={_ => { shufflePosts() }}>Shuffle</button>
      <Masonry breakpoints={breakpoints}>
        {postElements}
      </Masonry>
    </Main>
  );
}

export default _ImageShuffle;
