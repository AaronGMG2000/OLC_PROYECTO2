"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_mysql_1 = __importDefault(require("promise-mysql"));
const keys_1 = __importDefault(require("../DataBase/keys"));
const pool = promise_mysql_1.default.createPool(keys_1.default.database);
pool.getConnection()
    .then((connection) => __awaiter(void 0, void 0, void 0, function* () {
    pool.releaseConnection(connection);
    yield pool.query("SET GLOBAL sql_mode='';");
    yield pool.query("SET sql_mode=''");
    console.log('DB esta conectada');
}));
exports.default = pool;
//# sourceMappingURL=database.js.map