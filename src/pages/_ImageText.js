import { Masonry, MasonryItem } from '../layouts';
import { ItemImage, ItemText } from '../components';
import { dynamicPosts } from '../helpers';

const breakpoints = [
  { columns: 2, minWidth: 0, gap: 12, outerGap: 16 },
  { columns: 3, minWidth: 500, gap: 16, outerGap: 20 },
  { columns: 4, minWidth: 750, gap: 20, outerGap: [32, 20] },
  { columns: 5, minWidth: 1000, gap: 24, outerGap: [32, 24] },
];

function ImageText() {
  const postElements = dynamicPosts.map(post => {
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
    </main>
  );
}

export default ImageText;
