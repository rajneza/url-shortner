const { MongoClient } = require('mongodb');

// Connection URI
const uri = 'mongodb://127.0.0.1:27017'; // assuming MongoDB is running on localhost and default port

// Database Name
const dbName = 'myDatabase'; // change this to your database name

// Create a new MongoClient
const client = new MongoClient(uri);

// Connect to the MongoDB server
async function connectToMongo() {
    try {
        await client.connect();
        console.log('Connected to the MongoDB server');
        
        // Accessing a database
        const db = client.db(dbName);
        
        // Example: Accessing a collection
        const collection = db.collection('myCollection'); // change 'myCollection' to your collection name
        
        // Now you can perform operations on the collection
        // For example, you can insert documents:
        await collection.insertOne({ name: 'John', age: 30 });

        // Or you can find documents:
        const documents = await collection.find({}).toArray();
        console.log('Documents:', documents);
        
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    } finally {
        // Close the connection when done
        await client.close();
        console.log('Connection to MongoDB closed');
    }
}

// Call the function to connect
connectToMongo();
