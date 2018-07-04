const
    QUOTES = require('./quotes.json'),
    SECOND = 1000,
    MAX_INTERVAL = 5 * SECOND,
    MIN_INTERVAL = 0;

const
    randomInt = (max, min = 0)=> Math.round(Math.random() * (max-min)) + min,
    valueOnce = (firstValue = 0)=> (function(firstRun){ return (value)=> firstRun ? ((firstRun = false) || firstValue) : value })(true),
    getQuote = function* (){
        const value = valueOnce(0);
        while(true){
            yield new Promise((resolve)=> {
                setTimeout(
                    ()=> resolve({
                        type: randomInt(1) ? "err" : "out",
                        quote: QUOTES[randomInt(QUOTES.length - 1)]
                    }),
                    value(randomInt(MAX_INTERVAL, MIN_INTERVAL))
                );
            })
        }
    };

(async function(){
    for await(const { type, quote } of getQuote()){
        console[type === "err" ? "warn" : "log"](quote);
    }
})();