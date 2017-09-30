include("ThumbCluster.jscad");
include("KeyColumn.jscad");
include("DactylSlantThumb.jscad");
include("DactylKeyboard.jscad");
include("Alps.jscad");
include("utils.jscad");

function getParameterDefinitions() {
    return [
        {name: 'switchType', caption: 'Switch Type', type: 'choice', values: ['CherryMX', 'Alps'], initial: 'CherryMX'}
    ];
}

function main() {
    OpenJsCad.log("Starting main.jscad::main()");

    var keyboard = DactylKeyboard(params.switchType).rotateZ(-90);
    keyboard = union(keyboard, DactylSlantThumb(params.switchType)).rotateZ(90).translate([-80, 0, 0]);

    // var connections = buildThumbConnections(
    //     keyboard.properties.keyconnects,
    //     keyboard.properties.thumbconnects
    // );

    //result = union(keyboard, connections);
 
    //var result = union(keyboard, mirror([1, 0, 0], keyboard).translate([80, 0, 0]));

    return keyboard;
}


function buildThumbConnections(keyconnects, thumbconnects) {
    var connections = [];

    connections.push(polyhedron({
        points: [
            vec2list(keyconnects[0]),
            vec2list(keyconnects[1]),
            vec2list(keyconnects[2]), 
            vec2list(keyconnects[3]),
            vec2list(thumbconnects[10]),
            vec2list(thumbconnects[11]),
            vec2list(thumbconnects[8]), 
            vec2list(thumbconnects[9]),
            vec2list(thumbconnects[6]),
            vec2list(thumbconnects[7]),
            vec2list(thumbconnects[2]),
            vec2list(thumbconnects[3]),
            vec2list(keyconnects[4]),
            vec2list(keyconnects[5]),
            vec2list(keyconnects[6]),
            vec2list(keyconnects[7]),
            vec2list(keyconnects[8]),
            vec2list(keyconnects[9]),
            vec2list(keyconnects[10]),
            vec2list(keyconnects[11]),
            vec2list(thumbconnects[0]),
            vec2list(thumbconnects[1])

        ],
        triangles: [
             [4, 5, 6], [5, 7, 6], [6, 7, 3], [3, 2, 6], [0, 2, 3], [3, 1, 0], 
             [0, 4, 6], [6, 2, 0], [1, 7, 5], [1, 3, 7], [0, 1, 9], [9, 8, 0],
             [0, 8, 4], [1, 5, 9], [4, 8, 9], [9, 5, 4], [9, 8, 10], [10, 11, 9],
             [8, 0, 10], [11, 1, 9], [12, 13, 11], [11, 10, 12], [0, 1, 13], [13, 12, 0],
             [0, 12, 10], [11, 13, 1], [12, 13, 14], [14, 13, 15], [11, 10, 14],
             [14, 15, 11], [12, 14, 10], [13, 11, 15], [14, 15, 17], [17, 16, 14],
             [16, 17, 11], [11, 10, 16], [10, 14, 16], [11, 17, 15], [16, 17, 19],
             [19, 18, 16], [18, 19, 11], [11, 10, 18], [16, 18, 10], [11, 19, 17],
             [18, 19, 21], [21, 20, 18], [20, 21, 11], [11, 10, 20], [18, 20, 10],
             [11, 21, 19]
        ]
    }));

    return connections[0];


}






// keyconnects[0] == key3.bottomleftupper       0
// keyconnects[1] == key3.bottomleftlower       1
// keyconnects[2] == key3.topleftupper          2
// keyconnects[3] == key3.topleftlower          3


//thumbconnects[8] == thumb2.toprightupper       6
//thumbconnects[9] == thumb2.toprightlower       7
//thumbconnects[10] == thumb2.bottomrightupper   4
//thumbconnects[11] == thumb2.bottomrightlower   5

//thumbconnects[6] == thumb1.toprightupper       8
//thumbconnects[7] == thumb1.toprightlower       9

// thumbconnects[2] == thumb0.toprightupper     10
// thumbconnects[3] == thumb0.toprightlower     11

// keyconnects[4] == key3.bottomrightupper      12
// keyconnects[5] == key3.bottomrightlower      13

// keyconnects[6] == key7.bottomleftupper       14
// keyconnects[7] == key7.bottomleftlower       15

// keyconnects[8] == key8.topleftupper           16
// keyconnects[9] == key8.topleftlower           17

// keyconnects[10] == key8.bottomleftupper      18
// keyconnects[11] == key8.bottomleftlower      19

// thumbconnects[0] == thumb0.bottomrightupper  20
// thumbconnects[1] == thumb0.bottomrightlower  21




