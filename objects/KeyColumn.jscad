include("CherryMX.jscad");

KeyColumn = function KeyColumn(numKeys) {
    return [CherryMX(true), CherryMX().translate([30, 0, 0])];
}