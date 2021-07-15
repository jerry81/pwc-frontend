import { post, get, patch } from "axios";
import { getConfig } from "./headers";

export default {
  async create(payload) {
    return await post("/ticket",payload,getConfig());
  },
  async list() {
    return await get("/tickets", getConfig());
  },
  async updateStatus(id, status) {
    return await patch(`/ticket/${id}`, {status}, getConfig());
  },
};
