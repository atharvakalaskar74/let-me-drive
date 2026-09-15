const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
const dns = require('dns');

// On Windows, local DNS servers often fail to resolve MongoDB SRV records.
// Setting public DNS fallback resolves SRV records reliably.
try {
  dns.setServers(['8.8.8.8', '1.1.1.1', '8.8.4.4']);
} catch (dnsErr) {
  // Ignore if running in constrained sandbox
}

// Ensure root .env is loaded regardless of current working directory
const rootEnvPath = path.resolve(__dirname, '../../.env');
dotenv.config({ path: rootEnvPath });

if (!process.env.MONGO_URI) {
  dotenv.config({ path: path.resolve(process.cwd(), '.env') });
}

const connectDB = async () => {
  const primaryUri = process.env.MONGO_URI;
  const localUri = 'mongodb://127.0.0.1:27017/let-me-drive';

  if (!primaryUri) {
    console.warn('⚠️ MONGO_URI not set. Falling back to local MongoDB: ' + localUri);
    const conn = await mongoose.connect(localUri);
    console.log(`✅ Connected to Local MongoDB! (Host: ${conn.connection.host})`);
    return conn;
  }

  try {
    const conn = await mongoose.connect(primaryUri, {
      dbName: 'let-me-drive',
      serverSelectionTimeoutMS: 5000,
    });

    console.log(`✅ MongoDB Atlas Connected Successfully! (Host: ${conn.connection.host})`);
    return conn;
  } catch (error) {
    console.warn(`⚠️ Primary MongoDB connection failed (${error.message}). Attempting fallback to local MongoDB instance...`);
    try {
      const fallbackConn = await mongoose.connect(localUri, {
        serverSelectionTimeoutMS: 4000,
      });
      console.log(`✅ Connected to Local MongoDB Fallback! (Host: ${fallbackConn.connection.host})`);
      return fallbackConn;
    } catch (fallbackError) {
      console.error('❌ Both Primary and Local MongoDB connections failed.');
      throw error;
    }
  }
};

module.exports = connectDB;
