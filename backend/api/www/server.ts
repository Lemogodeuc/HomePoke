import app from "../app";
import { logger } from "../../utils";
// const socketIO = require("socket.io");
// const handleSocket = require("../app/socket");
// const io = socketIO(server);
// handleSocket(io);

const PORT = process.env.EXPRESS_PORT || 4000;

export default {
  app,
  start() {
    return app.listen(PORT, () => {
      logger.info(`Express Server listening on port ${PORT}`);
    });
  },
};
