const
    QUOTES = require('./quotes.json'),
    SECOND = 1000,
    MAX_INTERVAL = 10 * SECOND,
    MIN_INTERVAL = 0;

const
    randomInt = (max, min = 0)=> Math.round(Math.random() * (max-min)) + min,
    getQuote = function* (){
        let firstTime = true;
        while(true){
            yield new Promise((resolve, reject)=> {
                setTimeout(
                    ()=> resolve({
                        type: randomInt(1) ? "err" : "out",
                        quote: QUOTES[randomInt(QUOTES.length - 1)]
                    }),
                    (()=> { let o = firstTime; firstTime = false; return o; })() ? 0 : randomInt(MIN_INTERVAL, MAX_INTERVAL)
                );
            })
        }
    };

(async function(){
    for await(const { type, quote } of getQuote()){
        console[type === "err" ? "warn" : "log"](quote);
    }
})();
