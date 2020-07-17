enum Enum {
    A
}
let a = Enum.A
let nameOfA = Enum[a]

// ==>
var Enum;
(function(Enum) {
    Enum[Enum['A'] = 0] = 'A'
})(Enum || (Enum = {}))
