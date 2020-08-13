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