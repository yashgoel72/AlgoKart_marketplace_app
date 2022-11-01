import React, {useState} from "react";
import Cover from "./components/Cover";
import './App.css';
import Wallet from "./components/Wallet";
import {Container, Nav} from "react-bootstrap";
import Products from "./components/marketplace/Products";
import {Notification} from "./components/utils/Notifications";
import {indexerClient, myAlgoConnect , minRound} from "./utils/constants";
import coverImg from "./assets/img/logo.png"
import algoImg from "./assets/img/algorand-algo-icon.png"
import algosdk from "algosdk";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Transactions from "./components/marketplace/TransactionsPage.jsx";
import {Link, Route, Routes} from "react-router-dom"
//..

//..
const App = function AppWrapper() {
  
  const [address, setAddress] = useState(null);
  const [name, setName] = useState(null);
  const [balance, setBalance] = useState(0);
  //const [points, setPoints] = useState(0);
  const [points_given, setPointsGiven] = useState(0);
  const [points_received, setPointsReceived] = useState(0);
  const [transaction_points_received, set_transaction_points_received] = useState([]);
  const [transaction_points_given, set_transaction_points_given] = useState([]);
  const fetchBalance = async (accountAddress) => {
      indexerClient.lookupAccountByID(accountAddress).do()
          .then(response => {
            console.log(response)
              const _balance = response.account.amount;
              setBalance(_balance);
          })
          .catch(error => {
              console.log(error);
          });
  };
  const fetchPoints = async (accountAddress) => {
    let note = new TextEncoder().encode("points-exchanged:uv4");
    let encodedNote = Buffer.from(note).toString("base64");
    let transactionInfo = await indexerClient.searchForTransactions()
        .notePrefix(encodedNote)
        .txType("appl")
        .minRound(minRound)
        .do();
        console.log(transactionInfo);
    let points_given = 0;
    let points_received = 0;
    const transactions_received = [];
    const transactions_given = [];
    for (const transaction of transactionInfo.transactions) {
        // console.log(transaction)
       // points = algosdk.decodeUint64(transaction["application-transaction"]["application-args"][4] , "mixed");
       let points_received_address = Buffer.from(transaction["application-transaction"]["application-args"][2], "base64").toString();
       let points_given_address = Buffer.from(transaction["application-transaction"]["application-args"][3], "base64").toString();
       if(accountAddress === points_received_address)
       {
         points_received += Number(Buffer.from(transaction["application-transaction"]["application-args"][4], "base64").toString());
         transactions_received.push(transaction);
       }
       if(accountAddress === points_given_address)
       {
         points_given += Number(Buffer.from(transaction["application-transaction"]["application-args"][4], "base64").toString());
         console.log(Number(Buffer.from(transaction["application-transaction"]["application-args"][4], "base64").toString()))
         transactions_given.push(transaction);
       }
       //points += Number(Buffer.from(transaction["application-transaction"]["application-args"][4], "base64").toString());
    }
    setPointsGiven(points_given);
    setPointsReceived(points_received);
    set_transaction_points_received(transactions_received)
    set_transaction_points_given(transactions_given)
};

  const connectWallet = async () => {
      myAlgoConnect.connect()
          .then(accounts => {
              const _account = accounts[0];
              setAddress(_account.address);
              setName(_account.name);
              fetchBalance(_account.address);
              fetchPoints(_account.address);
          }).catch(error => {
          console.log('Could not connect to MyAlgo wallet');
          console.error(error);
      })
  };

  const disconnect = () => {
      setAddress(null);
      setName(null);
      setBalance(null);
  };
//..


//..
return (
  <>
      <Notification />
      {address ? (
          <Container fluid="md" style = {{width : "100%",maxWidth : "100%" }}>
                <AppBar position="static" style = {{marginBottom: "5rem"}}>
                    <Toolbar disableGutters>
                    <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              paddingLeft: "2rem"
            }}
          >
            MARKETPLACE
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } , paddingLeft: "5rem" }}>
              <Link to = "/" style={{ textDecoration: 'none' }}>
                 <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'white',
              textDecoration: 'none',
              paddingLeft: "2rem"
            }}
          >
                  Products
                </Typography>
              </Link >
              <Link to = "/Transactions" style={{ textDecoration: 'none' }}>
                <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'white',
              textDecoration: 'none',
              paddingLeft: "2rem"
            }}
          >
                Transactions
                </Typography>
              </Link>
          </Box>
            <Nav className="justify-content-end pt-3" style = {{ paddingBottom: "1rem"}}>
                  <Nav.Item>
                      <Wallet
                          address={address}
                          name={name}
                          amount={balance}
                          //points={Number(points)}
                          points_given={points_given}
                          points_received={points_received}
                          disconnect={disconnect}
                          symbol={"ALGO"}
                          algoImg = {algoImg}
                      />
                  </Nav.Item>
              </Nav>
          </Toolbar>
                </AppBar>   
              <main>
                  <Routes>
                  <Route path = '/' element = {<Products address={address} fetchBalance={fetchBalance} fetchPoints={fetchPoints} user_points={points_received}/>}/>
                  <Route path = '/Transactions' element = {<Transactions transactions_given = {transaction_points_given} transactions_received = {transaction_points_received}/>}/>
                  </Routes>
              </main>
          </Container>
      ) : (
          <Cover name={"AlgoKart"} coverImg={coverImg} connect={connectWallet}/>
      )}
  </>
);
}

export default App;
