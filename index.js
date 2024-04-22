"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClient = void 0;
const axios_1 = require("./axios");
const use_query_1 = require("./use-query");
const use_helpers_1 = require("./use-helpers");
function createClient({ baseURL, axios, context, }) {
    const typedAxios = (0, axios_1.createTypedAxios)({ baseURL, axios });
    return {
        axios: typedAxios,
        useQuery: (0, use_query_1.createTypedUseQuery)({ typedAxios, context }),
        useQueryHelpers: (0, use_helpers_1.createTypedUseQueryHelpers)({ context }),
    };
}
exports.createClient = createClient;
