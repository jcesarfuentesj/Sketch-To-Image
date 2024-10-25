import { hash } from "@node-rs/argon2";

import { logger } from "@/init/logger";
import { prisma } from "@/server/init/db";

async function createUser() {
  try {
    const newUser = await prisma.user.create({
      data: {
        name: `Jesus Fuentes`,
        email: `jjfuentes2020@gmail.com`,
        passwordHash: await hash(`password`),
      },
    });

    logger.info({ userId: newUser.id }, `User created successfully`);
  } catch (error) {
    logger.error({ error }, `Error creating user`);
  }
}

createUser().catch(logger.error);
