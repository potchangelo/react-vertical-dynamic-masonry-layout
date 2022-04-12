/**
 * @param {object} props
 * @param {{ title: string, imgUrl: string, imgWidth: number, imgHeight: number }} props.post
 * @param {string} [props.extraClass]
 */
function _ItemImage(props) {
  const {
    post: { title, imgUrl, imgWidth, imgHeight },
    extraClass,
  } = props;

  let imageClass = 'is-relative has-background-danger-light';
  if (!!extraClass) imageClass += ` ${extraClass}`;

  const paddingBottom = (imgHeight / imgWidth) * 100;
  const style = { paddingBottom: `${paddingBottom}%` };

  return (
    <div className={imageClass} style={style}>
      <img className="is-block is-overlay" src={imgUrl} alt={title} />
    </div>
  );
}

export default _ItemImage;
