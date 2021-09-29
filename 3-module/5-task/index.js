function getMinMax(str) {
  
  let arrNumber = str.split(" ").filter( item => {
    if( isFinite(item) ) {
        return +item;
    }
  } );

  let result = {
    min: Math.min(...arrNumber),
    max: Math.max(...arrNumber)
  };

  return result;

}
