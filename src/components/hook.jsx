console.clear();
console.log({ React, ReactDOM });
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const DURATION = 101;

const throttle = (function() {
  let timeout = undefined;
  return function throttle(callback) {
    if (timeout === undefined) {
      callback();
      timeout = setTimeout(() => {
        // allow another call to be throttled
        timeout = undefined;
      }, DURATION);
    }
  }
})();

/**
 * Wraps callback in a function and throttles it.
 * @returns Wrapper function
 */
function throttlify(callback) {
  return function throttlified(event) {
    throttle(() => {
      callback(event);
    });
  }
}

function createMousePosition(x, y) {
  return { x, y };
}

function MouseMove() {
  const [mousePosition, setMousePosition] = React.useState(createMousePosition(0, 0));

  // i absolutely don't want to rerun this hook at any other time
  // then initial mount and last unmount
  React.useEffect(() => {
    const saveMousePosition = throttlify((event) => {
      setMousePosition(createMousePosition(event.clientX, event.clientY));
    });

    document.addEventListener('mousemove', saveMousePosition);
    return () => {
      document.removeEventListener('mousemove', saveMousePosition);
    };
  }, [setMousePosition]);

  return (
    <h1
      style={{
        position: 'absolute',
        top: `${mousePosition.y}px`,
        left: `${mousePosition.x}px`,
        transform: 'translate(-50%, -50%)',
        margin: 0,
        transition: `${DURATION}ms linear`,
      }}
    >
      reactjs mousemove throttled version
    </h1>
  );
}

const root = document.getElementById('root');
ReactDOM.createRoot(root).render(<MouseMove />);