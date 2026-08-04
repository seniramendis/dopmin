import DottedMap from "dotted-map";
const map = new DottedMap({ height: 100, grid: "diagonal" });
const svg = map.getSVG({ radius: 0.22, color: "#00000040", shape: "circle", backgroundColor: "white" });
console.log(svg.slice(0, 300));
