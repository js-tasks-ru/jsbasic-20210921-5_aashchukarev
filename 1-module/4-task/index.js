function checkSpam(str) {
  let firstString = '1xbet';
  let secondString = 'xxx';  
  let result = str.toLowerCase();
  
  return (result.includes(firstString)) ? true :
         (result.includes(secondString)) ? true : false;
}

