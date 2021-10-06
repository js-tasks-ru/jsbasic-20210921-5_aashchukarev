function makeFriendsList(friends) {
  let ul = document.createElement('ul');
    
    let renewalFriends = friends.map(item => document.createElement('li'));

    renewalFriends.forEach( (element, index) => element.innerHTML = friends[index].firstName + " " + friends[index].lastName );
    
    ul.append(...renewalFriends);
    
    return ul;
}
