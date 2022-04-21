/**
 * @param {object} props
 * @param {{ title: string, photoUrl: string, width: number, height: number }} props.photo
 * @param {string} [props.extraClass]
 */
function _ItemImage(props) {
  const {
    photo: { title, photoUrl, width, height },
    extraClass,
  } = props;

  let imageClass = 'is-relative has-background-light';
  if (!!extraClass) imageClass += ` ${extraClass}`;

  const paddingBottom = (height / width) * 100;
  const style = { paddingBottom: `${paddingBottom}%` };

  return (
    <div className={imageClass} style={style}>
      <img className="is-block is-overlay" src={photoUrl} alt={title} />
    </div>
  );
}

export default _ItemImage;
