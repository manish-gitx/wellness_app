import React from 'react';
import { useNavigate } from 'react-router-dom'


const Page = ({ heading, date,id}) => {
  const navigate=useNavigate();
  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>{heading}</h2>
      <p style={styles.date}>{date}</p>
      <button onClick={() => navigate(`/document/${id}`)}>open</button>
    </div>
  );
};

// Inline styling for the component
const styles = {
  container: {
    border: '1px solid #ddd',
    borderRadius: '4px',
    padding: '16px',
    margin: '16px 0',
    backgroundColor: '#f9f9f9'
  },
  heading: {
    fontSize: '24px',
    margin: '0 0 8px'
  },
  date: {
    fontSize: '16px',
    color: '#555',
    margin: '0 0 16px'
  },
  button: {
    padding: '8px 16px',
    fontSize: '16px',
    cursor: 'pointer',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px'
  }
};

export default Page;
