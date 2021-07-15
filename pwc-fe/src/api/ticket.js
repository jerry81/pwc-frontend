import { post, get } from "axios";
import { getConfig } from "./headers";

export default {
  async create(payload) {
    return await post("/ticket",payload,getConfig());
  },
  async list() {
    return await get("/tickets",getConfig());
  },
};
