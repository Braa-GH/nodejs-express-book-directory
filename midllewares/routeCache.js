const { cache } = require('../configuration')

module.exports = (req,res,next) => {
    //check if http method is GET
    if(req.method !== 'GET') return next();

    //check if key exists in the cache
    const key = req.originalUrl;
    const cacheResponse = cache.get(key);
    if(cacheResponse){
        // key is exist in the cache
        console.log(`cache hit for ${key}`)
        return res.send(cacheResponse);//return response from the cache
    }else {
        //if not exist, store response in the cache
        console.log("cache miss for", key);
        const originalJson = res.json;
        res.json = data => {
            cache.set(key, data, 1200);
            originalJson.call(res, data)
        }
        next();
    }

}