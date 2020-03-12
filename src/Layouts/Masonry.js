import React, { useEffect, useState, useRef } from 'react';
import './Css/Masonry.scss';

const defaultBreakpointArray = [
	{ items: 2, minWidth: 0 },
	{ items: 3, minWidth: 500 },
	{ items: 4, minWidth: 1000 }
];

function Masonry(props) {
    // States
    const { extraClass, children } = props;
    const breakpointArray = props.breakpointArray || defaultBreakpointArray;
    const [width, setWidth] = useState(0);
    const [columns, setColumns] = useState(3);
    const [childCount, setChildCount] = useState(0);
    const [columnsHeightArray, setColumnsHeightArray] = useState([]);
    const [stylesArray, setStylesArray] = useState([]);
    const masonryGridRef = useRef(null);
    const layoutTimer = useRef(null);

    // Functions
    function onResize() {
        setWidth(1200);
        //setWidth(nextWidth());
        //setColumns(nextColumns());
    }

    function nextWidth() {
        console.log('23')
        // if (masonryGridRef.current === null) return 1;
        // return masonryGridRef.current.offsetWidth;
    }

    function nextColumns() {
        console.log('45')
        // const _nextWidth = nextWidth();
        // let _nextColumns = 1;
        // breakpointArray.forEach(breakpoint => {
        //     if (_nextWidth <= breakpoint.minWidth) return;
        //     _nextColumns = breakpoint.items;
        // });
        // return _nextColumns;
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
        const _stylesArray = Array.from(childNodes).map((child, index) => {
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
            if (isUpdateChild && index >= stylesArray.length) stylesObj.opacity = 0;

            return stylesObj;
        });

        setColumnsHeightArray(_columnsHeightArray);
        setStylesArray(_stylesArray);
        if (isUpdateChild) setChildCount(childNodes.length);
    }

    // Effects
    useEffect(() => {
        onResize();
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    useEffect(() => {
        if (children === null) scheduleSetLayout(0, true);
        else if (children.length !== childCount) scheduleSetLayout(300, true);
        else scheduleSetLayout(300);
    }, [width, columns, children, childCount]);

    // Elements
    let ctnClass = "masonry__container";
    if (extraClass !== null) {
        ctnClass += ` ${extraClass}`;
    }
    const gridStyles = { height: `${Math.max(...columnsHeightArray)}px` };
    const itemWidth = 100 / columns;

    let childElements = null;
    if (children !== null) {
        childElements = React.Children.map(children, (child, index) => {
            if (index < stylesArray.length) {
                const style = stylesArray[index];
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

/*

re layout (with delay)
- on first load => useeffect
- on every resize => useEffect
- children content change

*/