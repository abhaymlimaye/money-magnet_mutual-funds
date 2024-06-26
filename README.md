# App Demo and Code Walkthrough
# https://share.vidyard.com/watch/raq8n3xrq1LBxkowvyqN5T?

# Prototype
﻿<img width="176" alt="Discover Screen" src="https://github.com/abhaymlimaye/money-magnet_mutual-funds/assets/32418776/fe2efaf8-5684-41c7-a0b0-0ef8d84fd39f">
<img width="176" alt="Holdings Screen" src="https://github.com/abhaymlimaye/money-magnet_mutual-funds/assets/32418776/6a72fde1-5db5-403d-af2b-f35bf7ea04c0">
<img width="176" alt="Orders Screen" src="https://github.com/abhaymlimaye/money-magnet_mutual-funds/assets/32418776/35e6265f-4189-4fd7-8bfc-0924239a35b4">
<img width="176" alt="Buy Order Modal" src="https://github.com/abhaymlimaye/money-magnet_mutual-funds/assets/32418776/76b08386-3ff9-4186-a0ef-4e8df50f7fb7">
<img width="176" alt="Sell Order Modal" src="https://github.com/abhaymlimaye/money-magnet_mutual-funds/assets/32418776/e151f1f1-eea5-49a7-80a4-23e9b4594d5d">

# Vision
# 1.	Aim of the project is to make Mutual Fund Investing easy.
* The app allows users to buy a mutual fund, view existing investments and sell the investment.
* The app has 3 Main Screens
  - Discover
User can browse through a List of Mutual Funds. There is a Tile Component for holding the information about a Mutual Fund like Fund Name, Fund House, Performance and Risk Factors. The screen will show top 10 Funds based on highest Performance and lowest Risk Rating. To see more funds, user can use the Search Bar at the top to look for any Fund in Canada. User can place a Buy Order from this screen.
  - Holdings
This will show the Funds user has already invested in.  There is a Tile Component for showing the information like Fund Name, Fund Symbol, Amount Invested, Profit Percentage and Current Value of the Fund. User can search through the Holdings by Fund Name using the Search Bar at the top. User can place a Sell or Buy Order for the held fund from this screen.
  - Orders
All the Buy and Sell type of Order will show up here. User will be redirected to this screen from Discover or Holdings screen after placing a Buy or a Sell Order. User can search through the Orders by Fund Name using the Search Bar at the top.  Each order has a Tile Component holding the information like Order Type (Buy/Sell), Amount ($), Fund Name, Timestamp of when the Order was placed, Order Status (Processing/Complete/Failed) and Order ID (from Firebase). Orders are sorted from Latest to Oldest.
* The types of data needed: -
  - List of Mutual Funds: Third party API twelvedata.com
  - Holdings: Firebase Realtime Database
  - Orders: Firebase Realtime Database
 
# 2.	APIs used
* List of Mutual Funds – Third party API twelvedata.com
The free version of this API provides limited credits to get some basic Mutual Fund data for the provided country like Name of the Fund, Name of the Fund House, Fund Symbol, Performance Rating, Risk Rating.
* Firebase - Realtime Database
It is used to store and manipulated the data for Holdings and Orders.

# 3.	Risks: -
* Data about the Mutual Funds is very valuable and hence it is not easily available. Especially the free version provided by third party venders are extremely limited in terms of amount of useful data provided and number of free API calls.
* Ensuring data integrity in case of any kind of failure while making a Buy or Sell Order is crucial. This resulted in limiting some of the offline functionality such as seeing the offline Order reflected in user’s Portfolio. Also, the Transaction Feature of Firebase Realtime DB has been used to ensure the ACID properties of our most important data which is Holdings.







