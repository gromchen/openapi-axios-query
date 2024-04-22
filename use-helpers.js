"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTypedUseQueryHelpers = void 0;
const react_query_1 = require("@tanstack/react-query");
const react_1 = require("react");
function createTypedUseQueryHelpers({ context, }) {
    function useTypedQueryHelpers() {
        const queryClient = (0, react_query_1.useQueryClient)(context);
        const invalidateQueries = (0, react_1.useCallback)((filters, options) => queryClient.invalidateQueries(filters, options), [queryClient]);
        const removeQueries = (0, react_1.useCallback)((filters) => queryClient.removeQueries(filters), [queryClient]);
        const setQueryData = (0, react_1.useCallback)((queryKey, updater, options) => queryClient.setQueryData(queryKey, updater, options), [queryClient]);
        return (0, react_1.useMemo)(() => ({
            invalidateQueries,
            removeQueries,
            setQueryData,
        }), [invalidateQueries, removeQueries, setQueryData]);
    }
    return useTypedQueryHelpers;
}
exports.createTypedUseQueryHelpers = createTypedUseQueryHelpers;
