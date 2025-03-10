import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      user: Account;
      token: string;
    };
    expires: string;
  }

  interface Account {
    idUsuario: number;
    usuario: string;
    idRol: number;
    idPersona: number;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    account: {
      idUsuario: number;
      usuario: string;
      idRol: number;
      idPersona: number;
    };
    token: string;
  }
}
