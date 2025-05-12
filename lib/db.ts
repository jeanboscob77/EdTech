// lib/mongodb.ts
import mongoose from 'mongoose'

const MONGODB_URL = 'mongodb://localhost:27017/umurava_Project'

if (!MONGODB_URL) {
  throw new Error('⚠️ Please define the MONGODB_URL environment variable')
}

let isConnected: boolean = false

export const connectDB = async () => {
  if (isConnected) {
    console.log('✅ Already connected to MongoDB')
    return
  }

  try {
    const db = await mongoose.connect(MONGODB_URL)
    isConnected = db.connections[0].readyState === 1
    console.log('✅ Database connected')
  } catch (error) {
    console.error('❌ MongoDB connection error:', error)
    process.exit(1)
  }
}
