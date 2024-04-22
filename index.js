"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClient = void 0;
const axios_1 = require("./axios");
const use_query_1 = require("./use-query");
const use_query_client_1 = require("./use-query-client");
function createClient({ baseURL, axios, context, }) {
    const typedAxios = (0, axios_1.createTypedAxios)({ baseURL, axios });
    return {
        axios: typedAxios,
        useQuery: (0, use_query_1.createTypedUseQuery)({ typedAxios, context }),
        useQueryClient: (0, use_query_client_1.createTypedUseQueryClient)({ context }),
    };
}
exports.createClient = createClient;
