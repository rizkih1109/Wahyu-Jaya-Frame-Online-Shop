export const sideBarMenus = {
  OWNER: [
    {
      section: "MASTER",
      items: [
        { name: "Branchs", href: "/branch" },
        { name: "Admins", href: "/admin" },
      ],
    },
    {
      section: "TRANSACTIONS",
      items: [{ name: "Sales", href: "/sales" }],
    },
  ],
  ADMIN: [
    {
      section: "MASTER",
      items: [
        { name: "Products", href: "/product" },
        { name: "sellers", href: "/seller" },
      ],
    },
    {
      section: "TRANSACTIONS",
      items: [{ name: "Sales", href: "/sales" }],
    },
  ],
  SELLER: [
    {
      section: "MASTER",
      items: [{ name: "Products", href: "/product" }],
    },
    {
      section: "TRANSACTIONS",
      items: [{ name: "Sales", href: "/sales" }],
    },
  ],
};
