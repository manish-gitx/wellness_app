import React from 'react';
import { useNavigate } from 'react-router-dom';

const Page = ({ heading, date, id, onDelete }) => {
  const navigate = useNavigate();

  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>{heading}</h2>
      <p style={styles.date}>{formattedDate}</p>
      <button onClick={() => navigate(`/document/${id}`)}>Open</button>
      <button onClick={() => onDelete(id)} style={{ margin: '8px' }}>Delete</button>
    </div>
  );
};

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
