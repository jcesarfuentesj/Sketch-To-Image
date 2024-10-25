import type { User } from "@prisma/client";

export type Action = CompanyAction | CompanyMemberAction | UserAction;

export enum CompanyAction {
  VIEW = `company:view`,
  UPLOAD_DOCUMENT = `company:upload_document`,
  VIEW_PROJECT = `company:view_project`,
  CREATE_PROJECT = `company:create_project`,
  UPDATE_PROJECT = `company:update_project`,
}

export enum CompanyMemberAction {
  VIEW = `company_member:view`,
}

export enum UserAction {
  VIEW = `user:view`,
  VIEW_COMPANIES = `user:view_companies`,
}

export type UserActor =
  | {
      type: `User`;
      id: string;
    }
  | User;

export type SystemActor = {
  type: `System`;
  jobId: string;
  id: string;
};

export type Actor = UserActor | SystemActor;
type UserResource = {
  type: `User`;
  id: string;
};
type CompanyResource = {
  type: `Company`;
  id: string;
};
type CompanyMemberResource = {
  type: `CompanyMember`;
  id: string;
};

export type Resource = CompanyMemberResource | CompanyResource | UserResource;
