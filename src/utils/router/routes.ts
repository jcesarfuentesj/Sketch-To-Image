import { z } from "zod";

import { makeRoute } from "@/utils/router/declarative-routing";

export const Routes = {
  login: makeRoute(
    () => `/login`,
    z.object({}),
    z.object({
      redirectUrl: z.string().optional(),
      email: z.string().optional(),
      error: z.string().optional(),
    })
  ),

  logout: makeRoute(() => `/logout`),
  landing: makeRoute(() => `/`),
  postLogin: makeRoute(() => `/post-login`),

  appHome: makeRoute(() => `/user/profile`),
  account: makeRoute(() => `/user/account`),
};
