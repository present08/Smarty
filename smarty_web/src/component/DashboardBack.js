import React from 'react';

const DashboardBack = ({ children }) => {

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f7f7f7', minHeight: '100vh', width: '100vw'
        }}>

            <div style={{
                display: 'flex', width: '95vw', minHeight: '90vh', borderRadius: '10px', backgroundColor: '#fcfcfc', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
                alignItems: 'center', justifyContent: 'center'
            }}>
                {children}
            </div>
        </div>
    );
}

export default DashboardBack;
