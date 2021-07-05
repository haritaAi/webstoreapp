import {API} from '../../backend';

export const createOrder = (userId,token,order) => {
    console.log(`${API}order/create/${userId}`,order);
    return fetch(`${API}order/create/${userId}`,{
        method : "POST",
        headers: {
            Accept : "application/json",
            "Content-Type": 'application/json',
            Authorization : `Bearer ${token}`
        },
        body : JSON.stringify({order})
    }).then(response => {return response.json()})
      .catch(err => console.log(err));
}