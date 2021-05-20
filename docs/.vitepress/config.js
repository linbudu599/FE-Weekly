const fs = require("fs");
const path = require("path");

const getArticles = () => {
  return fs
    .readdirSync(path.resolve(__dirname, "../weekly"))
    .map((a) => a.split(".")[0])
    .map((a) => ({
      text: `前端周刊-${a}`,
      link: `/weekly/${a}`,
    }));
};

/** @type {import("vitepress").UserConfig } */
module.exports = {
  lang: "zh-CN",
  title: "林不渡的前端周刊",
  description: "鸽王附体！",

  themeConfig: {
    repo: "linbudu599/FE-Weekly",
    docsDir: "./",
    editLinks: true,
    editLinkText: "Edit this page on GitHub",
    lastUpdated: "Last Updated",
    nav: [
      {
        text: "Weekly",
        link: "/",
      },
    ],
    sidebar: {
      "/": [
        {
          text: "Weekly",
          children: getArticles(),
        },
      ],
    },
  },
};
