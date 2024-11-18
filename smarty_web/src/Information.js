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
  text-align: center;
  height: 500px;
  border: 4px solid #e7edf1;
`;

const Information = () => {
  const [currentTab, setCurrentTab] = useState(0);

  const menuArr = [
    { name: '이용안내 및 허가조건', content: '여기에 DB 데이터 넣기1' },
    { name: '이용수칙 및 환불기준 ', content: '여기에 DB 데이터 넣기2' },
    // { name: 'Tab3', content: 'Tab menu THREE' },
  ];

  const selectMenuHandler = (index) => {
    setCurrentTab(index);
  };

  return (
    <div className='tab_container'>
      <TabMenu>
        {menuArr.map((el, index) => (
          <li className={index === currentTab ? "submenu focused" : "submenu"}
            onClick={() => selectMenuHandler(index)}>{el.name}</li>
        ))}
      </TabMenu>
      <Desc>
        <div>{menuArr[currentTab].content}</div>
      </Desc>
    </div>
  )
}

export default Information