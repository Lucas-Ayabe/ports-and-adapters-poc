import { UseCase } from "./use-case";

export interface SignInCommand {
  email: string;
  password: string;
}

export interface SignInUseCase extends UseCase<SignInCommand, string | false> {}
