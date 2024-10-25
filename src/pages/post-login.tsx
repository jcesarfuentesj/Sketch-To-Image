import { RequireUser } from "@/pages/util";
import { Routes } from "@/utils/router/routes";

export default function PostLogin() {
  return <></>;
}

// export const getServerSideProps = RequireUser(async ({ user, authContext }) => {
export const getServerSideProps = RequireUser(() => {
  // const companies = await UserService.withContext(authContext).getCompanies({
  //   userId: user.id,
  // });

  // const [company] = companies;
  // if (company) {
  return {
    redirect: {
      destination: Routes.account({}),
      permanent: false,
    },
  };
  // }

  // logger.error(`No companies found for user`, { userId: user.id });
  // // If no companies found, return a 500 error
  // return {
  //   props: {},
  //   notFound: true,
  // };
});
