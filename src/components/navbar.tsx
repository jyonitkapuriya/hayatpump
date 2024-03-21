import React, { useEffect, useState } from "react";
import Logo from '../images/logo.png'
import {
  Navbar as MTNavbar,
  Collapse,
  Button,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import {
  RectangleStackIcon,
  UserCircleIcon,
  CommandLineIcon,
  Squares2X2Icon,
  XMarkIcon,
  Bars3Icon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getPums } from "@/firebase/config";
import { ChevronDown } from "lucide-react";
import { useFirebase } from "@/firebase/firebase";

const NAV_MENU = [
  {
    name: "Home",
    icon: RectangleStackIcon,
    href: "/",
  },
  {
    name: "Products",
    icon: UserCircleIcon,
  },
  {
    name: "Certification",
    icon: UserCircleIcon,
    href: "/",

  },
  {
    name: "Gallery",
    icon: CommandLineIcon,
    href: "/",
  },
  {
    name: "Contact",
    icon: CommandLineIcon,
    href: "/contect",
  },
];

interface NavItemProps {
  children: React.ReactNode;
  href?: string;
}

function NavItem({ children, href }: NavItemProps) {
  return (
    <li>
      <Typography
        as="div"
        href={href || "#"}
        target={href ? "_blank" : "_self"}
        variant="paragraph"
        color="gray"
        className="flex items-center gap-2 font-medium text-gray-900"
      >
        {children}
      </Typography>
    </li>
  );
}

export function Navbar() {
  const [open, setOpen] = React.useState(false);
  const [openProduct, setOpenProduct] = React.useState(false)
  const [manu, setManu] = useState(NAV_MENU)
  const { admin, loading } = useFirebase()
  const router = useRouter()
  const handleOpen = () => setOpen((cur) => !cur);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpen(false)
    );
  }, []);

  const getProduct = async () => {
    const res = await getPums()
    let dummy = [...manu]
    dummy[1] = { ...dummy[1], items: res }
    if (admin && !loading) {
      const axist = dummy.find((item) => item.name === "Add Pumps")
      if (!axist) {
        dummy = [...dummy, {
          name: "Add Pumps",
          icon: CommandLineIcon,
          href: "/admin/addpumps",
        },]
      }
    }
    setManu(dummy)
  }

  useEffect(() => {
    getProduct()
  }, [admin, loading])

  return (
    <MTNavbar shadow={false} fullWidth className="border-0 sticky top-0 bg-blue-50 z-50">
      <div className="container mx-auto w-full flex items-center ">
        <Typography color="blue-gray" className="text-lg font-bold">
          <Image alt="logo" src={Logo} width="100" hight="100" className="cursor-pointer" onClick={() => router.push('/')} />
        </Typography>
        <ul className="ml-20 hidden items-center gap-8 lg:flex mx-auto ">
          {manu.map(({ name, icon: Icon, href, items }) => (
            <NavItem key={name} href={href}>
              {/* <Icon className="h-5 w-5" /> */}
              <div onClick={() => {
                if (items && !href) { setOpenProduct(!openProduct) }
                else {
                  router.push(href)
                }
              }} className="cursor-pointer">{name}</div>
              <div className="relative mt-10">
                {items?.length &&
                  <div className="absolute  ml-[-80px] min-w-[150px] bg-white">
                    <Collapse open={openProduct} >
                      <div className="container mx-auto px-2 pt-4">
                        <ul className="flex flex-col gap-4">
                          {items.map((item) => (
                            <NavItem key={name}>
                              {item.name}
                            </NavItem>
                          ))}
                        </ul>
                      </div>
                    </Collapse>
                  </div>
                }
              </div>
            </NavItem>
          ))}
        </ul>
        <div className="hidden items-center gap-2 lg:flex">
          {/* <Button variant="text">Sign In</Button> */}
          <a href="https://www.material-tailwind.com/blocks" target="_blank">
            <Button color="gray">blocks</Button>
          </a>
        </div>
        <IconButton
          variant="text"
          color="gray"
          onClick={handleOpen}
          className="ml-auto inline-block lg:hidden"
        >
          {open ? (
            <XMarkIcon strokeWidth={2} className="h-6 w-6" />
          ) : (
            <Bars3Icon strokeWidth={2} className="h-6 w-6" />
          )}
        </IconButton>
      </div>
      <Collapse open={open}>
        <div className="container mx-auto mt-3 border-t border-gray-200 px-2 pt-4">
          <ul className="flex flex-col gap-4">
            {manu.map(({ name, icon: Icon, items, href }, index) => (
              <NavItem key={name}>
                <div className="w-full">
                  {/* <Icon className="h-5 w-5" /> */}
                  <div
                    onClick={() => {
                      if (items && !href) { setOpenProduct(!openProduct) }
                      else {
                        router.push(href)
                      }
                    }} className="flex justify-between cursor-pointer">{name}
                    <div className="ml-auto">{index === 1 && <ChevronDown />}</div>
                  </div>
                  {items?.length &&
                    <Collapse open={openProduct} >
                      <div className="container px-2 pt-4">
                        <ul className="flex flex-col gap-4">
                          {items.map((item) => (
                            <NavItem key={name}>
                              {item.name}
                            </NavItem>
                          ))}
                        </ul>
                      </div>
                    </Collapse>
                  }
                </div>
              </NavItem>
            ))}
          </ul>
        </div>
      </Collapse>
    </MTNavbar >
  );
}

export default Navbar;
