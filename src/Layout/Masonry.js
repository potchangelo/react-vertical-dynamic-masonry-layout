import React, { useEffect, useState, useRef, useCallback } from 'react';


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
    const [columnHeightArray, setColumnHeightArray] = useState([]);
    const [styleArray, setStyleArray] = useState([]);
    const masonryGridRef = useRef(null);
    const layoutTimerRef = useRef(null);
    const layoutStatusRef = useRef('done'); // restart, update, done

    // Functions
    function getNextColumns(_breakpointArray) {
        // Get width
        if (masonryGridRef.current === null) return 1;
        const nextWidth = masonryGridRef.current.offsetWidth;

        // Get columns
        let nextColumns = 1;
        _breakpointArray.forEach(breakpoint => {
            if (nextWidth <= breakpoint.minWidth) return;
            nextColumns = breakpoint.items;
        });
        return nextColumns;
    }

    const setLayout = useCallback((_breakpointArray, delay = 300) => {
        clearTimeout(layoutTimerRef.current);
        if (layoutStatusRef.current === 'done') return;

        layoutTimerRef.current = setTimeout(() => {
            const nextColumns = getNextColumns(_breakpointArray);

            // Init heights array
            let nextColumnHeightArray = new Array(nextColumns).fill().map(_ => 0);

            // Get masonry child nodes from its ref
            const { childNodes } = masonryGridRef.current;

            // Build masonry items data
            const nextStyleArray = Array.from(childNodes).map(child => {
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

                return { left: `${left}%`, top: `${top}px` };
            });

            if (layoutStatusRef.current === 'restart') layoutStatusRef.current = 'update';
            else if (layoutStatusRef.current === 'update') layoutStatusRef.current = 'done';

            setColumnHeightArray(nextColumnHeightArray);
            setStyleArray(prevStyleArray => {
                return nextStyleArray.map((styles, index) => {
                    const _styles = Object.assign({}, styles);
                    if (index >= prevStyleArray.length) _styles.opacity = 0;
                    return _styles;
                });
            });
        }, delay);
    }, []);

    const restartLayout = useCallback((delay = 300) => {
        if (layoutStatusRef.current !== 'update') {
            layoutStatusRef.current = 'restart';
            setLayout(breakpointArray, delay);
        }
    }, [breakpointArray, setLayout]);

    const updateLayout = useCallback((delay = 0) => {
        if (layoutStatusRef.current === 'update') {
            setLayout(breakpointArray, delay);
        }
    }, [breakpointArray, setLayout]);

    const onResize = useCallback(() => restartLayout(), [restartLayout]);

    // Effects
    // 1. Resize browser -> restart
    useEffect(() => {
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, [onResize]);

    // 2. Data changed -> restart
    useEffect(() => {
        if (children === null) restartLayout(0);
        else restartLayout();
    }, [breakpointArray, children, restartLayout]);

    // 3. Style change -> update
    useEffect(() => {
        updateLayout();
    }, [columnHeightArray, styleArray, updateLayout]);

    // Elements
    let ctnClass = "masonry__container";
    if (extraClass !== null) {
        ctnClass += ` ${extraClass}`;
    }
    const gridStyles = { height: `${Math.max(...columnHeightArray)}px` };
    const itemWidth = 100 / columnHeightArray.length;

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