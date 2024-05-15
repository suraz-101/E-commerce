const { verifyToken } = require("./token");

const checkRole = (role) => {
  return async (req, res, next) => {
    try {
      const { token } = req.headers || "";
      if (!token) throw new Error("access token is required");
      const { data } = await verifyToken(token);
      const isValid = await role.some((rol) => data.role.includes(rol));
      if (!isValid) throw new Error("permission deniend!!");
      next();
    } catch (error) {
      next(error);
    }
  };
};

module.exports = { checkRole };
