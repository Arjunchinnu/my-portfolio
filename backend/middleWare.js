import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res.status(401).json({ message: "Access denied, no token" });
  }
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    console.log(" Token verified");

    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
};

export const authorize = (roles = []) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Unaunthorized user" });
    }
    next();
  };
};
