const Redis = require('ioredis')

class ContextStore {
    constructor(config) {
        this.config = config
    }
    open() {
        this.redis = new Redis(config)
    }
    close() {
        this.redis.close()
    }
    get(scope, key, callback){
        this.redis.get(`${scope}:${key}`, callback)
    }
    set(scope, key, value, callback){
        this.redis.set(`${scope}:${key}`, value, callback)
    }
    keys(scope, callback){
        this.redis.keys(`${scope}:*`, callback)
    }
    // delete(scope){

    // }
    // clean(_activeNodes){

    // }
}

module.exports = function(config) {
    return new ContextStore(config)
}
