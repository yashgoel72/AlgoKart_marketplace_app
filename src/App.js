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
  //const [points, setPoints] = useState(0);
  const [points_given, setPointsGiven] = useState(0);
  const [points_received, setPointsReceived] = useState(0);

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
    let note = new TextEncoder().encode("points-exchanged:uv3");
    let encodedNote = Buffer.from(note).toString("base64");
    let transactionInfo = await indexerClient.searchForTransactions()
        .address(accountAddress)
        .notePrefix(encodedNote)
        .do();
        console.log(transactionInfo);
    let points_given = 0;
    let points_received = 0;
    for (const transaction of transactionInfo.transactions) {
        // console.log(transaction)
       // points = algosdk.decodeUint64(transaction["application-transaction"]["application-args"][4] , "mixed");
       let points_received_address = Buffer.from(transaction["application-transaction"]["application-args"][2], "base64").toString();
       let points_given_address = Buffer.from(transaction["application-transaction"]["application-args"][3], "base64").toString();
       if(accountAddress === points_received_address)
       points_received += Number(Buffer.from(transaction["application-transaction"]["application-args"][4], "base64").toString());
       if(accountAddress === points_given_address)
       points_given += Number(Buffer.from(transaction["application-transaction"]["application-args"][4], "base64").toString());
       //points += Number(Buffer.from(transaction["application-transaction"]["application-args"][4], "base64").toString());
    }
    setPointsGiven(points_given);
    setPointsReceived(points_received);
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
                          //points={Number(points)}
                          points_given={points_given}
                          points_received={points_received}
                          disconnect={disconnect}
                          symbol={"ALGO"}
                      />
                  </Nav.Item>
              </Nav>
              <main>
                  <Products address={address} fetchBalance={fetchBalance} fetchPoints={fetchPoints} user_points={points_received}/>
              </main>
          </Container>
      ) : (
          <Cover name={"Street Food"} coverImg={coverImg} connect={connectWallet}/>
      )}
  </>
);
}

export default App;