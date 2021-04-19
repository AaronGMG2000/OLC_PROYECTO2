"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const jpr_controller_1 = require("../controllers/jpr.controller");
router.get('/', jpr_controller_1.controller.helloWorld);
router.get('/interpretar', jpr_controller_1.controller.interpretar);
exports.default = router;
//# sourceMappingURL=jpr.route.js.map