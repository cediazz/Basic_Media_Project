import React from "react";
import { useState, useEffect } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [message, setMessage] = useState()
  const [specificData, setSpecificData] = useState({})

  const fetchData = async (url,id = "") => {
    try {
      setLoading(true)
      let res = await fetch(url + id)
      let data = await res.json()
      if (Array.isArray(data))
        setData(data)
      else
        setSpecificData(data)
      setLoading(false)
    }
    catch (error) {
      setError(error)
      setLoading(false)
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData(url);
  }, []);

  const refetchData = () => {
   
    setLoading(true)
    fetchData()
  };



  const insertData = async (url,config) => {
    setLoading(true)
    setMessage()
    let res = await fetch(url, config)
    if (res.status == 400) {
      setMessage("Ya existe esta descripción, por favor inserte otra")
      setError(true)
    }
    else fetchData('http://127.0.0.1:8000/Categorys/')
    setLoading(false)
    
  };

  const deleteData = async (url, value,config) => {
    setLoading(true)
    setMessage()
    let res = await fetch(url + value, config)
    if (res.status == 204) {
      setMessage("Eliminado")
      fetchData('http://127.0.0.1:8000/Categorys/')
    }
    else{
    setMessage("No se puede eliminar, compruebe que no tenga relación con un Medio")
    setError(true)
    }
    setLoading(false)
    
  };


  return { data, loading, error, message, specificData, refetchData, insertData,fetchData,deleteData }
}
export default useFetch
