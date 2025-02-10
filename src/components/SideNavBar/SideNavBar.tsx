import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { MdLogout } from "react-icons/md";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";

const SideNavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const pathname = usePathname(); // Get the current pathname

  // Helper function to determine if a route is active
  const isActive = (route: any) => pathname === route;

  return (
    <>
      {/* Sidebar */}
      <aside className="h-screen bg-[#0B3229] text-white relative w-[290px] px-2 select-none flex flex-col justify-between">
        <div>
          <div className="p-5 font-bold text-lg">
            <Image src="/Logo.svg" alt="" height={30} width={160} />
          </div>

          {/* Scrollable Navigation */}
          <div className="overflow-y-auto max-h-[calc(100vh-170px)] no-scrollbar">
            <nav className="mt-4 text-[16px]">
              <ul className="text-black">
                <Link href="">
                  <li
                    className={`text-[#666666] p-2 m-4 flex items-center gap-2 rounded-lg cursor-not-allowed ${
                      isActive("/home") ? "bg-[#EAEBFF]" : ""
                    }`}
                  >
                    <Icon
                      icon="material-symbols:dashboard-rounded"
                      width="24"
                      height="24"
                    />
                    <span className="hidden lg:block">Home</span>
                  </li>
                </Link>
                {/*  */}

                <Link href="/assistants">
                  <li
                    className={`text-[#0B3229] border border-[#666666] p-2 m-4 flex items-center gap-2 rounded-lg ${
                      isActive("/assistants")
                        ? "bg-[#F0FBF1]"
                        : "hover:bg-[#EAEBFF]"
                    }`}
                  >
                    <Icon icon="lucide:bot" width="24" height="24" />
                    <span className="hidden lg:block">AI Assistants</span>
                  </li>
                </Link>

                {/*  */}
                <Link href="">
                  <li
                    className={`text-[#666666] p-2 m-4 flex items-center gap-2 rounded-lg cursor-not-allowed ${
                      isActive("/user-management") ? "bg-[#EAEBFF]" : ""
                    }`}
                  >
                    <Icon icon="ic:round-contact-page" width="24" height="24" />
                    <span className="hidden lg:block">Numbers</span>
                  </li>
                </Link>

                <Link href="">
                  <li
                    className={`text-[#666666] p-2 m-4 flex items-center gap-2 rounded-lg cursor-not-allowed ${
                      isActive("/payment") ? "bg-[#EAEBFF]" : ""
                    }`}
                  >
                    <Icon
                      icon="material-symbols-light:flowchart-sharp"
                      width="24"
                      height="24"
                    />
                    <span className="hidden lg:block">Campaigns</span>
                  </li>
                </Link>
                <Link href="">
                  <li
                    className={`text-[#666666] p-2 m-4 flex items-center gap-2 rounded-lg cursor-not-allowed ${
                      isActive("/report") ? "bg-[#EAEBFF]" : ""
                    }`}
                  >
                    <Icon
                      icon="mingcute:phone-call-fill"
                      width="24"
                      height="24"
                    />
                    <span className="hidden lg:block">Contacts</span>
                  </li>
                </Link>
                <Link href="">
                  <li
                    className={`text-[#666666] p-2 m-4 flex items-center gap-2 rounded-lg cursor-not-allowed ${
                      isActive("/setting") ? "bg-[#EAEBFF]" : ""
                    }`}
                  >
                    <Icon icon="mage:users-fill" width="24" height="24" />
                    <span className="hidden lg:block">Reports</span>
                  </li>
                </Link>
                <Link href="">
                  <li
                    className={`text-[#666666] p-2 m-4 flex items-center gap-2 rounded-lg cursor-not-allowed ${
                      isActive("/setting") ? "bg-[#EAEBFF]" : ""
                    }`}
                  >
                    <Icon icon="weui:setting-filled" width="24" height="24" />
                    <span className="hidden lg:block">Settings</span>
                  </li>
                </Link>
                {/* --- */}

                {/* <Link href="/calendar">
                  <li
                    className={`text-[#666666] border border-[#666666] p-2 m-4 flex items-center lg:gap-2 rounded-lg ${
                      isActive("/calendar")
                        ? "bg-[#F0FBF1]"
                        : "hover:bg-[#EAEBFF]"
                    }`}
                  >
                    <Icon icon="uis:calender" width="24" height="24" />
                    <span className="hidden lg:block">Calender</span>
                  </li>
                </Link>
                <Link href="">
                  <li
                    className={`text-[#666666] p-2 m-4 flex items-center gap-2 rounded-lg cursor-not-allowed ${
                      isActive("/setting") ? "bg-[#EAEBFF]" : ""
                    }`}
                  >
                    <Icon
                      icon="material-symbols:integration-instructions"
                      width="24"
                      height="24"
                    />
                    <span className="hidden lg:block">Integrations</span>
                  </li>
                </Link>
                <Link href="">
                  <li
                    className={`text-[#666666] p-2 m-4 flex items-center gap-2 rounded-lg cursor-not-allowed ${
                      isActive("/setting") ? "bg-[#EAEBFF]" : ""
                    }`}
                  >
                    <Icon icon="mage:users-fill" width="24" height="24" />
                    <span className="hidden lg:block">Users</span>
                  </li>
                </Link> */}
              </ul>
            </nav>
          </div>
        </div>
        <div>
          <Button className="w-full mb-8 bg-[#214F45] hover:bg-[#236b5b] text-white font-semibold text-base h-12">
            <MdLogout className="h-6 w-6" /> Logout
          </Button>
        </div>
      </aside>
    </>
  );
};

export default SideNavBar;
