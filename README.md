# group-by
Extends the Array.prototype by implementing a groupBy method to generate groupings and nested groups.

## Usage
```javascript
// sample data array:
var data = [
  {"isActive":false,"age":21,"eyeColor":"brown","name":{"first":"Joy","last":"Bryant"}, "gender":"female"},
  {"isActive":true,"age":30,"eyeColor":"brown","name":{"first":"Mcmahon","last":"House"}, "gender":"male"},
  {"isActive":true,"age":21,"eyeColor":"brown","name":{"first":"Humphrey","last":"Reilly"}, "gender":"female"},
  {"isActive":false,"age":21,"eyeColor":"blue","name":{"first":"Lacy","last":"Carrillo"}, "gender":"female"},
  {"isActive":false,"age":26,"eyeColor":"brown","name":{"first":"Beard","last":"Merrill"}, "gender":"male"},
  {"isActive":true,"age":35,"eyeColor":"brown","name":{"first":"Drake","last":"Bean"}, "gender":"male"},
  {"isActive":true,"age":30,"eyeColor":"brown","name":{"first":"Kemp","last":"Griffith"}, "gender":"male"}
];
```

### Simple Array Grouping
```javascript
// simple grouping by gender:
var genderGroups = data.groupBy(function(user){ return user.gender });
```

### Nested Grouping
```javascript
// nested grouping, first by gender, than by eye color:
var genderGroups = data.groupBy(function(user){ return user.gender });
var nestedGroups = genderGroups.groupBy(function(user){ return user.eyeColor; });
```

You also can chain the groupBy calls:
```javascript
var nestedGroups = data
  .groupBy(function(user){ return user.gender; })
  .groupBy(function(user){ return user.eyeColor; });
```

### Conclusions
```javascript
data instanceof Array // true
data instanceof GroupedArray // false
data.isGrouped // undefined

genderGroups instanceof Array // true
genderGroups instanceof GroupedArray // true
genderGroups.isGrouped // true
genderGroups[0].items instanceof Array // true
genderGroups[0].items instanceof GroupedArray // false

nestedGroups instanceof Array // true
nestedGroups instanceof GroupedArray // true
nestedGroups.isGrouped // true
nestedGroups[0].items instanceof Array // true
nestedGroups[0].items instanceof GroupedArray // true
```
