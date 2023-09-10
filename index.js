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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClient = void 0;
const react_query_1 = require("@tanstack/react-query");
function createClient({ baseURL, axios, context, }) {
    const typedAxios = (path, { method, parameters, data }) => axios({
        url: toUrl(path, parameters === null || parameters === void 0 ? void 0 : parameters.path),
        method,
        baseURL,
        params: parameters === null || parameters === void 0 ? void 0 : parameters.query,
        data,
    });
    const useTypedQuery = ({ url, options, refetchOnWindowFocus, keepPreviousData, enabled, refetchInterval, meta, retry, onError, }) => {
        var _a, _b;
        const queryClient = (0, react_query_1.useQueryClient)({ context });
        const queryKey = [url, (_a = options.parameters) === null || _a === void 0 ? void 0 : _a.path, (_b = options.parameters) === null || _b === void 0 ? void 0 : _b.query];
        const result = (0, react_query_1.useQuery)({
            queryKey,
            queryFn: () => __awaiter(this, void 0, void 0, function* () { return (yield typedAxios(url, options)).data; }),
            refetchOnWindowFocus,
            keepPreviousData,
            enabled,
            refetchInterval,
            meta,
            retry,
            onError,
            context,
        });
        return Object.assign(Object.assign({}, result), { queryKey, invalidateQueries: () => queryClient.invalidateQueries(queryKey) });
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
