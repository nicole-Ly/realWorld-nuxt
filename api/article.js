import { request } from '@/plugins/request'
//获取文章列表
export const getArticles = params => {
  console.log(22222222,params)
  return request({
    method: 'GET',
    url:'/api/articles',
    params
  })
}
//获取喜欢的文章列表
export const getFeedArticle = params => {
  return request({
    method: 'GET',
    url: `/api/articles/feed`,
    params
  })
}
//获取文章详情
export const getArticle = slug => {
  return request({
    method: 'GET',
    url: `/api/articles/:${slug}`
  })
}

//添加文章
export const createArticle = data => {
  return request({
    method: 'POST',
    url:'/api/articles',
    data
  })
}

//编辑文章
export const updateArticle = slug => {
  return request({
    method: 'PUT',
    url: `/api/articles/:${slug}`
  })
}
//删除文章
export const deleteArticle = slug => {
  return request({
    method: 'DELETE',
    url: `/api/articles/:${slug}`
  })
}

//文章-点赞
export const favorite = slug => {
  return request({
    method: 'POST',
    url: `/api/articles/:${slug}/favorite`
  })
}
//文章-取消点赞
export const unfavorite = slug => {
  return request({
    method: 'DELETE',
    url: `/api/articles/:${slug}/favorite`
  })
}

//文章-获取评论列表
export const getComments = slug => {
  return request({
    method: 'GET',
    url: `/api/articles/:${slug}/comments`
  })
}
//文章-添加评论
export const addComment = slug => {
  return request({
    method: 'POST',
    url: `/api/articles/:${slug}/comments`
  })
}

//文章-删除评论
export const deleteComment  = slug => {
  return request({
    method: 'DELETE',
    url: `/api/articles/:${slug}/comments/:${id}`
  })
}
//获取Tags
export const getTags = () => {
  return request({
    method: 'GET',
    url: '/api/tags'
  })
}