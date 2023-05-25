import useAxiosPrivate from "./protectedInstance";

export const {
  post: postRequest,
  get: getRequest,
  put: putRequest,
  delete: deleteRequest,
} = useAxiosPrivate();
