import {
  Tag,
  Users,
  UsersRound,
  Search,
  Settings,
  Bookmark,
  SquarePen,
  LayoutGrid,
  LucideIcon
} from "lucide-react";
import { Icon } from "next/dist/lib/metadata/types/metadata-types";

type Submenu = {
  href: string;
  label: string;
  active?: boolean;
};

type Menu = {
  href: string;
  label: string;
  active?: boolean;
  icon: LucideIcon;
  submenus?: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: "Dashboard",
          icon: LayoutGrid,
          submenus: []
        }
      ]
    },
    {
      groupLabel: "Páginas",
      menus: [
        {
          href: "",
          label: "Clientes",
          icon: UsersRound,
          submenus: [
            {
              href: "/clientes",
              label: "Pesquisar"
            },
            {
              href: "/clientes/registrar",
              label: "Registrar"
            }
          ]
        },
        {
          href: "/colaboradores",
          label: "Colaboradores",
          icon: Users,
          submenus: [
            {
              href: "/colaboradores",
              label: "Pesquisar"
            },
            {
              href: "/colaboradores/registrar",
              label: "Registrar"
            }
          ]
        },
        {
          href: "/atividades",
          label: "Atividades",
          icon: Tag,
          submenus: [
            {
              href: "/atividades",
              label: "Pesquisar"
            },
            {
              href: "/atividades/registrar",
              label: "Registrar"
            }
          ]
        }
      ]
    },
    // modelo :
    // {
    //   groupLabel: "Settings",
    //   menus: [
    //     {
    //       href: "/users",
    //       label: "Users",
    //       icon: Users
    //     },
    //     {
    //       href: "/account",
    //       label: "Account",
    //       icon: Settings
    //     }
    //   ]
    // }
  ];
}
