"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTypedAxios = void 0;
function createTypedAxios({ baseURL, axios, }) {
    function typedAxios(path, { method, parameters, data }, config = {}) {
        return axios(Object.assign({ url: toUrl(path, parameters === null || parameters === void 0 ? void 0 : parameters.path), method,
            baseURL, params: parameters === null || parameters === void 0 ? void 0 : parameters.query, data }, config));
    }
    return typedAxios;
}
exports.createTypedAxios = createTypedAxios;
function toUrl(path, query) {
    let url = String(path);
    if (query) {
        for (const [key, value] of Object.entries(query)) {
            url = url.replace(`{${key}}`, encodeURIComponent(String(value)));
        }
    }
    return url;
}
