import { get, post } from "./axios";

export default {
  // 测试接口
  publicKey: function(params) {
    return post(params, "/security/publicKey");
  }
};
