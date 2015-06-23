
/**
 * Extends the Array.prototype with a groupBy method
 * allowing to group an array by a specific key property.
 */
(function(){

    // Do not overwrite an existing implementation!
    if(typeof Array.prototype.groupBy !== 'function'){

        /**
         * Returns a new array grouped by the key returned by keyFn.
         *
         * @param {function(item)} keyFn Function returning the key to group by.
         * @returns new GroupedArray instance.
         **/
        Array.prototype.groupBy = function groupBy(keyFn){
            var result = new GroupedArray();
            var i, k, item;
            this.forEach(function(item){
                k = keyFn(item);
                if(!result.some(function(pair){
                        if(pair.key === k){
                            pair.items.push(item);
                            // return true to break the loop:
                            return true;
                        }
                    })){
                    // add a new key-items pair to the result:
                    result.push({key: k, items: [item]});
                }
            });

            return result;
        };
    }

    /**
     * Class function inheriting from class Array.
     * Overwrites the original groupBy member function.
     */
    function GroupedArray(){
        Array.apply(this);
    }
    // Inherit prototype and set constructor.
    // Additionally, add a property isGrouped = true to the prototype:
    GroupedArray.prototype = Object.create(Array.prototype, {
        constructor: { value: GroupedArray },
        isGrouped: { value: true }
    });

    /**
     * Groups an already grouped array on any possible level.
     *
     * @param {function(item)} keyFn Function returning the key to group by.
     * @returns new GroupedArray instance.
     */
    GroupedArray.prototype.groupBy = function groupBy(keyFn){
        var result = new GroupedArray();
        this.forEach(function(g){
            // if g.items is not grouped yet (typeof Array), Array.groupBy gets called.
            // If the items are already grouped (typeof GroupedArray),
            // this method calls itself recursively.
            result.push({key: g.key, items: g.items.groupBy(keyFn)});
        });

        return result;
    };
})();