const { Router } = require("express");
const needle = require("needle");
const Token = require("../models/Token");
const { getNewTokensUrl } = require("../models/url");
const router = Router();

router.get("/", async (req, res) => {
  try {
    const token = await Token.find();
    const data = await needle("post", getNewTokensUrl + token[0].refresh_token);
    await Token.findByIdAndUpdate(token[0]._id, data.body);
    const { refresh_token, ...rest } = data.body;
    res.send(rest);
  } catch (error) {
    res.status(500).json(error.message);
  }
});
module.exports = router;
