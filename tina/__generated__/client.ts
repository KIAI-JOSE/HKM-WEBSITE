import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ url: 'http://localhost:4001/graphql', token: '2bbb24d795baeaa734b7b768a383af9bf716b618', queries,  });
export default client;
  