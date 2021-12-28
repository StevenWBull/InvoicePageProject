The schema for the Database tables are commented out at the top of the seeds/seed.tables.sql

You can populate your created database by running `npm run seed`, please make sure to add these variables to your server side .env file!

NODE_ENV=development
PORT=8000
TZ='UTC'
DATABASE_URL="postgresql://[db_user_here]@localhost/[db_name_here]"
TEST_DATABASE_URL="postgresql://[db_user_here]@localhost/[db_test_name_here]"