include("ThumbCluster.jscad");
include("KeyColumn.jscad");
include("DactylSlantThumb.jscad");
include("DactylKeyboard.jscad");

function getParameterDefinitions() {
    return [
        {name: 'switchType', caption: 'Switch Type', type: 'choice', values: ['CherryMX'], initial: 'CherryMX'}
    ];
}

function main() {
    OpenJsCad.log("Starting main.jscad::main()");

    var keyboard = DactylKeyboard(params.switchType).rotateZ(-90);
    keyboard = union(keyboard, DactylSlantThumb(params.switchType)).rotateZ(90).translate([-80, 0, 0]);
 
    var result = union(keyboard, mirror([1, 0, 0], keyboard).translate([80, 0, 0]));

    return result;
}