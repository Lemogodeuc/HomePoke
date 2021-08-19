import app from "../app";
import { logger } from "../../utils";

const PORT = process.env.EXPRESS_PORT || 4000;

export default {
  app,
  start() {
    return app.listen(PORT, () => {
      logger.info(`Express Server listening on port ${PORT}`);
    });
  },
};
