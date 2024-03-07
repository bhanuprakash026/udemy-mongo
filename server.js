const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = require('./app');

dotenv.config({ path: './.env' });

// SERVER LISTENING
const port = process.env.PORT;
app.listen(port, () => {
	console.log(`Server is running on PORT ${port}`);
});

const DBPassword = process.env.DATABASE_PASSWORD;
mongoose.connect(`mongodb+srv://admin:${DBPassword}@cluster0.twmilcy.mongodb.net/?retryWrites=true&w=majority`)
	.then(() => {
		console.log("DB Connected successfully");
	})
	.catch((err) => {
		console.log(err.message);
	});