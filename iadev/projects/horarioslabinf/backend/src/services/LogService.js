const Log = require('../models/mongodb/Log');

class LogService {
  async log(action, entity, entityId, userId, changes = {}, req = null) {
    try {
      const logData = {
        action,
        entity,
        entityId: entityId.toString(),
        userId: userId.toString(),
        changes,
        timestamp: new Date()
      };

      if (req) {
        logData.ip = req.ip || req.connection.remoteAddress;
        logData.userAgent = req.get('User-Agent');
      }

      const log = new Log(logData);
      await log.save();
      return log;
    } catch (error) {
      console.error('Error creating log:', error);
    }
  }

  async getLogs(filters = {}, page = 1, limit = 50) {
    const skip = (page - 1) * limit;
    
    const query = {};
    if (filters.userId) query.userId = filters.userId;
    if (filters.entity) query.entity = filters.entity;
    if (filters.action) query.action = filters.action;
    if (filters.startDate || filters.endDate) {
      query.timestamp = {};
      if (filters.startDate) query.timestamp.$gte = new Date(filters.startDate);
      if (filters.endDate) query.timestamp.$lte = new Date(filters.endDate);
    }

    const logs = await Log.find(query)
      .sort({ timestamp: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Log.countDocuments(query);

    return {
      logs,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    };
  }
}

module.exports = LogService;