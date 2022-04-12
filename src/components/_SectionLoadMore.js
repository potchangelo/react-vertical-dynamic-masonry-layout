/**
 * @callback generalCallback
 */

/**
 * @param {object} props
 * @param {boolean} props.isShow
 * @param {generalCallback} props.onLoadMoreClick
 */
function _SectionLoadMore(props) {
  const { isShow, onLoadMoreClick } = props;
  if (!isShow) return null;
  return (
    <section className="section">
      <div className="container content has-text-centered">
        <button className="button is-dark" type="button" onClick={onLoadMoreClick}>
          Load more
        </button>
      </div>
    </section>
  );
}

export default _SectionLoadMore;
