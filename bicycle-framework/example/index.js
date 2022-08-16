const Application = require("../framework/Application.js");
const userRouter = require("./src/routers/userRouter.js");
const jsonParser = require("./src/midleware/parseJSON.js");
const urlParser = require("./src/midleware/parseUrl.js");

const PORT = 5000;

const app = new Application();

app.addRouter(userRouter);
app.use(jsonParser);
app.use(urlParser("http://localhost:5000"));

app.listen(PORT, () => console.log("server started at ", PORT));