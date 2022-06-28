import { UserRepository } from "../../application/ports/outbound/user.repository";
import { User } from "../../domain/user";

export class FakeUserRepository implements UserRepository {
  async findByEmail(email: string): Promise<User> {
    return User.from(email, "secret123");
  }
}
