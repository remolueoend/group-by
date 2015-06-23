
require('../dist/group-by.min');

describe('group-by', function(){

    describe('GroupedArray', function(){

        describe('ctor', function(){

            it('should inherit from Array prototype', function(){
                var arr = [],
                    group = arr.groupBy(function(i){ return i; });

                if(!(group instanceof Array)){
                    throw Error('GroupedArray not instance of Array prototype.');
                }
            });

        });

        describe('groupBy', function(){

        });
    });
});