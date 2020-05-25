import React from 'react';

function SectionLoadMore({ isShow, onLoadMoreClick }) {
    if (!isShow) return null;
    return (
        <section className="section">
            <div className="container content has-text-centered">
                <button
                    className="button is-dark"
                    type="button"
                    onClick={onLoadMoreClick}>
                    Load more
                </button>
            </div>
        </section>
    );
}

export default SectionLoadMore;