interface errorInterface {
  response: {
    data: {
      message: string;
    };
  };
  message: string;
}
type errorType = Object extends errorInterface;
const getError = (err: errorType) =>
  err.response && err.response.data && err.response.data.message
    ? err.response.data.message
    : err.message;

export default getError;
