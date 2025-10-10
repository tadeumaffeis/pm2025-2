const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  action: {
    type: String,
    required: true,
    enum: ['CREATE', 'UPDATE', 'DELETE', 'LOGIN', 'LOGOUT']
  },
  entity: {
    type: String,
    required: true
  },
  entityId: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  changes: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  ip: String,
  userAgent: String
}, {
  collection: 'logs'
});

logSchema.index({ timestamp: -1 });
logSchema.index({ userId: 1 });
logSchema.index({ entity: 1, entityId: 1 });

module.exports = mongoose.model('Log', logSchema);