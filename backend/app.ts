import { cacheClient } from "./clients";
import { logger } from "./utils";
import { advisor, restAPIServer } from "./services";

logger.info("Starting HomePoke...");
advisor.start();
restAPIServer.start();

for (const signal of ["SIGINT", "SIGTERM", "SIGQUIT"]) {
  process.on(signal, () => {
    try {
      logger.info("Stoping HomeFetcher...");
      cacheClient.quit(() => {
        process.exit(0);
      });
    } catch (e) {
      logger.error({ message: e.message, stack: e.stack });
      process.exit(1);
    }
  });
}
