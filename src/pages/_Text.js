import { Masonry, MasonryItem } from '../layouts';
import { ItemText } from '../components';
import { dynamicPosts } from '../helpers';

const breakpoints = [
  { columns: 1, minWidth: 0, gap: 16, outerGap: 16 },
  { columns: 2, minWidth: 600, gap: 16, outerGap: 20 },
  { columns: 4, minWidth: 1096, gap: 16, outerGap: 20 },
  { columns: 5, minWidth: 1600, gap: 16, outerGap: 24 },
];

function _Text() {
  const postElements = dynamicPosts.map(post => (
    <MasonryItem key={post.id}>
      <ItemText post={post} extraClass="box" />
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

export default _Text;
