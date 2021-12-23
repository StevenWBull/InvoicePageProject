module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV, // Removed potential production b/c no plan to ship
    DATABASE_URL: process.env.DATABASE_URL
  }