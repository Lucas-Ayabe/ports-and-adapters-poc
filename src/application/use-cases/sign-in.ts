import { SignInCommand, SignInUseCase } from "../ports/inbound/sign-in";
import { EncryptionService } from "../ports/outbound/encryption.service";
import { UserRepository } from "../ports/outbound/user.repository";
import { InvalidCredentialsError } from "./invalid-credentials.error";

export class SignIn implements SignInUseCase {
  constructor(
    private encryptionService: EncryptionService,
    private userRepository: UserRepository
  ) {}

  async execute(command: SignInCommand): Promise<string> {
    const user = await this.userRepository.findByEmail(command.email);
    const isReallyTheUser = this.encryptionService.compare(
      user.password,
      command.password
    );

    if (!isReallyTheUser) {
      throw new InvalidCredentialsError(command.email, command.password);
    }

    return this.encryptionService.encrypt(user.email + "secret");
  }
}
