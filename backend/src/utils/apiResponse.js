const ApiResponse = (status, message, data) => {
  // Para llamaer el response -> ApiResponse(codigo de estado, mensaje, informacion o en caso de error null)
  const success = status === 200 || status === 201;
  return {
    success: success,
    status: status,
    message: message,
    data: data,
  };
};

export default ApiResponse;
