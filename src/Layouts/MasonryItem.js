import React from 'react';

function MasonryItem(props) {
    const { style, children } = props;
    return (
        <div className="masonry__item" style={style}>
            <div className="masonry__item-content">
                { children }
            </div>
        </div>
    );
}

export default MasonryItem;