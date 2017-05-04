var width = 800,
    height = 200,
    padding = 15;

var xScale = d3.scaleLinear()
    .domain([6, 9.5]) //min rating to highest
    .range([200, width-padding]);

var rScale = d3.scaleLinear()
    .domain([0, 26000])
    .range([0, (height-padding)/2]);

var xAxis = d3.axisBottom(xScale);

var showMovieInfo = (movie) => {
    var table = $("#movie-info table").get();
    $(table).find(".title-row td").text(movie.title);
//    $(table).find(".actor-row td").text(movie.actor);
    $(table).find(".year-row td").text(movie.year);
    $(table).find(".gross-row td").text("$" + movie.gross);
    $(table).find(".rating-row td").text(movie.rating);
//    console.log(title);
}

for (var actor in data) {
    var svg = d3.select("section.movies")
                .append("svg")
                .attr("class", "svg-movie")
                .attr("width", width)
                .attr("height", height)
                .attr("id", actor)
                .attr("class", "movie");
    svg.append("text")
        .attr("class", "svg-text")
        .attr("x", 0)
        .attr("y", height/2)
        .attr("class", "actor")
        .text(actor);
        
    var movies = data[actor];
    var circles = svg.selectAll("circle").data(movies);
    circles.enter().append("circle")
    .attr("class", "svg-circle")
    .attr("cy", height/2)
    .attr("cx", (d) => {return xScale(d.rating)})
    .attr("r", (d) => {return rScale(Math.sqrt(d.gross))})
    .attr("opacity", 0.5)
    .attr("fill", "pink")
    .on("mouseover", (d) => {
        showMovieInfo(d);
    });

    svg.append("g")
        .attr("class", "svg-axis")
        .attr("transform", "translate(0," + height/2 + ")")
        .call(xAxis);
}