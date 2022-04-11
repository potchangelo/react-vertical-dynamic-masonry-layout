import style from './css/masonry.module.scss';

function MasonryItem(props) {
  const { isLoading, itemStyles, children } = props;

  let itemClass = style.item;
  if (!!isLoading) {
    itemClass += ` ${style.itemIsLoading}`;
  }

  return (
    <div className={itemClass} style={itemStyles}>
      <div>{children}</div>
    </div>
  );
}

export default MasonryItem;
