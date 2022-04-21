import { Main, Masonry, MasonryItem } from '../layouts';
import { ItemText } from '../components';
import { samplePhotos } from '../helpers';

const breakpoints = [
  { columns: 1, minWidth: 0, gap: 16, outerGap: 16 },
  { columns: 2, minWidth: 600, gap: 16, outerGap: 20 },
  { columns: 4, minWidth: 1096, gap: 16, outerGap: 20 },
  { columns: 5, minWidth: 1600, gap: 16, outerGap: 24 },
];

function _Text() {
  const masonryItems = samplePhotos.map(photo => (
    <MasonryItem key={photo.id}>
      <ItemText photo={photo} extraClass="box" />
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

export default _Text;
