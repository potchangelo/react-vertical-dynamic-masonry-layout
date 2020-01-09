import React, { useEffect, useState, useRef } from 'react';
import './Css/Masonry.scss';

function Masonry(props) {
    // Props & States
    const { breakpointsArray, children } = props;
    const [columns, setColumns] = useState(1);
    const [columnsHeightArray, setColumnsHeightArray] = useState([]);
    const [stylesArray, setStylesArray] = useState([]);
    const masonryGridRef = useRef(null);

    // Effects
    useEffect(() => {
        if ( children.length > 0 ) setLayout();
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    // Functions
    function onResize() {
        const _nextColumns = nextColumns();
        if (columns !== _nextColumns) {
            setLayout();
        }
    }

    function nextWidth() {
        if ( masonryGridRef.current === null ) return 1;
        return masonryGridRef.current.offsetWidth;
    }

    function nextColumns() {
        const _nextWidth = nextWidth();

        let _nextColumns = 1;
        for (const breakpoint of breakpointsArray) {
            if (_nextWidth <= breakpoint.minWidth) break;
            _nextColumns = breakpoint.items;
        }

        return _nextColumns
    }

    function setLayout() {
        const _nextColumns = nextColumns();
        console.log(`col = ${columns}, ncol = ${_nextColumns}`)

        // Init heights array
        let columnsHeightArray = new Array(_nextColumns).fill().map(u => 0); 

        // Get masonry child nodes from its ref
        const { childNodes } = masonryGridRef.current;

        // Build masonry items data
        const stylesArray = Array.from(childNodes).map( (child, _) => {
            // Left
            let left = 0;
            const minHeightIndex = columnsHeightArray.indexOf(Math.min(...columnsHeightArray));
            left = minHeightIndex / columnsHeightArray.length * 100;

            // Top
            let top = 0;
            const minHeight = Math.min(...columnsHeightArray);
            top = minHeight;

            // Update height to selected column
            columnsHeightArray[minHeightIndex] += child.offsetHeight;

            return {
                left: `${left}%`,
                top: `${top}px`
            };
        });

        setColumns(_nextColumns);
        setColumnsHeightArray(columnsHeightArray);
        setStylesArray(stylesArray);
    }

    // Elements
    const gridStyles = { height: `${Math.max(...columnsHeightArray)}px` };
    const itemWidth = 100 / columns;

    return (
        <div className="masonry__container">
            <div className="masonry__grid" ref={masonryGridRef} style={gridStyles}>
                {
                    React.Children.map(children, (child, index) => {
                        let itemStyles = { width: `${itemWidth}%` };
                        if (index < stylesArray.length) {
                            const style = stylesArray[index];
                            itemStyles = { ...itemStyles, ...style };
                        }
                        return React.cloneElement(child, { key: index, style: itemStyles });
                    })
                }
            </div>
        </div>
    );
}

export default Masonry;