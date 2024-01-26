export default async function InsertPlan(description,image){
   
    let token = localStorage.getItem('access') ? localStorage.getItem('access') : ''
    let data = null
    const uploadData = new FormData()
    uploadData.append('description', description)
    if (image != null)
    uploadData.append('image', image, image.name)
    uploadData.append('width', "45")
    uploadData.append('height', "23")
    try {
      let config = {
          method: 'POST',
          /*headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
           //'Authorization': `Bearer ${token}`
          }*/
          body:uploadData
        }
        let res = await fetch(`http://127.0.0.1:8000/Plans/`, config)
        if(res.status == 400){
          data = "fail"
        }
        else data = await res.json()
        /* if(res.status == 401){
          console.log("401")
          let refresToken = localStorage.getItem('refresh') ? localStorage.getItem('refresh') : ''
          let res = await fetch(`http://127.0.0.1:8000/refresh-token/`,{
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              //'Authorization': `Bearer ${token}`
            },
            body:JSON.stringify({'refresh':refresToken})
          })
          if (res.status == 401)
           localStorage.clear()
           else{
          let newTokenAcces = await res.json()
          console.log(newTokenAcces)
          localStorage.setItem('access',newTokenAcces.access);
          config.headers.Authorization = `Bearer ${newTokenAcces.access}`
          let res2 = await fetch(`http://localhost:8000/reportes/CommercialOperations/?date=${date}&commercial_office__office_province=${province}&page=${page}`, config)
          data = await res2.json()
           }
        }*/
        } catch (error) {
        //console.log(error);
        data = error
      }
    return data
    }