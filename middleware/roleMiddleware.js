const coordinatorOnly = (req, res, next) => {
  if (!req.user || req.user.role !== "coordinator") {
    return res.status(403).json({
      message: "Coordinator access required"
    });
  }

  next();
};

module.exports = coordinatorOnly;