import React, { useState, useEffect } from "react";
import axios from "axios";
import Page from "./Page";

const Journal = () => {
    const [data, setData] = useState([]);
    const email = localStorage.getItem('loggedInUser');
    console.log(typeof(email))

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('http://localhost:8080/data', {
                    data: { email: email }
                });
                console.log(response.data);
                setData(response.data.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
    
        fetchData();
    }, [email]);

    return (
        <div>
            {data.map((item, index) => (
                <div key={index}>
                    <Page heading={'Journal'} date={item.date} id={item._id}/>
                </div>
            ))}
        </div>
    );
};

export default Journal;