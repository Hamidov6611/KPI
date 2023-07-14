import React, { useEffect, useState } from "react";
import Layout from "./Home/Layout";
import axios from "axios";
import Cookies from "js-cookie";
import { url } from "../utils/config";

const View = () => {

  let token = ''
  const [token1, setToken1] = useState("")
  const [rank, setRank] = useState([])

  useEffect(() => {
    let a = Cookies.get('token')
    if(a) {
      let res = JSON.parse(a)
      setToken1(res)
      token = res
    }
  }, [])

  const getData = async () => {
     try {
      let config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      console.log(config)
      console.log(token)
       const {data} = await axios.get(`${url}/auth/send_files/`, config)
       console.log(data)
       setRank(data)
     } catch (error) {
      console.log(error)
     }
  }
  useEffect(() => {
    getData()
  },[])
  return (
    <Layout>
      <table class="table container">
        <thead class="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Ismi</th>
            <th scope="col">Ball</th>
          
          </tr>
        </thead>
        <tbody>
          {rank?.map((item, index=1) =>
          
          { 
            let a = index + 1
        
        return  (
            <tr key={a}>
            <th scope="row">{a}</th>
            <td>{item?.name}</td>
            <td>{item?.ball}</td>
          </tr>
          
            )})}
         
        </tbody>
      </table>

     
    </Layout>
  );
};

export default View;
