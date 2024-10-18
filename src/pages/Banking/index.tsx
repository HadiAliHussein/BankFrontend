import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { lazy } from "react";
import { useEffect } from 'react';
import MiddleBlockContent from "../../contentLogin/MiddleBlockContent.json";
import ProductContent from "../../contentLogin/ProductContent.json";
import { Button } from 'antd';
import { Title } from '../../components/Footer/styles';

const serverURL = process.env.REACT_APP_SERVER_DOMAIN
const Contact = lazy(() => import("../../components/ContactForm"));
const MiddleBlock = lazy(() => import("../../components/MiddleBlockLogin"));
const Container = lazy(() => import("../../common/Container"));
const ScrollToTop = lazy(() => import("../../common/ScrollToTop"));
const ContentBlock = lazy(() => import("../../components/ContentBlock"));

const MoneySend02Icon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={33} height={33} color={"#2e186a"} fill={"none"} {...props}>
    <path d="M7 6.67011C5.93408 6.67011 4.91969 6.5508 4 6.33552C3.04003 6.11081 2 6.8021 2 7.80858V18.8175C2 19.6259 2 20.0301 2.19412 20.4469C2.30483 20.6846 2.55696 21.008 2.75898 21.1714C3.11319 21.4578 3.4088 21.527 4 21.6654C4.91969 21.8807 5.93408 22 7 22C8.91707 22 10.6675 21.6141 12 20.978C13.3325 20.342 15.0829 19.956 17 19.956C18.0659 19.956 19.0803 20.0753 20 20.2906C20.96 20.5153 22 19.824 22 18.8175V7.80858C22 7.00021 22 6.59603 21.8059 6.17921C21.6952 5.94149 21.443 5.61811 21.241 5.45475C20 4.43872 18 5.44223 18 5.44223" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M14.5 13.5C14.5 14.8807 13.3807 16 12 16C10.6193 16 9.5 14.8807 9.5 13.5C9.5 12.1193 10.6193 11 12 11C13.3807 11 14.5 12.1193 14.5 13.5Z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M5.5 14.5L5.5 14.509" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M18.5 12.4922L18.5 12.5012" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9.5 4.5C9.99153 3.9943 11.2998 2 12 2M14.5 4.5C14.0085 3.9943 12.7002 2 12 2M12 2V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const AddCircleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 35" width={200} height={33} color={"#2e186a"} fill={"none"} {...props}>
    <path d="M12 8V16M16 12L8 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const PaymentSuccess02Icon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#2e186a"} fill={"none"} {...props}>
    <path d="M22 11.5V6.11397C22 5.32299 22 4.92751 21.8059 4.51966C21.6952 4.28705 21.443 3.97064 21.241 3.81079C20.8868 3.53051 20.5912 3.46281 20 3.3274C19.0803 3.11675 18.0659 3 17 3C15.0829 3 13.3325 3.37764 12 4C10.6675 4.62236 8.91707 5 7 5C5.93408 5 4.91969 4.88325 4 4.6726C3.04003 4.45273 2 5.12914 2 6.11397V16.886C2 17.677 2 18.0725 2.19412 18.4803C2.30483 18.7129 2.55696 19.0294 2.75898 19.1892C3.11319 19.4695 3.4088 19.5372 4 19.6726C4.91969 19.8833 5.93408 20 7 20C8.46884 20 9.83983 19.7783 11 19.3947" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M14 19C14 19 15 19 16 21C16 21 19.1765 16 22 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M14.5 11.5C14.5 12.8807 13.3807 14 12 14C10.6193 14 9.5 12.8807 9.5 11.5C9.5 10.1193 10.6193 9 12 9C13.3807 9 14.5 10.1193 14.5 11.5Z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M5.5 12.5L5.5 12.509" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M18.5 10.4922L18.5 10.5012" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Home = () => {
  const [users, setUsers] = useState([{id: 1, firstname:'', name: '', amount: 0}]);
  const [refresh, setRefresh] = useState(false);
  const [transactionWindow, setTransactionWindow] = useState(false);

  const [transactionInfo, setTransactionInfo] = useState({id : '', firstname: '', name: '', amount:0, recipientAddress : '', recipientID: 0});
  const [recipientAddress, setRecipientAddress] = useState('');
  const [recipientID, setRecipientID] = useState('');
  const [selectedAmount, setSelectedAmount] = useState(0);

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  const getUsers = async () => {
    const token = localStorage.getItem('token');
    try {
      console.log(serverURL+'/users')
      // Send login request to the API
      const response = await fetch(serverURL+'/users', {
        method: 'Get',
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });

      if (!response.ok) {
        if (response.status == 401){
          throw new Error('Incorrect Username or Password');
        }
        else{
          throw new Error('Login failed');
        }
        
      }

      const res = await response.json();
      setUsers(res.data);

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      console.log(errorMessage)
    }
  }

  useEffect(()=>{
    
    getUsers();
    
  },

  []);

  const handleAddUser = async () => {
    const token = localStorage.getItem('token');

    const largestId = users.reduce((maxId, item) => {
      return item.id > maxId ? item.id : maxId;
    }, 0); // Initial maxId is 0 or another starting value
    const userList = users

    const id = largestId + 1

    // Simple validation
    if (!firstname || !lastname) {
      alert('Firstname and Lastname are required');
      return;
    }

    try {
      // Send login request to the API
      const response = await fetch(serverURL+'/users/create', {
        method: 'Post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ id, firstname, lastname })
      });

      if (!response.ok) {
        if (response.status == 401){
          throw new Error('Incorrect Username or Password');
        }
        else{
          throw new Error('Login failed');
        }
        
      }

      const res = await response.json();

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      console.log(errorMessage)
    }
  

    getUsers()

    userList.push({id: id, firstname:firstname, name: lastname, amount: 100})
    setFirstname("")
    setLastname("")
    setUsers(userList) 
    setRefresh(prev => !prev);
  }


  const handleTransaction = async () => {
    const token = localStorage.getItem('token');
    const id = transactionInfo.id;

    // Simple validation
    if (!recipientAddress || !recipientID || !selectedAmount) {
      alert('Insuficient information for a transaction');
      return;
    }

    try {
      // Send login request to the API
      const response = await fetch(serverURL+'/transaction/send', {
        method: 'Post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ sender: id, recipientApiAdress: recipientAddress, recipientID: recipientID, amount: selectedAmount })
      });

      if (!response.ok) {
        if (response.status == 401){
          throw new Error('Incorrect Username or Password');
        }
        else{
          throw new Error('Login failed');
        }
        
      }

      const res = await response.json();

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      console.log(errorMessage)
    }
  

    getUsers()

    setRecipientAddress("")
    setRecipientID("")
    setSelectedAmount(0)

    setRefresh(prev => !prev);
  }


  const fillTransactionWindow = async (item: any) => {
    setTransactionWindow(true);
    console.log(item)

    setTransactionInfo(item)

    console.log(transactionInfo)

  }

  const LoadTableContents = () => {
    return(
      <>
      {users.map((item) => (
        <tr key={item.id}>
          <td style={cellStyle}>{item.id}</td>
          <td style={cellStyle}>{item.firstname}</td>
          <td style={cellStyle}>{item.name}</td>
          <td style={cellStyle}>{item.amount} €</td>
          <td style={cellStyle}>
            
          <div style={centerStyle}><button onClick={() => fillTransactionWindow(item)}><MoneySend02Icon/></button></div>
  
          </td>
  
        </tr>
      ))
    }
    </>
    
  )};

  // Inline styles using React.CSSProperties to satisfy TypeScript
  const tableStyle: React.CSSProperties = {
    border: '1px solid black',
    width: '100%',
    borderCollapse: 'collapse',
  };

  const cellStyle: React.CSSProperties = {
    border: '1px solid black',
    padding: '10px',
  };

  const centerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
    <Container>
      <ScrollToTop />
      <br></br><br></br><br></br><br></br>
      <div style={{ textAlign: 'center' }}>
      <h4>Banking Users</h4>
      </div>
      

    {!transactionWindow &&
    <>
    <br></br><br></br>
    <Title>Create New Banking User</Title>
    

    <input
      name=""
      type="username"
      placeholder="Firstname"
      value={firstname}
      onChange={(e) => setFirstname(e.target.value)}
    />

    <br></br><br></br>

    <input
      name=""
      type="username"
      placeholder="Lastname"
      value={lastname}
      onChange={(e) => setLastname(e.target.value)}
    />
    <br></br><br></br>

    <div style={centerStyle}><Button name="submit" onClick={handleAddUser}><AddCircleIcon/></Button></div>
    </>
    }
    
    
      
    {transactionWindow &&
    <>
    <br></br><br></br>
    <Title>Create a Transaction</Title>

    <br></br><br></br>

    <Title>Account ID: {transactionInfo.id}</Title>
    <Title>User: {transactionInfo.firstname} {transactionInfo.name}</Title>
    <input
      name=""
      type="username"
      placeholder="Address of recipient's API (http://...)"
      value={recipientAddress}
      onChange={(e) => setRecipientAddress(e.target.value)}
      
    />
    
    {console.log(recipientAddress)}
    <br></br><br></br>
    <input
      name=""
      type="username"
      max={5}
      placeholder="ID of recipient"
      value={recipientID}
      onChange={(e) => setRecipientID(e.target.value)}
    />
    <br></br><br></br>

    <input
      name=""
      type="number"
      max={transactionInfo.amount}
      min={0.01}
      step={0.01}
      placeholder="Amount in €"
      value={selectedAmount}
      onChange={(e) => {
        let value = Number(e.target.value);
    
        // Limit to two decimal places
        value = Math.floor(value * 100) / 100;
    
        // Ensure value is within the min and max range
        if (value > transactionInfo.amount) {
          setSelectedAmount(transactionInfo.amount);
        } else if (value < 0.01) {
          setSelectedAmount(0.01);
        } else {
          setSelectedAmount(value);
        }
      }}
    />
    <br></br><br></br>

    <div style={centerStyle}><Button name="submit" onClick={handleTransaction}><PaymentSuccess02Icon/></Button></div>
    </>
    }
    


    <br></br><br></br><br></br>
      
      <table style={tableStyle}>
      <thead>
        <tr>
          <th style={cellStyle}>ID</th>
          <th style={cellStyle}>Firstname</th>
          <th style={cellStyle}>Lastname</th>
          <th style={cellStyle}>Amount</th>
          <th style={cellStyle}>Send</th>
        </tr>
      </thead>

      <LoadTableContents></LoadTableContents>

    </table>

    

     <br></br><br></br><br></br><br></br><br></br><br></br> 
    </Container>
  );
};

export default Home;
