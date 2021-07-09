/*
*    main.js
*/
var svg = d3.select("#chart-area").append("svg")

  .attr("width", 500)

  .attr("height", 500)

  .style("background-color", "black")

    .style("stroke", "white");


d3.json("data/buildings.json").then((data)=> {
  var building = [];
  data.forEach((d)=>{

    d.height = +d.height;
    building.push(d.name);

  });

   

   console.log(building);

  var x = d3.scaleBand()

          .domain(building)

          .range([0,400])

          .paddingInner(0.3)

          .paddingOuter(0.3);


  var y = d3.scaleLinear()

          .domain([0,828])

          .range([0,400]);

  var color = d3.scaleOrdinal()

          .domain(building)

           .range(["RED", "BLUE", "YELLOW"]);        

  var rectangles = svg.selectAll("rect").data(data);
    rectangles
      .enter()
      .append('rect')
      .attr('y', (d)=>500-y(d.height))
      .attr('x', (d)=> x(d.name))
      .attr('height', (d) => y(d.height) )
      .attr("width", x.bandwidth)
      .attr('fill', (d)=>color(d.name));
  })
  .catch((error) => {
    console.log(error);
  });
