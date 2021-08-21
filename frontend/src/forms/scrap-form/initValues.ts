import { ScrapFormValues, Scrap } from "../../model/Scrap.model";

const init = (values: Scrap | any): ScrapFormValues =>
  Object.assign(
    {
      title: values.title || "ex: T2 & T3 - Bayonne",
      provider: (values.provider && values.provider.host + ".fr") || "leboncoin.fr",
      url: values.url || "https://leboncoin.fr/...",
      frequency: values.pollInterval || 0,
    },
    values.id && { id: values.id }
  );

export default init;
