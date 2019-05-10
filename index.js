const Redis = require('ioredis')

class ContextStore {
    constructor(config) {
        this.config = config
    }
    open() {
        this.redis = new Redis(this.config)
    }
    close() {
        this.redis.disconnect()
    }
    get(scope, key, callback) {
        this.redis.hget(scope, key, data => callback(JSON.parse(data)))
    }
    set(scope, key, value, callback) {
        this.redis.hset(scope, key, JSON.stringify(value), callback)
    }
    keys(scope, callback) {
        this.redis.hkeys(scope, callback)
    }
    delete(scope) {
        this.redis.del(scope)
    }
    clean(_activeNodes) {}
}

module.exports = function(config) {
    return new ContextStore(config)
}
