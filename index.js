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
        this.redis.hget(scope, key, (err, value) => {
            if (
                typeof value === 'string' &&
                (value.startsWith('{') || value.startsWith('['))
            ) {
                try {
                    callback(err, JSON.parse(value))
                } catch (error) {
                    callback(error, value)
                }
            } else {
                callback(err, value)
            }
        })
    }
    set(scope, key, value, callback) {
        // if (typeof value === 'string') {
        //     this.redis.hset(scope, key, value, callback)
        // } else
        if (typeof value === 'object') {
            this.redis.hset(scope, key, JSON.stringify(value), callback)
        } else {
            this.redis.hset(scope, key, value, callback)
        }
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
