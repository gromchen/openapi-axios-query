# Usage

Generate `paths` with `openapi-typescript`. Then you can create a `client`.

```typescript
import axios from "axios";
import { paths } from "./schema";
import { createClient } from "openapi-axios-query";
import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

const client = createClient<paths>({
  baseURL: "https://api.my-website.com",
  axios,
  context: queryClient,
});

// Use typed axios
const response = await client.axios("/v1/my-api");

// Or use typed query
const { data } = client.useQuery({
  url: "/v1/my-api",
  options: {},
});

// Or typed query helpers
const { invalidateQueries } = client.useQueryHelpers();
invalidateQueries({ queryKey: ["/v1/my-api"] }),
```
