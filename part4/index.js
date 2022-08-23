const app = require("./app");
const http = require("http");
const logger = require("./utils/logger");

const server = http.createServer(app);

const {PORT} = require("./config");
server.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
})