
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
            var result = [], k;
            Object.defineProperty(result, 'isGrouped', { value: true });

            this.forEach(function(item){
                if(this.isGrouped){
                    result.push({key: item.key, items: item.items.groupBy(keyFn)});
                }else{
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
                }
            });

            return result;
        };
    }
})();