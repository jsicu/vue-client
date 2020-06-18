import request from './request'

function get(params, url, headersType, responseType) {
  return request({
    url: url,
    method: 'get',
    params,
    responseType: responseType
  })
}

function post(params, url, headersType) {
  return request({
    url: url,
    method: 'post',
    data: params,
    headers: {
      'Content-Type': headersType || 'application/x-www-form-urlencoded'
    }
  })
}

function put(params, url, headersType) {
  return request({
    url: url,
    method: 'put',
    data: params,
    headers: {
      'Content-Type': headersType || 'application/x-www-form-urlencoded'
    }
  })
}

function del(params, url) {
  return request({
    url: url,
    method: 'delete',
    params
  })
}

export {
  get,
  post,
  put,
  del
}
