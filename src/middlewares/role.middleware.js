const roleMiddleware = (allowedRoles) => {
  return (req, res, next) => {
    // 1. เช็คว่ามีข้อมูล User จาก authMiddleware หรือยัง
    if (!req.user) {
      const error = new Error('Unauthorized');
      error.statusCode = 401;
      return next(error);
    }

    // 2. เช็คว่า Role ของ User อยู่ในกลุ่มที่ได้รับอนุญาตไหม
    if (!allowedRoles.includes(req.user.role)) {
      const error = new Error('Forbidden: คุณไม่มีสิทธิ์เข้าถึงส่วนนี้');
      error.statusCode = 403; // 403 คือมีตัวตนแต่ไม่มีสิทธิ์
      return next(error);
    }

    next();
  };
};

module.exports = roleMiddleware;