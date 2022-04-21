import { Main, Masonry, MasonryItem } from '../layouts';
import { ItemImage } from '../components';
import { samplePhotos } from '../helpers';

const breakpoints = [
  { columns: 2, minWidth: 0, gap: 12, outerGap: 16 },
  { columns: 3, minWidth: 500, gap: 16, outerGap: 20 },
  { columns: 4, minWidth: 750, gap: 20, outerGap: [32, 20] },
  { columns: 5, minWidth: 1000, gap: 24, outerGap: [32, 24] },
];

function _Image() {
  const masonryItems = samplePhotos.map(photo => (
    <MasonryItem key={photo.id}>
      <ItemImage photo={photo} />
    </MasonryItem>
  ));
  return (
    <Main>
      <Masonry breakpoints={breakpoints}>
        {masonryItems}
      </Masonry>
    </Main>
  );
}

export default _Image;
