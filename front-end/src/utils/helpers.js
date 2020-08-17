import queryString from 'query-string';

export const getPhoneStr = (string) => {
  let phoneStr = string.replace(/\D/g,'').substring(0, 10);
  if (phoneStr.length > 0) {
    return phoneStr.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
  } else { 
    return string
  }
}

export function searchFormValidation(e, page, formData) {
  let search = "";
  let data = {}

  if (formData.search.length > 0 ) {
    if (e.target.name.length > 0) {
      data = {
        ...formData, 
        [e.target.name]: formData.search,
        page: page || 1
      };
      search = queryString.stringify({ [e.target.name]: data[e.target.name], page: data.page }, {sort: false});
      return { data, search };
    }
  }
  else {
    data = {
      ...formData,
      page: page || 1
    }
    search = queryString.stringify({ page: data.page }, { sort: false })
    return { data, search };
  }

  return { data, search };
}

export const currencyMask = (value, limit) => {
  let str = value;
  // remove (,) and (.) from the string
  str = str.split(',').join('');
  str = str.split('.').join('');

  if (str.length === 1) {
    if (str.match(/^[1-9]{1}$/)) {
      return `.0${str}`;
    } else if (str === '0') {
      return ''
    }
  }

  if (str.length === 2) {
    if (str.match(/^[0-9]{2}$/)) {
      return `.${str}`
    }
  }

  if (str.length > 2 && str.length < limit) {
    let length = str.length;

    if (str.match(/^[0-9]{3,}$/)) {
      if (str[0] === '0') {
        str = str.substring(1);
        length = str.length;
      }

      let integerStr = str.substring(0, length - 2);
      let decimalStr = str.substring(length - 2);
      
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

      return integerStr + '.' + decimalStr
    }
  }

  return undefined;
}

export const integerMask = (value, limit) => {
  let str = value;
  // remove (,) from the string
  str = str.split(',').join('');

  // prevent user type 0 first, only 1 to 9 allowed
  if (str.length === 1) {
    if (str.match(/^[1-9]{1}$/)) return str;
  }

  // string from 2 to set limited numbers
  if (str.length > 1 && str.length < limit) {
    let length = str.length;

    if (str.match(/^[0-9]{2,}$/)) {
      // add (,) at thounsands to the number
      if (length > 3) {
        // split the string to array of numbers ex: [3, 5, 4, 3]
        let arrStr = str.split('');
        // join the array back to string by adding (,)
        const remain = arrStr.length%3;
        let newStr = "";
        for (let i = 0; i < arrStr.length; i++) {
          newStr = newStr + arrStr[i];
          if ((((i+1)%3) === remain) && (i < arrStr.length - 1)) {
            newStr = newStr + ','
          }
        }
        return newStr;
      }
      // if the number less than thousands return the original string
      return str;
    }
  }
  // if all other conditions then return null to prevent any action events.
  return undefined;
}

export const sumCurrencyNumbers = (...items) => {
  //convert to number using trick *100 to get integer numbers
  items = items.map(item => {
    return item.replace(/,/g, '')*100
  })

  // get sum of them then convert to string
  let sum = items.reduce((a, c) => a + c, 0);
  let str = sum.toString();

  // remove (,) and (.) from the string
  str = str.split(',').join('');
  str = str.split('.').join('');

  if (str.length === 1) {
    if (str.match(/^[1-9]{1}$/)) {
      return `.0${str}`;
    } else if (str === '0') {
      return ''
    }
  }

  if (str.length === 2) {
    if (str.match(/^[0-9]{2}$/)) {
      return `.${str}`
    }
  }

  if (str.length > 2) {
    let length = str.length;

    if (str.match(/^[0-9]{3,}$/)) {
      if (str[0] === '0') {
        str = str.substring(1);
        length = str.length;
      }

      let integerStr = str.substring(0, length - 2);
      let decimalStr = str.substring(length - 2);
      
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

      return integerStr + '.' + decimalStr
    }
  }

  return ''
}