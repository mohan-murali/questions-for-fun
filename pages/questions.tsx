import { NextPage } from "next";
import Link from "next/link";
import { Button } from "primereact/button";
import { useAuth } from "../components/useAuth";

const QuestionsPage: NextPage = () => {
  const { user, signOut } = useAuth();
  return (
    <>
      <header>
        <Link href="/">Home</Link>
        <label>{user?.name}</label>
        <Button onClick={signOut} label="sign out" />
      </header>
      <main></main>
      <footer>Built with Nextjs and Prime React</footer>
    </>
  );
};

export default QuestionsPage;
