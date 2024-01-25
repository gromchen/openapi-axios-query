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
exports.createClient = void 0;
const react_1 = require("react");
const react_query_1 = require("@tanstack/react-query");
function createClient({ baseURL, axios, context, }) {
    const typedAxios = (path, { method, parameters, data }, config = {}) => axios(Object.assign({ url: toUrl(path, parameters === null || parameters === void 0 ? void 0 : parameters.path), method,
        baseURL, params: parameters === null || parameters === void 0 ? void 0 : parameters.query, data }, config));
    const useTypedQuery = (_a) => {
        var _b, _c;
        var { url, options, axiosConfig } = _a, queryOptions = __rest(_a, ["url", "options", "axiosConfig"]);
        const queryClient = (0, react_query_1.useQueryClient)(context);
        const queryKey = (0, react_1.useMemo)(() => { var _a, _b; return [url, (_a = options.parameters) === null || _a === void 0 ? void 0 : _a.path, (_b = options.parameters) === null || _b === void 0 ? void 0 : _b.query]; }, [(_b = options.parameters) === null || _b === void 0 ? void 0 : _b.path, (_c = options.parameters) === null || _c === void 0 ? void 0 : _c.query, url]);
        const result = (0, react_query_1.useQuery)(Object.assign({ queryKey, queryFn: () => __awaiter(this, void 0, void 0, function* () { return (yield typedAxios(url, options, axiosConfig)).data; }) }, queryOptions), queryClient);
        const invalidateQueries = (0, react_1.useCallback)((filters, options) => queryClient.invalidateQueries(Object.assign({ queryKey }, filters), options), [queryClient, queryKey]);
        const removeQueries = (0, react_1.useCallback)((filters) => queryClient.removeQueries(Object.assign({ queryKey }, filters)), [queryClient, queryKey]);
        const setQueryData = (0, react_1.useCallback)((updater, options) => queryClient.setQueryData(queryKey, updater, options), [queryClient, queryKey]);
        return Object.assign(Object.assign({}, result), { invalidateQueries,
            removeQueries,
            setQueryData });
    };
    return Object.assign(typedAxios, {
        useQuery: useTypedQuery,
    });
}
exports.createClient = createClient;
/** @todo use reduce */
function toUrl(path, query) {
    let url = String(path);
    if (query) {
        for (const [key, value] of Object.entries(query)) {
            url = url.replace(`{${key}}`, encodeURIComponent(String(value)));
        }
    }
    return url;
}
