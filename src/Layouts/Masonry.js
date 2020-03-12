import React, { useEffect, useState, useRef, useCallback } from 'react';
import './Css/Masonry.scss';

const defaultBreakpointArray = [
	{ items: 2, minWidth: 0 },
	{ items: 3, minWidth: 500 },
	{ items: 4, minWidth: 1000 }
];

function Masonry(props) {
    // States
    const { 
        extraClass, 
        breakpointArray = defaultBreakpointArray,
        children 
    } = props;
    const [columnHeightArray, setColumnsHeightArray] = useState([]);
    const [styleArray, setStylesArray] = useState([]);
    const masonryGridRef = useRef(null);
    const layoutTimer = useRef(null);

    // Functions
    const getNextColumns = useCallback(() => {
        // Get width
        if (masonryGridRef.current === null) return 1;
        const nextWidth = masonryGridRef.current.offsetWidth;

        // Get columns
        let nextColumns = 1;
        breakpointArray.forEach(breakpoint => {
            if (nextWidth <= breakpoint.minWidth) return;
            nextColumns = breakpoint.items;
        });
        return nextColumns;
    }, [breakpointArray]);

    const setLayout = useCallback((delay = 300) => {
        clearTimeout(layoutTimer.current);
        layoutTimer.current = setTimeout(() => {
            console.log(styleArray.length);
            const nextColumns = getNextColumns();

            // Init heights array
            let nextColumnHeightArray = new Array(nextColumns).fill().map(_ => 0);

            // Get masonry child nodes from its ref
            const { childNodes } = masonryGridRef.current;

            // Build masonry items data
            const nextStyleArray = Array.from(childNodes).map((child, index) => {
                // Left
                let left = 0;
                const minHeightIndex = nextColumnHeightArray.indexOf(Math.min(...nextColumnHeightArray));
                left = minHeightIndex / nextColumnHeightArray.length * 100;

                // Top
                let top = 0;
                const minHeight = Math.min(...nextColumnHeightArray);
                top = minHeight;

                // Add height to selected column
                nextColumnHeightArray[minHeightIndex] += child.getBoundingClientRect().height;

                // Styles, set opacity if needed
                let stylesObj = {
                    left: `${left}%`,
                    top: `${top}px`
                };
                if (index >= styleArray.length) stylesObj.opacity = 0;

                return stylesObj;
            });

            setColumnsHeightArray(nextColumnHeightArray);
            setStylesArray(nextStyleArray);
            // TODO: -- prevStyleArray instead of dependency
        }, delay);
    }, [styleArray.length, getNextColumns]);

    // Effects
    useEffect(() => {
        window.addEventListener('resize', setLayout);
        return () => window.removeEventListener('resize', setLayout);
    }, [setLayout]);

    useEffect(() => {
        if (children === null) setLayout(0);
        else setLayout();
    }, [children, setLayout]);

    // Elements
    let ctnClass = "masonry__container";
    if (extraClass !== null) {
        ctnClass += ` ${extraClass}`;
    }
    const gridStyles = { height: `${Math.max(...columnHeightArray)}px` };
    const itemWidth = 100 / getNextColumns();

    let childElements = null;
    if (children !== null) {
        childElements = React.Children.map(children, (child, index) => {
            if (index < styleArray.length) {
                const style = styleArray[index];
                const itemStyles = { ...{ width: `${itemWidth}%` }, ...style };
                return React.cloneElement(child, { key: index, style: itemStyles });
            }
            return React.cloneElement(child, { key: index, isLoading: true });
        });
    }

    return (
        <div className={ctnClass}>
            <div className="masonry__grid" ref={masonryGridRef} style={gridStyles}>
                {childElements}
            </div>
        </div>
    );
}

export default Masonry;