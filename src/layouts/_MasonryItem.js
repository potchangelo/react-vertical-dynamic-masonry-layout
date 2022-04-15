import style from './css/masonry.module.scss';

/**
 * @param {object} props
 * @param {boolean} props.isLoading
 * @param {import('react').CSSProperties} props.itemStyle
 */
function _MasonryItem(props) {
  const { isLoading, itemStyle, children } = props;

  let itemClass = style.item;
  if (!!isLoading) {
    itemClass += ` ${style.itemIsLoading}`;
  }

  return (
    <div className={itemClass} style={itemStyle}>
      <div>{children}</div>
    </div>
  );
}

export default _MasonryItem;
