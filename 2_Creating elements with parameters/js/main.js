/*
*    main.js
*/
var data = [25, 20, 15, 10, 5];
var svg = d3.select("#chart-area").append("svg")

	.attr("width", 400)

	.attr("height", 400)

	.style("background-color", "black")

	.style("stroke", "white");

	

var rectangles = svg.selectAll("rectangle").data(data);

rectangles.enter()
	.append("rect")
		.attr("x",(d,i)=>{
			console.log("item: "+ d + " Index: " + i);
			return (i*50)+25;
		})
	.attr("y", (d)=>400-d)
	.attr("width",(d)=>d)
	.attr("height", (d)=>d)
	.attr("fill","green");
