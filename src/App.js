import React, {useState} from "react";
import Cover from "./components/Cover";
import './App.css';
import Wallet from "./components/Wallet";
import {Container, Nav} from "react-bootstrap";
import Products from "./components/marketplace/Products";
import {Notification} from "./components/utils/Notifications";
import {indexerClient, myAlgoConnect} from "./utils/constants";
import coverImg from "./assets/img/sandwich.jpg"
import algosdk from "algosdk";
//..

//..
const App = function AppWrapper() {

  const [address, setAddress] = useState(null);
  const [name, setName] = useState(null);
  const [balance, setBalance] = useState(0);
  const [points, setPoints] = useState(0);
  //const [points_given, setPointsGiven] = useState(0);
  //const [points_received, setPointsReceived] = useState(0);

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
    let note = new TextEncoder().encode("points-exchanged:uv2");
    let encodedNote = Buffer.from(note).toString("base64");
    let transactionInfo = await indexerClient.searchForTransactions()
        .address(accountAddress)
        .notePrefix(encodedNote)
        .do();
        console.log(transactionInfo);
    let points = 0;
    for (const transaction of transactionInfo.transactions) {
        // console.log(transaction)
       // points = algosdk.decodeUint64(transaction["application-transaction"]["application-args"][4] , "mixed");
       points += Number(Buffer.from(transaction["application-transaction"]["application-args"][4], "base64").toString());
    }
    setPoints(points);
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
          <Container fluid="md">
              <Nav className="justify-content-end pt-3 pb-5">
                  <Nav.Item>
                      <Wallet
                          address={address}
                          name={name}
                          amount={balance}
                          points={Number(points)}
                          disconnect={disconnect}
                          symbol={"ALGO"}
                      />
                  </Nav.Item>
              </Nav>
              <main>
                  <Products address={address} fetchBalance={fetchBalance} fetchPoints={fetchPoints}/>
              </main>
          </Container>
      ) : (
          <Cover name={"Street Food"} coverImg={coverImg} connect={connectWallet}/>
      )}
  </>
);
}

export default App;