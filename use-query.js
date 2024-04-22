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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTypedUseQuery = void 0;
const react_1 = require("react");
const react_query_1 = require("@tanstack/react-query");
function createTypedUseQuery({ typedAxios, context, }) {
    function useTypedQuery(_a) {
        var { url, options, axiosConfig } = _a, queryOptions = __rest(_a, ["url", "options", "axiosConfig"]);
        const queryKey = (0, react_1.useMemo)(() => {
            const keyArray = [url];
            if (options.parameters) {
                const { path, query } = options.parameters;
                if (path) {
                    keyArray.push(path);
                }
                if (query) {
                    keyArray.push(query);
                }
            }
            return keyArray;
        }, [options.parameters, url]);
        return (0, react_query_1.useQuery)(Object.assign({ queryKey, queryFn: () => __awaiter(this, void 0, void 0, function* () { return (yield typedAxios(url, options, axiosConfig)).data; }) }, queryOptions), context);
    }
    return useTypedQuery;
}
exports.createTypedUseQuery = createTypedUseQuery;
