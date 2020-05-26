import React from 'react';

function MasonryItem(props) {
    const { isLoading, style, children } = props;
    
    let itemClass = "masonry__item";
    if (!!isLoading) {
        itemClass += " is-loading";
    }

    return (
        <div className={itemClass} style={style}>
            <div className="masonry__item-content">
                {children}
            </div>
        </div>
    );
}

export default MasonryItem;