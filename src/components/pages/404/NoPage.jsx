import React from 'react';

const Error404Page = () => {
  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#191919',
      color: '#fff',
      flexDirection: 'column',
      fontFamily: 'Nunito, sans-serif',
    },
    errorCode: {
      fontSize: '10rem',
      margin: '0',
    },
    message: {
      fontSize: '2rem',
    },
    link: {
      color: '#f72901',
      textDecoration: 'none',
      fontWeight: 'bold',
    },
  };

  return (
    <div style={styles.container}>
      <div>
        <h1 style={styles.errorCode}>404</h1>
        <p style={styles.message}>Página não encontrada</p>
        <p style={styles.message}>
          Voltar para <a href="/" style={styles.link}>página inicial</a>
        </p>
      </div>
    </div>
  );
};

export default Error404Page;