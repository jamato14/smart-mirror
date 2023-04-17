import React, { useState, useEffect } from 'react';
/**
 * Gets the current date and updates 1 time per minute
 * @returns String of the current date
 */
function DateTime() {
    const [dateState, setDateState] = useState(new Date());
    useEffect(() => {
           const interval = setInterval(() => setDateState(new Date()), 60000);
           return () => clearInterval(interval);
    }, []);
    return (
        <div className="Date">
            <p>
              {' '}
              {dateState.toLocaleDateString('en-US', {
                 weekday: 'long',
                 month: 'long',
                 year: 'numeric',
                 day: "numeric",
              })}
            </p>
        </div>
    );
}
export default DateTime