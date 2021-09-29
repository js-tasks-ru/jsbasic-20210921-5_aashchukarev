function showSalary(users, age) {
  let usersAgeFilter = users.filter( item => (item["age"] <= age) );
  let resultString = usersAgeFilter.reduce( (item, current) => item + current["name"] + ", " + current["balance"] + "\n", "" );
  return resultString.slice(0,-1);
}
