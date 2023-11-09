module.exports = {
    async redirects() {
      return [
        {
          source: "/produto/:id",
          destination: "/produto/[id]",
          permanent: true,
        },
      ];
    },
  };