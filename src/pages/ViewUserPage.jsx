import React from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import GetData from '../hooks/GetData';
import Loading from '../components/Loading';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
export default function ViewUserPage() {
    const params = useParams();
    const [data, loading] = GetData(`http://localhost:5000/${params.id}`);
    const redirect = useNavigate();
    const DeleteUser = async () => {
        await axios.delete(`http://localhost:5000/${params.id}`);
        redirect("/")
    }
    return (
        <>
        {loading ? <Loading/> : (
            <div>
                <h1 className='text-4xl'>{data[0].name}</h1>
                <h1 className='text-2xl mt-2'>{data[0].email}</h1>
                <button className='bg-red-500 p-2 rounded-md mt-2 text-white'
                onClick={() => DeleteUser()}>
                    Delete
                </button>
                
            </div>
        )}
        </>
    )
}
