import { Main, Masonry, MasonryItem } from '../layouts';
import { ItemImage } from '../components';
import { samplePhotos } from '../helpers';

const breakpoints = [
  { columns: 2, minWidth: 0, gap: 0 },
  { columns: 3, minWidth: 500, gap: 0 },
  { columns: 4, minWidth: 750, gap: 0 },
  { columns: 5, minWidth: 1000, gap: 0 },
  { columns: 6, minWidth: 1500, gap: 0 },
];

function _ImageNoGap() {
  const masonryItems = samplePhotos.map(photo => (
    <MasonryItem key={photo.id}>
      <ItemImage photo={photo} />
    </MasonryItem>
  ));
  return (
    <Main>
      <Masonry breakpoints={breakpoints}>{masonryItems}</Masonry>
    </Main>
  );
}

export default _ImageNoGap;
