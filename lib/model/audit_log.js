'use strict';

const { Schema } = require('mongoose');

module.exports = expansion => {
  return new Schema(
    {
      ip: String, // IP
      url: String, // Request URL
      method: String, // Request Method
      ua: String, // User Agent
      operationType: String, // Operation Type
      operationContent: Schema.Types.Mixed, // Operation Content
      ...expansion,
    },
    {
      timestamps: true,
    }
  );
};
