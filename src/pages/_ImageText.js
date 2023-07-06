import { Main, Masonry, MasonryItem } from '../layouts';
import { ItemImage, ItemText } from '../components';
import { samplePhotos } from '../helpers';

const breakpoints = [
  { columns: 2, minWidth: 0, gap: 12, outerGap: 16 },
  { columns: 3, minWidth: 640, gap: 16, outerGap: 20 },
  { columns: 4, minWidth: 840, gap: 20, outerGap: [32, 20] },
  { columns: 5, minWidth: 1080, gap: 24, outerGap: [32, 24] },
];

function _ImageText() {
  const masonryItems = samplePhotos.map(photo => {
    return (
      <MasonryItem key={photo.id}>
        <ItemImage photo={photo} />
        <ItemText photo={photo} extraClass="pt-4 pb-4" />
      </MasonryItem>
    );
  });
  return (
    <Main>
      <Masonry breakpoints={breakpoints}>{masonryItems}</Masonry>
    </Main>
  );
}

export default _ImageText;
