import React, { useState, useEffect } from "react";
import axios from "axios";
import Page from "./Page";

const Journal = () => {
    const [data, setData] = useState([]);
    const email = localStorage.getItem('loggedInUser');

    useEffect(() => {
        fetchData();
    }, [email]);

    const fetchData = async () => {
        try {
            const response = await axios.post('http://localhost:8080/data', {
                data: { email: email }
            });
            setData(response.data.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.post('http://localhost:8080/delete', {
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