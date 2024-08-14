import React, { useState, useEffect } from "react";
import axios from "axios";
import Page from "./Page";

const Journal = () => {
    const [data, setData] = useState([]);
    const email = localStorage.getItem('loggedInUser');


    const fetchData = async () => {
        try {
            const response = await axios.post('https://wellnessapp-production.up.railway.app/data', {
                data: { email: email }
            });
            setData(response.data.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [email]);


    const handleDelete = async (id) => {
        try {
            await axios.post('https://wellnessapp-production.up.railway.app/delete', {
                data: { _id: id }
            });
            setData(prevData => prevData.filter(item => item._id !== id));
        } catch (error) {
            console.error("Error deleting item:", error);
            alert('Error deleting item. Please try again.');
        }
    };

    return (
        <div>
            {data.map((item) => (
                <Page 
                    key={item._id}
                    heading={'Journal'} 
                    date={item.date} 
                    id={item._id}
                    onDelete={handleDelete}
                />
            ))}
        </div>
    );
};

export default Journal;
