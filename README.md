# AlgoKart : Decentralised E-Commerce Platform with Customer Loyalty benefits

The Blockchain enabled Decentralised E-Commerce Platform AlgoKart helps achieve Operational efficiency, Transperancy, Cost-effectiveness, and Loyalty Program benefits for the Sellers and customers.
Through its Customer Loyalty Program, buyers earn Loyalty Points by buying Products from the Platform and can reedem these points for buying other Products, or Gift Cards or Merchendise they like.
Being a Platform Centric Marketplace, it allows users to act as buyers and sellers at the same time and earn and reward Loyalty Points according to the action , they being seller or buyer.

## Starting up this project

- Clone this repository using:

  > git clone https://github.com/yashgoel72/Algorand_marketplace_app

- In the project directory, run:

  > npm start
  >
  > > Runs the app in the development mode.\
  > > Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
  
 ## Usage and Incentivization

1. Right away, you can see the 'connect wallet' button which requires a [myAlgo](https://wallet.myalgo.com/) Wallet Account and you connect the Wallet

2. After connecting, at the top right Corner you can see your Wallet Balance, Total Points Available as buyer, and total Points given as seller.

3. There are 3 Major Operations that you canm perform.
  - Add Product using "Add Product Button"
  - Buy Product using "Buy" button after specifying the amount of Loyalty Points one wants to reedem for buying Product
  - Delete any Listing
 
 4. Adding a Product
  You must specify the following data for the product you want to selling and the complete and sign the transaction.

  >> Photo
  
5. Buying a Product
  Select product you want to buy and then specify the "count" as the quantity of product you want to buy and the number of "Points" that you want to reedem to buy that product. After that sign the transaction. We refer these "Points" as "Algokart Token" and the value chosen for Algokart Token is equal to 1 Microalgo.</br>
  Any combination of Algokart Token and microalgos can be used to purchase the product as long as both is greater than zero. 
  
  >> Photo
  
6. Delete the Product
  One can delete his/her product listing by clicking the delete icon on their listing and completing the transaction.
  >> Photo
  
7. View Transaction 
To Enable complete transperancy, one can get all their Buy and Sell Transactions by navigating to the "Transaction" in the Nav Bar.

## Working
When a transaction is performed, an Application Transaction object is created. A spectial "note" identifier is added to the transaction object. Our platform awards Algokart Token on the basis of amount of transaction. In order to calculate the number of Algorand Tokens we use the note as the identifier in order to segregate out the transaction of interest.

![alt text](https://github.com/yashgoel72/Algorand_marketplace_app/blob/main/Flow.svg)
