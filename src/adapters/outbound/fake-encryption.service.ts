import { EncryptionService } from "../../application/ports/outbound";

export class FakeEncryptionService implements EncryptionService {
  compare(hash: string, string: string): boolean {
    return hash === string;
  }

  encrypt(string: string): string {
    return string;
  }
}
