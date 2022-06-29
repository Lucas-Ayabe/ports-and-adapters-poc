import { User } from "../../application/domain/user";
import { UserRepository } from "../../application/ports/outbound";

export class FakeUserRepository implements UserRepository {
  async findByEmail(email: string): Promise<User> {
    return User.from(email, "secret123");
  }
}
