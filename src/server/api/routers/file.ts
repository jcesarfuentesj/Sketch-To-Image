import { randomUUID } from "crypto";
import { z } from "zod";

import { env } from "@/env";
import { companyRequiredProcedure, createTRPCRouter } from "@/server/api/trpc";
import { fileService } from "@/server/services/file/service";

export const fileRouter = createTRPCRouter({
  getPresignedUrlForRagDocumentUpload: companyRequiredProcedure
    .input(
      z.object({
        filename: z.string(),
        contentType: z.string(),
      })
    )
    .mutation(
      async ({ ctx: { companyMember }, input: { filename, contentType } }) => {
        const key = `company/${companyMember.companyId}/rag/${filename}-${randomUUID()}/${filename}`;

        const presignedGetUrl = await fileService.getPresignedUrlForFile({
          path: key,
          action: `read`,
          bucket: env.AWS_S3_BUCKET,
        });
        const presignedPutUrl = await fileService.getPresignedUrlForFile({
          path: key,
          action: `write`,
          contentType,
          bucket: env.AWS_S3_BUCKET,
        });

        return {
          key,
          presignedGetUrl,
          presignedPutUrl,
        };
      }
    ),
  getPresignedUrlForQuickDocumentUpload: companyRequiredProcedure
    .input(
      z.object({
        filename: z.string(),
        contentType: z.string(),
      })
    )
    .mutation(
      async ({ ctx: { companyMember }, input: { filename, contentType } }) => {
        const key = `company/${companyMember.companyId}/quick-extract/${filename}-${randomUUID()}/${filename}`;

        const presignedGetUrl = await fileService.getPresignedUrlForFile({
          path: key,
          action: `read`,
          bucket: env.AWS_S3_BUCKET,
        });
        const presignedPutUrl = await fileService.getPresignedUrlForFile({
          path: key,
          action: `write`,
          contentType,
          bucket: env.AWS_S3_BUCKET,
        });

        return {
          key,
          presignedGetUrl,
          presignedPutUrl,
        };
      }
    ),
  getPresignedDownloadUrlForKey: companyRequiredProcedure
    .input(
      z.object({
        key: z.string(),
      })
    )
    .query(async ({ input: { key } }) => {
      const presignedGetUrl = await fileService.getPresignedUrlForFile({
        path: key,
        action: `read`,
        bucket: env.AWS_S3_BUCKET,
        expires: 1,
        expiresUnit: `hours`,
      });

      return { presignedGetUrl };
    }),
});
