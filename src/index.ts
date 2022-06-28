import express from "express";
import { AuthController } from "./adapters/inbound/auth.controller";
import { FakeEncryptionService } from "./adapters/outbound/fake-encryption.service";
import { FakeUserRepository } from "./adapters/outbound/fake-user.repository";
import { SignIn } from "./application/use-cases/sign-in";

const app = express();
const port = 3000;

const authController = new AuthController(
  new SignIn(new FakeEncryptionService(), new FakeUserRepository())
);

app.get("/auth", authController.signIn);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
