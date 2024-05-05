import React, { useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

export default function Publications() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [data, setData] = useState([]);
  const {id} = useParams()
  useEffect(()=>{
   const fetcheData= async ()=>{
     try {
     const resulta = await axios.get(`http://localhost:3000/recherche/Publication?idCherch=${id}`) // to modify 
     console.log(resulta.data.Publications)
     setData(resulta.data.Publications)
   }
   catch(err){
     console.log(err);

   }

  } 
  console.log("id : "+id)
   fetcheData();
 },[])

  return (
    <div className="bg-white p-8">
      <ul>
        <li className="mb-4 px-4 py-2 flex justify-between items-center">
          <span className="text-lg font-bold">Titre</span>
          <span className="text-lg font-bold">Rang</span>
        </li>
      </ul>

      <ul>
        {data.map((item, index) => (
          <li className="mb-4 border rounded-lg bg-gray-100 px-4 py-2 flex justify-between items-center" key={index}>
            <NavLink to={`/publication/${item._id}`} className="text-sm hover:text-buttonDark">{item.Titre}</NavLink>
            <span>{item.rang}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
