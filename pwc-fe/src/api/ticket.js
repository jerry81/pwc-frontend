import { post, get } from "axios";
import { getConfig } from "./headers";

export default {
  async create(payload) {
    return await post("/ticket",payload,getConfig());
  },
  async list(f) {
    const {filter, sort} = f
    return await get("/tickets", { params: {...filter, ...sort} }, getConfig());
  },
};
