import { User } from "../../../domain/user";

export interface UserRepository {
  findByEmail(email: string): Promise<User>;
}
