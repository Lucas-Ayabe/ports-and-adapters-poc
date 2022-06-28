export interface UseCase<Command = any, Output = any> {
  execute(command: Command): Promise<Output>;
}
