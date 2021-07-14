import { post } from "axios";
import { getConfig } from "./headers";

export default {
  async create(payload) {
    return await post("/",payload,getConfig());
  },
};
