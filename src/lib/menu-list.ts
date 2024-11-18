import {
  Tag,
  Users,
  Settings,
  Bookmark,
  SquarePen,
  LayoutGrid,
  LucideIcon
} from "lucide-react";

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
      groupLabel: "Contents",
      menus: [
        {
          href: "",
          label: "Clientes",
          icon: Users,
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
          href: "/tags",
          label: "Tags",
          icon: Tag
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
