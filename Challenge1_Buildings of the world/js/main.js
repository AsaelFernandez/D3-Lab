/*
*    main.js
*/
var svg = d3.select("#chart-area").append("svg")

	.attr("width", 900)

	.attr("height", 900)

	.style("background-color", "black")

		.style("stroke", "white");


d3.json("data/buildings.json").then((data)=> {

	data.forEach((d)=>{

		d.height = +d.height;

	});

	var rectangles = svg.selectAll("rect").data(data);
    rectangles
      .enter()
      .append('rect')
      .attr('y', (d)=>900-(d.height/2))
      .attr('x', (d,i) => {
      	console.log(i)
       return (i*(d.height)/10);
      })
      .attr('height', (d) => d.height )
      .attr("width", "30")
      .attr('fill', "green");
  })
  .catch((error) => {
    console.log(error);
  });
