import React, {useEffect,useState} from 'react';

function Clock() {

const [time, setTime] = useState({
    minutes: new Date().getMinutes(),
    hours: new Date().getHours(),
    seconds: new Date().getSeconds(),
    suffix: "AM"
  })
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      const date = new Date();
      if (date.getHours() > 12) {
        setTime({
            minutes: date.getMinutes(),
            hours: date.getHours()-12,
            seconds: date.getSeconds(),
            suffix: "PM"
          })
      }
      else {
        setTime({
            minutes: date.getMinutes(),
            hours: date.getHours(),
            seconds: date.getSeconds(),
            suffix: "AM"
        })
    }
    }, 1000)

    return () => clearInterval(intervalId);
  }, [])

  const convertToTwoDigit = (number) => {
    return number.toLocaleString('en-US', {
      minimumIntegerDigits: 2
    })
  }

  return (
    <div className='clock'>
      <span>{convertToTwoDigit(time.hours)}:</span>
      <span>{convertToTwoDigit(time.minutes)}:</span>
      <span>{convertToTwoDigit(time.seconds)} </span>
      <span>{time.suffix}</span>
    </div>
  );
}
export default Clock;