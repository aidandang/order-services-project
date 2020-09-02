import queryString from 'query-string';

export const searchFormValidation = (e, page, formData) => {
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