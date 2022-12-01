const CracoLessPlugin = require("craco-less");
module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@primary-color": "@blue-6",
              "@layout-header-background": "#d9d9d9",
              "@layout-sider-background": "#002140",
              "@menu-dark-bg": "@layout-sider-background",
              "@menu-dark-highlight-color": "#14ffb3",
              "@menu-dark-selected-item-icon-color": "#14ffb3",
              "@menu-dark-selected-item-text-color": "#14ffb3",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
  style: {
    postcssOptions: {
      plugins: [require("tailwindcss"), require("autoprefixer")],
    },
  },
};
