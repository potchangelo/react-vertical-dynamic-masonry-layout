function MasonryItem(props) {
  const { isLoading, itemStyles, children } = props;

  let itemClass = 'masonry__item';
  if (!!isLoading) {
    itemClass += ' is-loading';
  }

  return (
    <div className={itemClass} style={itemStyles}>
      <div className="masonry__item-content">
        {children}
      </div>
    </div>
  );
}

export default MasonryItem;
