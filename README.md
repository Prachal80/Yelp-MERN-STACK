# Yelp-MERN-STACK
# Simulation of Yelp (yelp.com) Using React-Redux-Node-Kafka-MongoDB

This is the simulation of the website named Yelp. Here, the services offered by the Yelp for Customers and Restaurants are achieved in this project. Apache Kafka is used as a messaging service and to make the system distributed.

***Note:***<br> 
- ***This project was mainly focused on developing backend server using Nodejs, using Redux to maintain single source of truth for the whole application, utilizing database connection pooling to serve the queries faster and setting up kafka cluster to direct the client requests to different microservices to increase the performance.*** <br>
- ***For projects with attractive and intuitive client interfaces, please visit [Yelp Full Stack using REACT-NODE-EXPRESS-MySQL](https://github.com/Prachal80/yelp-prototype).***<br>
- ***To see the demo video of the project in motion, please visit [Here](https://youtu.be/CdXqcfPJRGk).***

## Architecture diagram:
<img width="765" alt="Screen Shot 2020-09-12 at 1 45 34 PM" src="https://user-images.githubusercontent.com/52833369/93004695-4255a100-f4fe-11ea-8abd-b176b834bf81.png">

## Project overview:
<br> 
<br> 
- Customer Dashboard page:
<img width="1140" alt="Screen Shot 2020-09-12 at 1 45 34 PM" src="https://user-images.githubusercontent.com/23629478/98515979-bff90d00-2220-11eb-9c34-955e5fcaae6e.png">
<br>

- Restaurant Dashboard:
<img width="1440" alt="Screen Shot 2020-09-12 at 2 09 13 PM" src="https://user-images.githubusercontent.com/23629478/98515975-be2f4980-2220-11eb-80a0-b99c2d3f0304.png">
<br>

-Orders Page:
<img width="1419" alt="Screen Shot 2020-11-08 at 8 38 44 PM" src="https://user-images.githubusercontent.com/23629478/98515967-bbccef80-2220-11eb-9e23-5d35e6694d8b.png">

-Restaurant Page(Customer Side):
<img width="1429" alt="Screen Shot 2020-11-08 at 8 31 47 PM" src="https://user-images.githubusercontent.com/23629478/98515987-c1c2d080-2220-11eb-9c0e-c9278de20f15.png">

## Application Performance comparison with/without connection pooling (using JMeter):
<img align="left" width="450" alt="Screen Shot 2020-09-12 at 3 01 46 PM" src="https://user-images.githubusercontent.com/52833369/93005752-e47a8680-f508-11ea-8525-1d60e8affd43.png">
<img width="450" alt="Screen Shot 2020-09-12 at 3 02 28 PM" src="https://user-images.githubusercontent.com/52833369/93005761-fc520a80-f508-11ea-8bd6-bf90179c0876.png">

| Throughput (Without connection pooling) |  Throughput (With connection pooling)  |
|:---------------------------------------:|:--------------------------------------:|
|       2603/minute (100 requests)        |        5540/minute (100 requests)      |
|       3490/minute (200 requests)        |        11070/minute (100 requests)     |
|       3418/minute (300 requests)        |        4524/minute (300 requests)      |
|       3427/minute (400 requests)        |        5649/minute (400 requests)      |
|       3461/minute (500 requests)        |        4204/minute (500 requests)      |

## Getting Started

Clone code from the master branch and extract files on your local computer.

### Prerequisites

You need to have NodeJS and NPM(Node Package Manager) and Kafka installed on your local device to succesfully run this project.

Node can be installed through this website[https://phoenixnap.com/kb/install-node-js-npm-on-windows]
Node can also be installed through NVM.
```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.1/install.sh | bash
```
Kafka installation can be done from this website[https://kafka.apache.org/documentation/]

### Installing

A step by step series of examples that tell you how to get a development env running

Clone repository on your local computer.
Traverse through the Backend folder, open terminal in this folder and enter
```
npm install
```
This will download all the dependencies required for the project.
After Installing all the dependencies enter
```
node index.js
```
"index.js" is our root file which will create connection with database and handle all the APIs

Travser to Frontend folder and again install the dependencies by entering
```
npm install
```
After Installing all the dependencies enter
```
npm start
```
It will start our frontend server which is in React.

* Install Kafka on your local computer and start Kafka and Zookeeper server.
Apache Kafka(https://kafka.apache.org/downloads)

Travser to Kafka-Backend folder and again install the dependencies by entering
```
npm install
```
After Installing all the dependencies enter
```
node server.js
```
It will create Kafka topics and will connect to Kafka server.

Everything is set and you are good to go.

## Running the tests

To run test for this system.
Traverse to test folder in Backend and enter
```
npm test
```
This will run the tests defined in the file.
You can add new Tests by adding test cases in this file.

## Deployment

To deploy this on live system go to aws.amazon.com and follow the steps to instantiate EC2 instance for each Backend, Frontend and Kafka Backend with Auto-Scaling and Load Balancer.

## Built With

* [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) - Programing Language used
* [React](https://reactjs.org/docs/getting-started.html) - The library used
* [Redux](https://redux.js.org/introduction/getting-started) - The open source library used
* [Apache Kafka](https://kafka.apache.org/documentation/) - A distributed streaming platform and Message Queues
* [Passport-JWT Token](http://www.passportjs.org/docs/) - Authentication Strategy used
* [NodeJS](https://nodejs.org/en/docs/) - run time open source development platform
* [MongoDB](https://docs.mongodb.com/) - Database used

## Author

* **Prachal Patel**
