# group-by
Extends the Array.prototype by implementing a groupBy method to generate groupings and nested groups.

## Usage
```javascript
// sample data array:
var data = [
  {"isActive":false,"age":21,"eyeColor":"brown","name":{"first":"Joy","last":"Bryant"}, "gender":"female"},
  {"isActive":true,"age":30,"eyeColor":"green","name":{"first":"Mcmahon","last":"House"}, "gender":"male"},
  {"isActive":true,"age":21,"eyeColor":"brown","name":{"first":"Humphrey","last":"Reilly"}, "gender":"female"},
  {"isActive":false,"age":21,"eyeColor":"blue","name":{"first":"Lacy","last":"Carrillo"}, "gender":"female"},
  {"isActive":false,"age":26,"eyeColor":"green","name":{"first":"Beard","last":"Merrill"}, "gender":"male"},
  {"isActive":true,"age":35,"eyeColor":"brown","name":{"first":"Drake","last":"Bean"}, "gender":"male"},
  {"isActive":true,"age":30,"eyeColor":"brown","name":{"first":"Kemp","last":"Griffith"}, "gender":"male"}
];
```

### Simple Array Grouping
```javascript
// simple grouping by gender:
var genderGroups = data.groupBy(function(user){ return user.gender });

// output:
[
	{"key":"female",
	"items":[
		{"isActive":false,"age":21,"eyeColor":"brown","name":{"first":"Joy","last":"Bryant"},"gender":"female"},
		{"isActive":true,"age":21,"eyeColor":"brown","name":{"first":"Humphrey","last":"Reilly"},"gender":"female"},
		{"isActive":false,"age":21,"eyeColor":"blue","name":{"first":"Lacy","last":"Carrillo"},"gender":"female"}
	]},
	{"key":"male",
	"items":[
		{"isActive":true,"age":30,"eyeColor":"green","name":{"first":"Mcmahon","last":"House"},"gender":"male"},
		{"isActive":false,"age":26,"eyeColor":"green","name":{"first":"Beard","last":"Merrill"},"gender":"male"},
		{"isActive":true,"age":35,"eyeColor":"brown","name":{"first":"Drake","last":"Bean"},"gender":"male"},
		{"isActive":true,"age":30,"eyeColor":"brown","name":{"first":"Kemp","last":"Griffith"},"gender":"male"}
	]}
];
```

### Nested Grouping
In general, groups can be unlimitedly nested:
```javascript
// nested grouping, first by gender, than by eye color:
var genderGroups = data.groupBy(function(user){ return user.gender });
var nestedGroups = genderGroups.groupBy(function(user){ return user.eyeColor; });

// output:
[
	{"key":"female",
	"items":[
		{
			"key":"brown",
			"items":[
				{"isActive":false,"age":21,"eyeColor":"brown","name":{"first":"Joy","last":"Bryant"},"gender":"female"},
				{"isActive":true,"age":21,"eyeColor":"brown","name":{"first":"Humphrey","last":"Reilly"},"gender":"female"}
			]
		},
		{
			"key":"blue",
			"items":[
				{"isActive":false,"age":21,"eyeColor":"blue","name":{"first":"Lacy","last":"Carrillo"},"gender":"female"}
			]
		}
	]},
	{"key":"male",
	"items":[
		{
			"key":"brown",
			"items":[
				{"isActive":true,"age":35,"eyeColor":"brown","name":{"first":"Drake","last":"Bean"},"gender":"male"},
				{"isActive":true,"age":30,"eyeColor":"brown","name":{"first":"Kemp","last":"Griffith"},"gender":"male"}
			]
		},
		{
			"key":"green",
			"items":[
				{"isActive":true,"age":30,"eyeColor":"green","name":{"first":"Mcmahon","last":"House"},"gender":"male"},
				{"isActive":false,"age":26,"eyeColor":"green","name":{"first":"Beard","last":"Merrill"},"gender":"male"}
			]
		}
	]}
];
```

You also can chain the groupBy calls:
```javascript
var nestedGroups = data
  .groupBy(function(user){ return user.gender; })
  .groupBy(function(user){ return user.eyeColor; });
```

### Conclusions
```javascript
data.isGrouped // undefined

genderGroups.isGrouped // true
// first group's items:
genderGroups[0].items.isGrouped // false

nestedGroups.isGrouped // true
// first group's items:
nestedGroups[0].items.isGrouped // true
```
