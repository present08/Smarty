import React from 'react';

const ActionButtons = ({ handleChagneSubmit, navigate }) => {
    return (
        <div className='button-container'>
            <button
                onClick={handleChagneSubmit}
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            >
                대여하기
            </button>
            <button
                onClick={() => navigate('/')}
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            >
                이전
            </button>
        </div>
    );
};

export default ActionButtons;