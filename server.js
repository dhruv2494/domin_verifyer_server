const express = require("express");
const dns = require("dns");
const cors = require("cors"); // Add this line
const app = express();
const port = process.env.PORT || 4000;

app.use(cors()); // Enable CORS for all routes
app.use(express.json());
app.get("/", (req, res) => {
    res.send("server is running  ");
})
app.get("/verify-domain", (req, res) => {
  const domain = req.query.domain;

  if (!domain) {
    return res
      .status(400)
      .json({ error: "Domain query parameter is required" });
  }

  dns.resolveMx(domain, (err, addresses) => {
    if (err || addresses.length === 0) {
      return res
        .status(400)
        .json({ isValid: false, error: "Domain has no valid MX records" });
    }
    return res.json({ isValid: true });
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
