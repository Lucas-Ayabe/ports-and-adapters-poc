import { UseCase } from "./use-case";

export interface SignInCommand {
  email: string;
  password: string;
}

export type SignInOutput = string | false;

export interface SignInUseCase extends UseCase<SignInCommand, SignInOutput> {}
