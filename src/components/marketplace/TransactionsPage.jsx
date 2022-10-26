import React from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

function TransactionsPage(props) {
  const transactions_given = props.transactions_given
  const transactions_received = props.transactions_received
  return (
    <div>
     <h3>
        Transactions
    </h3>
    <div className="transactions" style = {{ display: "flex"}}>
        <div className="transactions_receieved">
          <h4> Transactions Received</h4> 
          {transactions_received.map((transaction, index) => {
            console.log(transaction)
            return(
              <div>
                <p>
                  id : {transaction.id}
                </p>
                <p>
                  sender : {Buffer.from(transaction["application-transaction"]["application-args"][2], "base64").toString()}
                </p>
                  receiver: { Buffer.from(transaction["application-transaction"]["application-args"][3], "base64").toString()}
              </div>)
          })}
        </div>
        <div className="transactions_given">
          <h4> Transactions Given</h4> 
          {transactions_given.map((transaction, index) => {
            console.log(transaction)
            return(
              <div>
                <p>
                  id : {transaction.id}
                </p>
                <p>
                  sender : {Buffer.from(transaction["application-transaction"]["application-args"][2], "base64").toString()}
                </p>
                  receiver: { Buffer.from(transaction["application-transaction"]["application-args"][3], "base64").toString()}
              </div>)
          })}
        </div>
    </div>
    </div>
  )
}

export default TransactionsPage