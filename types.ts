export interface ResponseData {
  response: string;
};

export interface ResponseEvent extends Event {
  data?: ResponseData;
};
