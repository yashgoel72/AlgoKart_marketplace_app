import React from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Card, CardContent, Typography } from '@mui/material';

function TransactionsPage(props) {
  const transactions_given = props.transactions_given
  const transactions_received = props.transactions_received
  return (
    <div>
     <Typography  variant="h3" sx = {{
      textAlign : "center",
      marginBottom : "3rem",

     }}>
        Transactions
     </Typography>
    <div className="transactions" style = {{ display: "flex", justifyContent: "space-around"}}>
        <div className="transactions_receieved">
          <Typography variant="h5" sx = {{ marginBottom : "2rem"}}> Transactions in which points received</Typography> 
          {transactions_received.map((transaction, index) => {
            console.log(transaction)
            return(
              <Card>
                <CardContent>
                <p>
                  Id : {transaction.id}
                </p>
                <p>
                  Receiver: { Buffer.from(transaction["application-transaction"]["application-args"][3], "base64").toString()}
                </p>
                <p>
                  Points Amount : {Buffer.from(transaction["application-transaction"]["application-args"][4], "base64").toString()}
                </p>
                </CardContent>
              </Card>)
          })}
        </div>
        <div className="transactions_given">
          <Typography variant="h5" sx = {{ marginBottom : "2rem"}}> Transactions in which points given</Typography> 
          {transactions_given.map((transaction, index) => {
            console.log(transaction)
            return(
              <Card>
                <CardContent>
                <p>
                  Id : {transaction.id}
                </p>
                <p>
                  Receiver: { Buffer.from(transaction["application-transaction"]["application-args"][3], "base64").toString()}
                </p>
                <p>
                  Points Amount : {Buffer.from(transaction["application-transaction"]["application-args"][4], "base64").toString()}
                </p>
                </CardContent>
              </Card>)
          })}
        </div>
    </div>
    </div>
  )
}

export default TransactionsPage