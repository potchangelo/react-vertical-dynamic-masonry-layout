import React from 'react';

function MasonryItem(props) {
    const { isLoading, style, children } = props;
    let _class = "masonry__item";
    if (isLoading === true) {
        _class += " is-loading";
    }
    return (
        <div className={_class} style={style}>
            <div className="masonry__item-content">
                { children }
            </div>
        </div>
    );
}

export default MasonryItem;