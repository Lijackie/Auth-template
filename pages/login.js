import { getProviders, getSession } from "next-auth/react";
import LoginFrom from "../components/LoginForm";

export default function Login() {
  return <LoginFrom />;
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
