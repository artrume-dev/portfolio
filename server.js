const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

const publicDir = __dirname;

app.disable("x-powered-by");

// Serve static assets (html/css/js/images/video)
app.use(
  express.static(publicDir, {
    extensions: ["html"],
    setHeaders(res, filePath) {
      if (filePath.endsWith(".html")) {
        res.setHeader("Cache-Control", "no-store");
      }
    },
  })
);

// Nice routes
app.get("/", (_req, res) => res.sendFile(path.join(publicDir, "ai-portfolio.html")));
app.get("/ai-champion", (_req, res) => res.sendFile(path.join(publicDir, "ai-champion.html")));

// Fallback to portfolio page
app.use((_req, res) => res.status(404).sendFile(path.join(publicDir, "ai-portfolio.html")));

app.listen(PORT, () => {
  console.log(`Serving on port ${PORT}`);
});

