async function getUser(user: string){
   return  fetch(`https://api.github.com/users/${user}`) 
}

function getRepos(user: string){
   return fetch(`https://api.github.com/users/${user}/repos?sort=created&per_page=5`)
}

export { getUser, getRepos }