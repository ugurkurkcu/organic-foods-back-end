//! API
//
//

const http = require("http");
const fs = require("fs");
const url = require("url");

//
//
const replaceTemplate = require("./modules/replaceTemplates");

//
//

let templateOverview = fs.readFileSync(
  "./templates/template-overview.html",
  "utf-8"
);

let templateProduct = fs.readFileSync(
  "./templates/template-product.html",
  "utf-8"
);
let templateCard = fs.readFileSync("./templates/template-card.html", "utf-8");
let data = fs.readFileSync("./dev-data/data.json", "utf-8");
const dataObj = JSON.parse(data);

//
//

const server = http.createServer((req, res) => {
  // egerki dogrudan api adresine istek atildiysa
  // console.log(req.url)

  const { pathname, query } = url.parse(req.url, true);

  switch (pathname) {
    case "/overview":
      const cardHTML = dataObj.map((el) => replaceTemplate(templateCard, el));
      templateOverview = templateOverview.replace(
        "{%PRODUCT_CARDS%}",
        cardHTML
      );
      return res.end(templateOverview);

    case "/product":
      const item = dataObj.find((item) => item.id == query.id);

      // console.log(item);

      const output = replaceTemplate(templateProduct, item);


      return res.end(output);

    default:
      return res.end("404 Page you are looking for cannot be found!!!");
  }

  // if (req.url === "/" || req.url === "overview") {
  //   res.end("<h1>you are in the MAIN PAGE!!!</h1>");
  // } else if (req.url === "/products") {
  //   res.end("<h1>you are in the PRODUCT PAGE!!!</h1>");
  // }else{
  //   res.end("<p>404 the page you are searching doesnt have a correct url</p>")
  // }

  // res.end("<p>404 the page you are searching doesnt have a correct url</p>");
});

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
server.listen(4000, "127.0.0.1", () => {
  console.log("4000. porta gelen istekler dinlenmeye baslandi");
});
