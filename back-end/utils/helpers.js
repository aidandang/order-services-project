const replaceAll = (string, search, replace) => {
  return string.split(search).join(replace);
}

exports.replaceAll = replaceAll;