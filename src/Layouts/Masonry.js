import React, { useEffect, useState, useRef } from 'react';
import './Css/Masonry.scss';

function Masonry(props) {
    // Vars
    const { extraClass, breakpointsArray, children } = props;
    const [width, setWidth] = useState(0);
    const [columns, setColumns] = useState(3);
    const [childCount, setChildCount] = useState(0);
    const [columnsHeightArray, setColumnsHeightArray] = useState([]);
    const [stylesArray, setStylesArray] = useState([]);
    const masonryGridRef = useRef(null);
    const layoutTimer = useRef(null);

    // Effects
    useEffect(() => {
        onResize();
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    useEffect(() => {
        if (children.length !== childCount) scheduleSetLayout(300, true);
        else scheduleSetLayout(300);
    }, [width, columns, children, childCount]);

    // Functions
    function onResize() {
        setWidth(nextWidth());
        setColumns(nextColumns());
    }

    function nextWidth() {
        if (masonryGridRef.current === null) return 1;
        return masonryGridRef.current.offsetWidth;
    }

    function nextColumns() {
        const _nextWidth = nextWidth();

        // Find columns from breakpoints
        let _nextColumns = 1;
        for (const breakpoint of breakpointsArray) {
            if (_nextWidth <= breakpoint.minWidth) break;
            _nextColumns = breakpoint.items;
        }

        return _nextColumns
    }

    function scheduleSetLayout(delay, isUpdateChild = false) {
        clearTimeout(layoutTimer.current);
        layoutTimer.current = setTimeout(() => {
            setLayout(isUpdateChild);
        }, delay);
    }

    function setLayout(isUpdateChild = false) {
        console.log('set layout')
        const _nextColumns = nextColumns();

        // Init heights array
        let _columnsHeightArray = new Array(_nextColumns).fill().map(_ => 0);

        // Get masonry child nodes from its ref
        const { childNodes } = masonryGridRef.current;

        // Build masonry items data
        const _stylesArray = Array.from(childNodes).map((child, _) => {
            // Left
            let left = 0;
            const minHeightIndex = _columnsHeightArray.indexOf(Math.min(..._columnsHeightArray));
            left = minHeightIndex / _columnsHeightArray.length * 100;

            // Top
            let top = 0;
            const minHeight = Math.min(..._columnsHeightArray);
            top = minHeight;

            // Add height to selected column
            _columnsHeightArray[minHeightIndex] += child.getBoundingClientRect().height;

            // Styles, set opacity if needed
            let stylesObj = {
                left: `${left}%`,
                top: `${top}px`
            };
            if (isUpdateChild === true) stylesObj.opacity = 0;

            return stylesObj;
        });

        setColumnsHeightArray(_columnsHeightArray);
        setStylesArray(_stylesArray);
        if (isUpdateChild === true) setChildCount(childNodes.length);
    }

    // Elements
    let ctnClass = "masonry__container";
    if (extraClass !== null) {
        ctnClass += ` ${extraClass}`;
    }
    const gridStyles = { height: `${Math.max(...columnsHeightArray)}px` };
    const itemWidth = 100 / columns;

    return (
        <div className={ctnClass}>
            <div className="masonry__grid" ref={masonryGridRef} style={gridStyles}>
                {
                    React.Children.map(children, (child, index) => {
                        if (index < stylesArray.length) {
                            const style = stylesArray[index];
                            const itemStyles = { ...{ width: `${itemWidth}%` }, ...style };
                            return React.cloneElement(child, { key: index, style: itemStyles });
                        }
                        return React.cloneElement(child, { key: index, isLoading: true });
                    })
                }
            </div>
        </div>
    );
}

export default Masonry;