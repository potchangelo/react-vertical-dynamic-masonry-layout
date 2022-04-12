/**
 * @param {object} props
 * @param {{ title: string, description: string }} props.post
 * @param {string} [props.extraClass]
 */
function _ItemText(props) {
  const {
    post: { title, description },
    extraClass,
  } = props;

  let itemTextClass = 'content';
  if (!!extraClass) itemTextClass += ` ${extraClass}`;

  let paragraphElement = null;
  if (!!description) {
    paragraphElement = <p className="has-text-grey is-size-7 mt-3">{description}</p>;
  }

  return (
    <div className={itemTextClass}>
      <h6 className="mb-0">{title}</h6>
      {paragraphElement}
    </div>
  );
}

export default _ItemText;
