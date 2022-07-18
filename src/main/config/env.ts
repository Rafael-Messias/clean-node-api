export default {
  mongoUrl: process.env.MONGO_URL ?? 'mongodb://192.168.56.101:27017/clean-node-api',
  port: process.env.PORT ?? 5050
}
