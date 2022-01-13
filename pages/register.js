import { getProviders, getSession } from "next-auth/react";
import RegisterForm from "../components/RegisterForm";

export default function Register() {
  return <RegisterForm />;
}

export async function getServerSideProps(context) {
  const providers = await getProviders();
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      providers,
      session,
    },
  };
}
