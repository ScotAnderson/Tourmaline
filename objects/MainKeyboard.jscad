include("ThumbCluster.jscad");
include("KeyColumn.jscad");

function main() {

//    return union( ThumbCluster(), union(KeyColumn()).translate([0, 40, 0]) );
    return ThumbCluster().rotateX(10).rotateY(-5);
}