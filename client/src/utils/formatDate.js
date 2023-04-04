import { format, getTime, formatDistanceToNow } from 'date-fns';
const { Timestamp } = require('google-protobuf/google/protobuf/timestamp_pb');


// ----------------------------------------------------------------------

export function fDate(date, newFormat) {
  const fm = newFormat || 'dd MMM yyyy';

  return date ? format(new Date(date), fm) : '';
}

export function fDateTime(date, newFormat) {
  const fm = newFormat || 'dd MMM yyyy p';

  return date ? format(new Date(date), fm) : '';
}

export function fTimestamp(date) {
  return date ? getTime(new Date(date)) : '';
}

export function fToNow(date) {
  return date
    ? formatDistanceToNow(new Date(date), {
        addSuffix: true,
      })
    : '';
}

export function formatTime(date){
  let isDay = false
  let dateFormat = date
  ? formatDistanceToNow(new Date(date), {
      addSuffix: true,
    })
  : '';
    
    let str = dateFormat.split(' ')
    if(str[0].startsWith("about")){
      str.shift()
      isDay= true
    }
    str.pop()


    if(isDay){
      if(String(str[1].startsWith("h"))){
      str[1] = Number(str[0]) > 1 ? "hrs" : "hr"
    }else if(String(str[1].startsWith("m"))){
      str[1] = Number(str[0]) > 1 ? "mins" : "min"
    }
    return str.join(' ')
    } else{
      return dateFormat
    }
}

export function timeStampToDate(timeStamp) {
  const timestamp = new Timestamp();
  timestamp.setSeconds(timeStamp.seconds);
  timestamp.setNanos(timeStamp.nanos);

  const date = timestamp.toDate();
  return date;
}

export function timeStampToDateString(timeStamp) {
  const timestamp = new Timestamp();
  timestamp.setSeconds(timeStamp.seconds);
  timestamp.setNanos(timeStamp.nanos);

  const date = timestamp.toDate();
  return  format(date, 'dd/MM/yyyy');
}