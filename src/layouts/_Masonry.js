import React, { useState, useRef, useCallback, useEffect } from 'react';
import style from './css/masonry.module.scss';

/**
 * @typedef {object} breakpoint
 * @property {number} columns
 * @property {number} minWidth
 * @property {number} [gap]
 * @property {number|number[]} [outerGap]
 */

const defaultBreakpoints = [
  { columns: 1, minWidth: 0, gap: 0 },
  { columns: 2, minWidth: 600, gap: 24 },
  { columns: 3, minWidth: 960, gap: 24 },
];

/**
 * Masonry layout with position absolute, no scroll restoration
 * @param {object} props
 * @param {breakpoint[]} props.breakpoints
 */
function _Masonry(props) {
  // - Data
  const { breakpoints = defaultBreakpoints, children } = props;
  const [columnsHeights, setColumnsHeights] = useState([]);
  const [computedStyles, setComputedStyles] = useState([]);
  const layoutRef = useRef(null);
  const layoutTimerRef = useRef(null);
  const layoutStatusRef = useRef('done'); // restart, update, done

  // - Functions
  const getNextBreakpoint = useCallback(() => {
    let nextBreakpoint = breakpoints[0];

    // Get width
    if (typeof window === 'undefined') return nextBreakpoint;
    const docWidth = window.innerWidth;

    // Get columns
    breakpoints.forEach(breakpoint => {
      if (docWidth < breakpoint.minWidth) return;
      nextBreakpoint = breakpoint;
    });
    return nextBreakpoint;
  }, [breakpoints]);

  const setLayout = useCallback((delay = 150) => {
    clearTimeout(layoutTimerRef.current);
    if (layoutStatusRef.current === 'done') return;

    layoutTimerRef.current = setTimeout(() => {
      const { columns } = getNextBreakpoint();

      // Init heights array
      let nextColumnsHeights = new Array(columns).fill().map(_ => 0);

      // Get masonry child nodes from its ref
      const { childNodes } = layoutRef.current;

      // Build masonry items data
      const nextComputedStyles = Array.from(childNodes).map(child => {
        // Left
        let left = 0;
        const minHeightIndex = nextColumnsHeights.indexOf(Math.min(...nextColumnsHeights));
        left = (minHeightIndex / nextColumnsHeights.length) * 100;

        // Top
        let top = 0;
        const minHeight = Math.min(...nextColumnsHeights);
        top = minHeight;

        // Add height to selected column
        nextColumnsHeights[minHeightIndex] += child.getBoundingClientRect().height;

        return { left: `${left}%`, top: `${top}px` };
      });

      if (layoutStatusRef.current === 'restart') layoutStatusRef.current = 'update';
      else if (layoutStatusRef.current === 'update') layoutStatusRef.current = 'done';

      setColumnsHeights(nextColumnsHeights);
      setComputedStyles(prevComputedStyles => {
        return nextComputedStyles.map((computedStyle, index) => {
          const style = Object.assign({}, computedStyle);
          if (index >= prevComputedStyles.length) style.opacity = 0;
          return style;
        });
      });
    }, delay);
  }, [getNextBreakpoint]);

  const restartLayout = useCallback(
    (delay = 0) => {
      if (layoutStatusRef.current !== 'update') {
        layoutStatusRef.current = 'restart';
        setLayout(delay);
      }
    },
    [setLayout]
  );

  const updateLayout = useCallback(
    (delay = 0) => {
      if (layoutStatusRef.current === 'update') {
        setLayout(delay);
      }
    },
    [setLayout]
  );

  const onResize = useCallback(() => restartLayout(), [restartLayout]);

  // - Effects
  // 1. Browser resized -> restart
  useEffect(() => {
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [onResize]);

  // 2. Data changed -> restart
  useEffect(() => {
    if (children === null) restartLayout(0);
    else restartLayout();
  }, [breakpoints, children, restartLayout]);

  // 3. Style changed -> update
  useEffect(() => {
    updateLayout();
  }, [columnsHeights, computedStyles, updateLayout]);

  // - Attributes
  const columnCount = columnsHeights.length;
  const itemWidth = 100 / (columnCount || 1);
  const { gap = 0, outerGap = 0 } = getNextBreakpoint();
  const containerStyle = {
    padding: Array.isArray(outerGap) ? outerGap.map(g => `${g}px`).join(' ') : `${outerGap}px`
  }
  const layoutHeight = columnCount === 0 ? 0 : Math.max(...columnsHeights);
  const layoutStyle = {
    height: `${layoutHeight}px`,
    marginTop: `-${gap / 2}px`,
    marginLeft: `-${gap / 2}px`,
    marginRight: `-${gap / 2}px`,
  };

  // - Elements
  let childElements = null;
  if (!!children) {
    childElements = React.Children.map(children, (child, index) => {
      if (index < computedStyles.length) {
        const computedStyle = computedStyles[index];
        const itemStyle = {
          width: `${itemWidth}%`,
          padding: `${gap / 2}px`,
          ...computedStyle,
        };
        return React.cloneElement(child, {
          key: `masonry_item_${index}`,
          itemStyle,
        });
      }
      return React.cloneElement(child, {
        key: `masonry_item_${index}`,
        isLoading: true,
      });
    });
  }

  return (
    <div style={containerStyle}>
      <div className={style.layout} ref={layoutRef} style={layoutStyle}>
        {childElements}
      </div>
    </div>
  );
}

export default _Masonry;
