import { List } from "./list"
import { SearchPanel } from "./SearchPanel"
import { useEffect, useState } from "react"
import { cleanObject, useDebounce, useMount } from "utils"
import * as qs from "qs"

console.log(qs.stringify('123'))
const apiUrl = process.env.REACT_APP_API_URL
// console.log(apiUrl)
export const ProjectListScreen = () => {
  
  const [users, setUsers] = useState([])

  const [param, setParam] = useState({
    name: '',
    personId: ''
  })
  const debouncedParam = useDebounce(param, 200)
  const [list, setList] = useState([])

  useEffect(() => {
    
    fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(debouncedParam))}`).then(async response => {
      if(response.ok){
        setList(await response.json())
      }
    })
  }, [debouncedParam])

  useMount(() => {
    fetch(`${apiUrl}/users`).then(async response => {
      if(response.ok){
        setUsers(await response.json())
      }
    })
  })


  return <div>
    <SearchPanel users ={users} param={param} setParam={setParam}></SearchPanel>
    <List users ={users} list={list}></List>
  </div>
}