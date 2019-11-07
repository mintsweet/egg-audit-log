'use strict';

const { Schema } = require('mongoose');

module.exports = expansion => {
  return new Schema({
    ip: String, // IP
    url: String, // Request URL
    method: String, // Request Method
    ua: String, // User Agent
    recordTime: { type: Date, default: Date.now }, // Record Time
    operationType: String, // Operation Type
    operationContent: String, // Operation Content
    customData: { type: Object, default: {} }, // Custom Data
    ...expansion,
  });
};
