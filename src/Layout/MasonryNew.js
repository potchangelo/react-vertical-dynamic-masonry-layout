import React, { useCallback, useEffect, useState } from 'react';

const defaultBreakpoints = [
  { columns: 1, minWidth: 0, gap: 0 },
  { columns: 2, minWidth: 600, gap: 24 },
  { columns: 3, minWidth: 960, gap: 24 },
];

function MasonryNew(props) {
  // - Data
  const { children } = props;
  const [columnHeights, setColumnHeights] = useState([0]);
  const [gap, setGap] = useState(0);

  // - Function
  function getNextBreakpoint() {
    let nextBreakpoint = defaultBreakpoints[0];

    // Get width
    if (typeof window === 'undefined') return nextBreakpoint;
    const docWidth = window.innerWidth;

    // Get columns
    defaultBreakpoints.forEach(breakpoint => {
      if (docWidth < breakpoint.minWidth) return;
      nextBreakpoint = breakpoint;
    });
    return nextBreakpoint;
  }

  function setLayout() {
    const nextBreakpoint = getNextBreakpoint();
    const nextColumnHeights = new Array(nextBreakpoint.columns).fill().map(_ => 0);
    setColumnHeights(nextColumnHeights);
  }

  const onResize = useCallback(() => {
    setLayout()
  }, [setLayout]);

  // - Effect
  useEffect(() => {
    window.addEventListener('resize', onResize);
    return () => { window.removeEventListener('resize', onResize); }
  }, [onResize]);

  // - Elements
  const gridStyle = { gridTemplateColumns: `repeat(${columnHeights.length}, 1fr)` };
  const gridColumnElements = columnHeights.map((_, i) => {
    // *** Insert content here
    return <div key={`g${i}`} style={{ backgroundColor: 'lightpink' }}>{children}</div>;
  });

  React.Children.map(children, (child, index) => {
    console.log(child)
  });

  return (
    <div className="masonry__container-new">
      <div className="masonry__grid-new" style={gridStyle}>
        {gridColumnElements}
      </div>
    </div>
  );
}

export default MasonryNew;
