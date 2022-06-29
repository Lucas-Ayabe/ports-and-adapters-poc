import { SignInCommand, SignInUseCase } from "../ports/inbound";
import { UserRepository, EncryptionService } from "../ports/outbound";
import { InvalidCredentialsError } from "./invalid-credentials.error";

interface SignInProps {
  encryptionService: EncryptionService;
  userRepository: UserRepository;
}

export class SignIn implements SignInUseCase {
  private encryptionService: EncryptionService;
  private userRepository: UserRepository;

  constructor({ encryptionService, userRepository }: SignInProps) {
    this.encryptionService = encryptionService;
    this.userRepository = userRepository;
  }

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
