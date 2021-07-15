import { post, get, patch } from "axios";
import { getConfig } from "./headers";

export default {
  async create(payload) {
    return await post("/ticket",payload,getConfig());
  },
  async list(f) {
    const {filters, sort} = f
    return await get("/tickets", { params: {...filters, ...sort} }, getConfig());
  },
  async updateStatus(id, status) {
    return await patch(`/ticket/${id}`, {status}, getConfig());
  },
};
