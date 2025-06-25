const exp = require("express");
const app = exp();
const dotEnv = require("dotenv");
dotEnv.config();    
const mongoose = require("mongoose");
const PORT = 3000;

app.use(exp.json());
app.use('/vendor', require('./routes/vendorRoute'));

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB connected"))
.catch((err) => console.log("MongoDB connection error:", err)); 

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});

