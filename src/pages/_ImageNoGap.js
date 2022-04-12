import { Masonry, MasonryItem } from '../layouts';
import { ItemImage } from '../components';
import { dynamicPosts } from '../helpers';

const breakpoints = [
  { columns: 2, minWidth: 0, gap: 0 },
  { columns: 3, minWidth: 500, gap: 0 },
  { columns: 4, minWidth: 750, gap: 0 },
  { columns: 5, minWidth: 1000, gap: 0 },
];

function _ImageNoGap() {
  const postElements = dynamicPosts.map(post => (
    <MasonryItem key={post.id}>
      <ItemImage post={post} />
    </MasonryItem>
  ));
  return (
    <main className="main-content">
      <Masonry breakpoints={breakpoints}>
        {postElements}
      </Masonry>
    </main>
  );
}

export default _ImageNoGap;
