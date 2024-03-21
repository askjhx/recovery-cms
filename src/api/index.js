import {Get,Post,Put,Patch,Delete} from "@/api/request";

export default {
  get:(url, params) =>{
    return Get(url, params)
  },
  post:(url, params, config) =>{
    return Post(url, params, config)
  },
  put:(url, params) =>{
    return Put(url, params)
  },
  getListData: (params) => {
    return Get('../../static/data.json',params);
  },
  postListData: (params) => {
    return Post('../../static/data.json',params);
  },
  deleteListData: (params) => {
    return Delete('../../static/data.json',params);
  }
}
