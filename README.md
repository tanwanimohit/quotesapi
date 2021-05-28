# quotesapi
Random Quotes generator Machine / API 

This is a Random Quoutes Generator API, Developed in Node.js. I am maintaining a json file named `quotes.db` which is working like a database to get the Random Quote. 

## How to Use?

- To Get Random Quote : Send Get Request to : `https://free-quotes-api.herokuapp.com/`
- To Get All Authors : Send Get Request to : `https://free-quotes-api.herokuapp.com/author`
- To Get Quotes of Specific Author : `https://free-quotes-api.free-quotes-api.com/author?authorname`
- To Get All Categories : Send Get Request to : `https://free-quotes-api.herokuapp.com/categories` 
- To Get Quote of Specific Category : `https://free-quotes-api.herokuapp.com/categoryname`

## How to Contribute ?

- Fork the Repo / Download the Repo

**If you want to contribute to the Node.js part then**

- You need to have latest Node.js in your System [Download](https://nodejs.org/en/download/)
- After that just Open the folder and write this.

```
node index.js
```
it will be live on `http://localhost:3000`

**If you want to Add Quotes**

Than just Add the New quote in json format at the end of `quotes.db`

```
{
    "quote": "Be as you wish to seem.",
    "author": "Socrates"
}
```

Thank you.
