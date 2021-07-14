import { get } from "axios";
import { getConfig } from "./headers";

export default {
  async ping() {
    return await get("/", getConfig());
  },
  async neigh() {
    return await get("/restaurants", getConfig());
  }
};
