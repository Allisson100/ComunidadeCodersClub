// import Button from "./components/Button";

import {  useEffect, useState } from "react";
import api from "./services/api";
// import List from "./components/List";

function App() {
  
  const [username, setUsername] = useState('Allisson100')
  const [userData, setuserData] = useState({})

  useEffect(() => {
    const localStorageUserData = localStorage.getItem('@reactapp/githubUserData')

    setuserData(JSON.parse(localStorageUserData) || {})
  }, [])

  async function getUserGithubData() {
    const { data } = await api.get(username)

    localStorage.setItem('@reactapp/githubUserData', JSON.stringify(data))

    setuserData(data)
  }

  return (
    <div>
      <input type="text" value={username} onChange={(event) => setUsername(event.target.value)}/>
      <button onClick={getUserGithubData}>Pesquisar usuário</button>
      {userData.name}
      {userData.company}
    </div>
  );
}

export default App
