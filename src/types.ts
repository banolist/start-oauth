import type { CustomResponse } from "@solidjs/router";
import type { Providers } from "./providers";

export interface Identifiers {
  id: string;
  secret: string;
}

export interface ProvderOptions {
  scope?: string[] | string;
}

export interface User {
  id?: string;
  name: string;
  email: string;
  image?: string;
  oauth: { provider: Providers; token: string };
}

export type Configuration = Partial<Record<Providers, Identifiers>> & {
  password: string;
  handler: (user: User, redirectTo?: string) => Promise<CustomResponse<never>>;
};

export type Token = Promise<{ token_type: string; access_token: string }>;

export interface Methods {
  requestCode(
    params: Pick<Identifiers, "id"> &
      ProvderOptions & {
        redirect_uri: string;
        state: string;
        challenge: string;
      }
  ): string;
  requestToken(
    params: Identifiers & {
      redirect_uri: string;
      code: string;
      verifier: string;
    }
  ): Token;
  requestUser(token: string): Promise<User>;
}
