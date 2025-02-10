"use client";

import { ReactNode, useEffect, useState } from "react";
import SideNavBar from "./SideNavBar/SideNavBar";
import { usePathname, useRouter } from "next/navigation";
import NavBar from "./NavBar/NavBar";

interface Props {
  children: ReactNode;
}

const AuthProvider: React.FC<Props> = ({ children }) => {
  // const [isAuthenticated, setIsAuthenticated] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/") {
      router.push("/assistants");
    } else {
      router.push(pathname);
    }
  }, [pathname, router]);

  return (
    <div className="h-screen flex select-none overflow-hidden">
      <SideNavBar />
      <div className="flex-1 flex flex-col">
        <div className="bg-white">
          <NavBar />
        </div>
        <div className=" mb-0 flex-1 bg-white rounded-2xl overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthProvider;
