// this is a function to get string of numbers with accounting format ex: '743.54', '432.00', 
// make a sum or a multiple of them then return a total,
// the return is a string of an accounting format number, ex: '1,175.54'

export const sumAmounts = (...items) => {
  return calculateAmounts('add', items);
}

export const multipleAmounts = (...items) => {
  return calculateAmounts('multiple', items);
}

const calculateAmounts = (math, items) => {
  let str = ""
  let total = null;

  if (math !== 'multiple' && math !== 'add') return false;
  if (math === 'add') total = 0;
  if (math === 'multiple') total = 100;
  
  for (let i = 0; i < items.length; i++) {
    if (items[i] === undefined) {
      str = '0';
    } else if (typeof(items[i]) === 'number') {
      str = items[i].toString();
    } else if (typeof(items[i]) !== 'string') {
      str = '0';
    } else {
      str = items[i];
    }

    if (!str.match(/\./g)) {
      str = str + '.00';
    }

    if (str.length < 3) {
      str = '0';
    } 
    if (str.length === 3) {
      if (!str.match(/^[.]{1}[0-9]{2}$/)) {
        str = '0';
      }
    }    
    if (str.length === 4) {
      if (!str.match(/^[0-9-]{1}[.]{1}[0-9]{2}$/)) {
        str = '0';
      }
    }
    if (str.length > 4) {
      if (!str.match(/^[1-9-]{1}[0-9,]+[.]{1}[0-9]{2}$/)) {
        str = '0';
      }
    }

    str = str.split(',').join('');
    str = str.split('.').join('');

    if (math === 'add') total = total + Number(str);
    if (math === 'multiple') total = total * Number(str)/100;
  }

  str = total.toString();

  let negative = false;

  if (str[0] === '-') {
    str = str.substring(1);
    negative = true;
  }

  let length = str.length;
  let integerStr = '';
  let decimalStr = '';

  if (length < 2) {
    integerStr = '';
    decimalStr = '0' + str;
  } else {
    integerStr = str.substring(0, length - 2);
    decimalStr = str.substring(length - 2);
  }

  if (integerStr.length > 3) {
    let arrStr = integerStr.split('');
    const remain = arrStr.length%3;
    let newStr = "";
    for (let i = 0; i < arrStr.length; i++) {
      newStr = newStr + arrStr[i];
      if ((((i+1)%3) === remain) && (i < arrStr.length - 1)) {
        newStr = newStr + ','
      }
    }

    integerStr = newStr;
  }

  str = integerStr + '.' + decimalStr
  
  if (negative) {
    return '-' + str
  } 
  
  return str
}