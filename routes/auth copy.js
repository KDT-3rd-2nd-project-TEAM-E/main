const express = require("express");
const router = express.Router();
const passport = require("passport");
const KakaoStrategy = require("passport-kakao").Strategy;

passport.use(
  "kakao",
  new KakaoStrategy(
    {
      clientID: "b40e783495ed7dba65a903b4ebfd8e50",
      callbackURL: "/auth/kakao/callback", // 위에서 설정한 Redirect URI
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log(profile); // 사용자 정보
      console.log(accessToken);
      console.log(refreshToken);
    }
  )
);

// router.get("/logout", isLoggindIn, (req, res) => {
//   req.logout();
//   req.session.destroy();
//   res.redirect("/");
// });

router.get("/kakao", passport.authenticate("kakao"));

router.get(
  "/kakao/callback",
  passport.authenticate("kakao", {
    failureRedirect: "/",
  }),
  (res, req) => {
    res.redirect("/main");
  }
);

module.exports = router;
