function ucFirst(str) {
  let result = "";
  if (str == null || str == '') {
    return '';
  } else {
  result = str[0].toUpperCase() + str.slice(1);
  return result;
  }
}
 
