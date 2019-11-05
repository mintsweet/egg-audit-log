import { Schema } from 'mongoose';

export default expansion => {
  return new Schema({
    id: String, // IP
    url: String, // Request URL
    method: String, // Request Method
    ua: String, // User Agent
    operationType: String, // Operation Type
    operationContent: String, // Operation Content
    customData: { type: Object, default: {} }, // Custom Data
    ...expansion,
  });
};
