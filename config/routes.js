export default {
  admin: {
    users: {
      root: "/admin/users",
      edit: (wallet) => `/admin/users/edit/${wallet}`,
    },
    category: {
      root: "/admin/category",
      nft: "/admin/category/nft",
      collection: "/admin/category/collection",
    },
    drop: {
      root: "/admin/drop",
      create: "/admin/drop/create",
    },
    collection: {
      root: "/admin/collection",
    },
  },
};
