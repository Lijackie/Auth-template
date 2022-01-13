import { getProviders, getSession } from "next-auth/react";
import ChangePassword from "../components/ChangePassword";

export default function Change() {
  return <ChangePassword />;
}

export async function getServerSideProps(context) {
  const providers = await getProviders();
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      providers,
      session,
    },
  };
}