/*
 *    main.js
 */
var margin = { left: 100, right: 10, top: 10, bottom: 100 };
var flag = true;

var g = d3
  .select("#chart-area").append("svg")

  .attr("width", 700 + margin.right + margin.left)

  .attr("height", 500 + margin.top + margin.bottom)

  .append("g")

  .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");
  

var x = d3.scaleBand()

		.range([0, 700])

		.padding(0.2);


var y = d3.scaleLinear()

		.range([500, 0]);


d3.json("data/revenues.json").then((data) => {

    data.forEach((d) => {
      d.revenue = +d.revenue;
      d.profit = +d.profit;
    });
    d3.interval(() => {
      var newData = flag ? data : data.slice(1);
      update(newData);
      flag = !flag;
    }, 1000);
    update(data);
  })
  .catch((error) => {
    console.log(error);
  });
var xAxisGroup = g.append("g").attr("class", "x axis")
  					.attr("transform", "translate(0, " + 500 + ")");

var yAxisGroup = g.append("g").attr("class", "y axis");

g.append("text")
  .attr("x", 700 / 2)
  .attr("y", 500 + 60)
  .attr("font-size", "20px")
  .attr("text-anchor", "middle")
  .attr("font-weight", "bold")
  .text("Months");

function update(data) {
  var value = flag ? "revenue" : "profit";
  x.domain(data.map((d)=>{ return d.month; }))
  y.domain([0, d3.max(data, (d) => { return d.revenue; })]);
  xAxisGroup.call(xAxisCall);
  yAxisGroup.call(yAxisCall);
  var bars = g.selectAll("rect").data(data);
  bars.exit().remove();
  bars
    .attr("x", (d) => x(d.month))

    .attr("y", (d) => y(d[value]))

    .attr("width", x.bandwidth)

    .attr("height", (d) => 500 - y(d[value]));

  bars.enter().append("rect")

    .attr("x", (d) => x(d.month))

    .attr("y", (d) => y(d[value]))

    .attr("width", x.bandwidth)

    .attr("height", (d) => 500 - y(d[value]))

    .style("fill", "yellow");

  var label = flag ? "Revenue" : "Profit";

  yLabel.text(label);
}





var yLabel = g.append("text")
  .attr("class", "y axis-label")
  .attr("x", -(500 / 2))
  .attr("y", -60)
  .attr("font-size", "20px")
  .attr("text-anchor", "middle")
  .attr("transform", "rotate(-90)")
  .attr("font-weight", "bold")
  .text("Revenue");


var xAxisCall = d3.axisBottom(x);
var yAxisCall = d3.axisLeft(y);