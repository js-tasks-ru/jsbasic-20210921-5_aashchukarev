function sumSalary(salaries) {
  let summa = 0;
  
  for (let key in salaries) {
    
    if ( isFinite(salaries[key]) ) {
        
      summa += salaries[key]; 
  }

  }
  return summa;
}