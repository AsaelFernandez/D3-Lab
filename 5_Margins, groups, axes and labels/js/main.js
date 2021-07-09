/*
*    main.js
*/



d3.json("data/buildings.json").then((data)=> {

  var margin = {top: 10, right: 10, bottom: 100, left:100};

  const g = d3.select('#chart-area').append('svg')
    .attr('width', 600 + margin.right + margin.left)
    
    .attr('height', 400 + margin.top + margin.bottom)
    
    .append('g')
    
    .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')')

    .style("background-color", "black");
    
 

  
  var building = [];
  var highest=0;
  data.forEach((d)=>{
    d.height = +d.height;
    building.push(d.name);
    if(d.height>highest){
      highest=d.height;
    }

  });

   console.log(building);

   
  var x = d3.scaleBand()

          .domain(building)

          .range([0,600])

          .paddingInner(0.1)

          .paddingOuter(0.1);


  var y = d3.scaleLinear()

          .domain([0,highest])

          .range([0,400]);

  var color = d3.scaleOrdinal()

          .domain(building)

           .range(["RED", "BLUE", "YELLOW"]);           

  var rects = g.selectAll("rect").data(data);
    

 var bottomAxis = d3.axisBottom(x).ticks(9);
  g.append('g')
    .attr('class', 'bottom axis')
    .attr('transform', 'translate(0, ' + 400 + ')')
    .call(bottomAxis)
    .selectAll('text')
    .attr('text-anchor', 'end')
    .attr('transform', 'rotate(-40)');

   var leftAxis = d3
    .axisLeft(y)
    .tickFormat((d) => d + ' m')
    .ticks(5);
  g.append('g').attr('class', 'left axis').call(leftAxis);

  g.append('text')
    .attr('x', 600 / 2)
    .attr('y', 480 )
    .attr('font-size', '20px')
    .attr('text-anchor', 'middle')
    .style('fill', 'black')
    .text("The word's tallest buildings");

  g.append('text')
    .attr('class', 'y axis-label')
    .attr('x', -(400 / 2))
    .attr('y', -60)
    .attr('font-size', '20px')
    .attr('text-anchor', 'middle')
    .attr('transform', 'rotate(-90)')
    .style('fill', 'black')
    .text('Height (m)');

  rects
      .enter()
      .append('rect')
      .attr('y', (d)=>400-y(d.height))
      .attr('x', (d)=> x(d.name))
      .attr('height', (d) => y(d.height) )
      .attr("width", x.bandwidth)
      .attr('fill', (d)=>color(d.name));


  })
  .catch((error) => {
    console.log(error);
  });
