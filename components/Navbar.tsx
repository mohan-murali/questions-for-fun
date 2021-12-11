import Link from "next/link";
import { Button } from "primereact/button";
import { useAuth } from "./useAuth";

const Navbar: React.FC<any> = () => {
  const { user, signOut } = useAuth();
  return (
    <header className="app-header p-shadow-2">
      <div className="p-d-flex p-jc-between">
        <span className="p-p-2">
          <Link href="/">Home</Link>
        </span>
        <span className="p-p-2">
          <label>{user?.name}</label>
          <Button
            onClick={signOut}
            label="sign out"
            className="p-button-secondary"
          />
        </span>
      </div>
    </header>
  );
};

export default Navbar;
