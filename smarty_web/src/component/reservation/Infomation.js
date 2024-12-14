import React, { useState } from 'react';
import styled from 'styled-components';


const TabMenu = styled.ul`
  background-color: #e7edf1;
  font-weight: bold;
  display: flex;
  flex-direction: row;
  align-items: center;
  list-style: none;
  border-radius: 10px 10px 0px 0px;
  width : 30%;
  position:relative;
  top:4px;

  .submenu {
    display: flex;
    width: 50%;
    padding: 15px;
    font-size: 15px;
    border-radius: 10px 10px 0px 0px;
    justify-content:center;
  }

  .focused {
    background-color: #011b2f;;
    color: aliceblue;
  }
`;

const Desc = styled.div`
  text-align: left;
  height: 500px;
  border: 4px solid #e7edf1;
`;

const Information = ({ props }) => {
  const [currentTab, setCurrentTab] = useState(0);

  const menuArr = [
    { name: '이용안내', content: props.info },
    { name: '주의사항', content: props.caution },
    // { name: 'Tab3', content: 'Tab menu THREE' },
  ];

  const selectMenuHandler = (index) => {
    setCurrentTab(index);
  };

  return (
    <div className='tab_container'>
      <TabMenu>
        {menuArr.map((el, index) => (
          <li key={index} className={index === currentTab ? "submenu focused" : "submenu"}
            onClick={() => selectMenuHandler(index)}>{el.name}</li>
        ))}
      </TabMenu>
      <Desc>
        <div><pre>{menuArr[currentTab].content}</pre></div>
      </Desc>
    </div>
  )
}

export default Information;