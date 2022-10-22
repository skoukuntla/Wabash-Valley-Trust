import mongoose from 'mongoose'

const connectMongo = () =>
  new Promise((res, rej) => {
    const mongoURI = process.env.MONGO_URI

    if (!mongoURI) {
      console.log('missing MONGO_URI env')
      return
    }

    mongoose.connect(mongoURI).catch((err) => {
      console.error(err)
      rej(err)
    })

    const db = mongoose.connection
    db.once('open', () => {
      console.log('connected to mongodb')
      res('success')
    })
  })

export default connectMongo
