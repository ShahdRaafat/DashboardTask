import { LogOut, MenuIcon } from "lucide-react";
import Button from "./Button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/features/auth/authSlice";

interface HeaderProps {
  onClickMenu: () => void;
}
function Header({ onClickMenu }: HeaderProps) {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const router = useRouter();

  async function handleLogout() {
    await dispatch(logoutUser());
    router.push("/login");
  }
  return (
    <header className="flex justify-between items-center gap-3 border-b border-border bg-surface px-4 py-3 ">
      <div className="flex items-center gap-3">
        <Button className="md:hidden" variant="ghost" onClick={onClickMenu}>
          <MenuIcon className="h-5 w-5" />
        </Button>
        <span className="text-lg font-semibold">Dashboard</span>
      </div>

      {user && (
        <div className="flex items-center gap-3">
          <span className="hidden text-sm text-primary font-semibold sm:inline">
            Hello, {user.name.split(" ")[0]}!
          </span>
          <Button variant="ghost" onClick={handleLogout} className="gap-2">
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>
      )}
    </header>
  );
}

export default Header;
