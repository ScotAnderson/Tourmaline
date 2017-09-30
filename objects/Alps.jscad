
// this is just a clone of the dactyl code. Untested (might be completely wrong).
// I don't have any alps switches.
Alps = function(supports = false) {

    var keyswitchWidth = 14.4;
    var keyswitchHeight = 14.4;
    var plateThickness = 4;
    var alpsHeight = 13;
    var alpsNotchHeight = 1;
    var alpsNotchWidth = 15.5;
    var holeSize = 14.4;
    const endcapsize = 6.5;

    var topwall = cube({
        size: [keyswitchWidth + 3, 2.2, plateThickness],
        center: true
    }).translate(
        [0, (2.2 / 2) + (alpsHeight / 2), 0]
    );

    var leftwall = union(
        cube({
            size: [1.5, keyswitchHeight + 3, plateThickness],
            center: true
        }).translate([(1.5 / 2) + (15.6 / 2), 0, 0]),
        cube({
            size: [1.5, keyswitchHeight + 3, alpsNotchHeight],
            center: true
        }).translate([(1.5 / 2) + (alpsNotchWidth / 2), 0, (plateThickness / 2) - (alpsNotchHeight / 2)])
    );

    var complete = union(topwall, leftwall);
    complete = union(complete, mirror([1, 0, 0], complete), mirror([0, 1, 0], complete));

    if (!supports) {
        complete.properties.corners = [
            new CSG.Vector3D([ (1.5 + (15.6 / 2)),  (2.2 + (alpsHeight / 2)),  (plateThickness / 2)]),
            new CSG.Vector3D([ (1.5 + (15.6 / 2)),  (2.2 + (alpsHeight / 2)), -(plateThickness / 2)]),
            new CSG.Vector3D([-(1.5 + (15.6 / 2)),  (2.2 + (alpsHeight / 2)),  (plateThickness / 2)]),
            new CSG.Vector3D([-(1.5 + (15.6 / 2)),  (2.2 + (alpsHeight / 2)), -(plateThickness / 2)]),
            new CSG.Vector3D([ (1.5 + (15.6 / 2)), -(2.2 + (alpsHeight / 2)),  (plateThickness / 2)]),
            new CSG.Vector3D([ (1.5 + (15.6 / 2)), -(2.2 + (alpsHeight / 2)), -(plateThickness / 2)]),
            new CSG.Vector3D([-(1.5 + (15.6 / 2)), -(2.2 + (alpsHeight / 2)),  (plateThickness / 2)]),
            new CSG.Vector3D([-(1.5 + (15.6 / 2)), -(2.2 + (alpsHeight / 2)), -(plateThickness / 2)]),
        ];
        return complete;
    }
    
    var endcap = difference(
        cube(
            {size: [holeSize +3, endcapsize, plateThickness],
            center: true}
        ).rotateZ(90).translate([((holeSize + 3) / 2) + (endcapsize / 2), 0, 0]),
        union(
            cube(
                {size: [14.2, 3.5, plateThickness],
                center: true}
            ),
            cube(
                {size: [16, 3.5, plateThickness],
                center: true}
            ).translate([0, 0, -1.3])
        ).rotateZ(90).translate([12, 0, 0])
    );

    complete = union( complete, endcap, mirror([1, 0, 0], endcap));
    complete.properties.corners = [
        new CSG.Vector3D([ (1.5 + (15.6 / 2) + (endcapsize)),  (2.2 + (alpsHeight / 2)),  (plateThickness / 2)]),
        new CSG.Vector3D([ (1.5 + (15.6 / 2) + (endcapsize)),  (2.2 + (alpsHeight / 2)), -(plateThickness / 2)]),
        new CSG.Vector3D([-(1.5 + (15.6 / 2) + (endcapsize)),  (2.2 + (alpsHeight / 2)),  (plateThickness / 2)]),
        new CSG.Vector3D([-(1.5 + (15.6 / 2) + (endcapsize)),  (2.2 + (alpsHeight / 2)), -(plateThickness / 2)]),
        new CSG.Vector3D([ (1.5 + (15.6 / 2) + (endcapsize)), -(2.2 + (alpsHeight / 2)),  (plateThickness / 2)]),
        new CSG.Vector3D([ (1.5 + (15.6 / 2) + (endcapsize)), -(2.2 + (alpsHeight / 2)), -(plateThickness / 2)]),
        new CSG.Vector3D([-(1.5 + (15.6 / 2) + (endcapsize)), -(2.2 + (alpsHeight / 2)),  (plateThickness / 2)]),
        new CSG.Vector3D([-(1.5 + (15.6 / 2) + (endcapsize)), -(2.2 + (alpsHeight / 2)), -(plateThickness / 2)]),
    ];

    return complete;
};