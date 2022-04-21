import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Main, Masonry, MasonryItem } from '../layouts';
import { ItemImage, ItemText, SectionLoadMore } from '../components';
import { samplePhotos } from '../helpers';

const breakpoints = [
  { columns: 2, minWidth: 0, gap: 12, outerGap: 16 },
  { columns: 3, minWidth: 640, gap: 16, outerGap: 20 },
  { columns: 4, minWidth: 840, gap: 20, outerGap: [32, 20] },
  { columns: 5, minWidth: 1080, gap: 24, outerGap: [32, 24] },
];

function _ImageTextAppend() {
  const [photos, setPhotos] = useState(samplePhotos);
  const [isLoading, setIsLoading] = useState(false);

  function loadMore() {
    setPhotos(prevPhotos => {
      const clonedsamplePhotos = samplePhotos.map(p => ({ ...p, id: uuidv4() }));
      return [...prevPhotos, ...clonedsamplePhotos];
    });
    setIsLoading(false);
  }

  function onLoadMoreClick() {
    setIsLoading(true);
    loadMore();
  }

  const masonryItems = photos.map(photo => {
    return (
      <MasonryItem key={photo.id}>
        <ItemImage photo={photo} />
        <ItemText photo={photo} extraClass="pt-4 pb-4" />
      </MasonryItem>
    );
  });

  return (
    <Main>
       <Masonry breakpoints={breakpoints}>
        {masonryItems}
      </Masonry>
      <SectionLoadMore isShow={!isLoading} onLoadMoreClick={onLoadMoreClick} />
    </Main>
  );
}

export default _ImageTextAppend;
