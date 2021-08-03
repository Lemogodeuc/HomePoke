interface DataSourceConfig<TContext> {
  context: TContext;
}

export abstract class DataSource<TContext = any> {
  initialize?(config: DataSourceConfig<TContext>): void | Promise<void>;
}
