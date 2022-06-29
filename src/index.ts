import express from "express";

import { AuthController } from "./adapters/inbound";
import { FakeEncryptionService, FakeUserRepository } from "./adapters/outbound";
import { SignIn } from "./application/use-cases";

const app = express();
const port = 3000;

const authController = new AuthController(
  new SignIn({
    userRepository: new FakeUserRepository(),
    encryptionService: new FakeEncryptionService(),
  })
);

app.get("/auth", authController.signIn);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
