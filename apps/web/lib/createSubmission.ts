"use client"
import axios from 'axios';

export const runjudge = async () => {
    const options = {
        method: 'POST',
        url: 'https://judge0-ce.p.rapidapi.com/submissions',
        params: {
          base64_encoded: 'true',
          wait: 'false',
          fields: '*'
        },
        headers: {
          'x-rapidapi-key': '05422b61e2mshcb8adacf40faf91p12d1bejsnc4bb0a756a58',
          'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
          'Content-Type': 'application/json'
        },
        data: {
          language_id: 52,
          source_code: 'I2luY2x1ZGUgPHN0ZGlvLmg+CgppbnQgbWFpbih2b2lkKSB7CiAgY2hhciBuYW1lWzEwXTsKICBzY2FuZigiJXMiLCBuYW1lKTsKICBwcmludGYoImhlbGxvLCAlc1xuIiwgbmFtZSk7CiAgcmV0dXJuIDA7Cn0=',
          stdin: 'SnVkZ2Uw'
        }
      };
      
      try {
          const response = await axios.request(options);
          console.log(response.data);
        //   return response.data;
      } catch (error) {
          console.error(error);
      }
}

export const acceptjudge = async () => {

    const options = {
      method: 'GET',
      url: 'https://judge0-ce.p.rapidapi.com/submissions/071e12b9-d2ab-43ef-9249-b22eb9bb5081',
      params: {
        base64_encoded: 'true',
        fields: '*'
      },
      headers: {
        'x-rapidapi-key': '05422b61e2mshcb8adacf40faf91p12d1bejsnc4bb0a756a58',
        'x-rapidapi-host': 'judge0-ce.p.rapidapi.com'
      }
    };
    
    try {
        const response = await axios.request(options);
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
}