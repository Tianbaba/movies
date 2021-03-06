var width = document.getElementById("svg-container").clientWidth,
    height = 200,
    padding = 10,
    _minRating = 6,
    _maxRating = 9.5,
    _minGross = 0,
    _maxGross = 26000,
    _opacity = 0.4;

function showMovieInfo(movie) {
    var table = $("#movie-info table").get();
    $(table).find(".title-row td").text(movie.title);
    $(table).find(".year-row td").text(movie.year);
    $(table).find(".gross-row td").text("$" + movie.gross);
    $(table).find(".rating-row td").text(movie.rating);
}

var xScale = d3.scaleLinear()
    .domain([_minRating, _maxRating]) //min rating to highest
    .range([200, width - padding]);

var rScale = d3.scaleLinear()
    .domain([_minGross, _maxGross])
    .range([0, (height - padding) / 2]);

var xAxis = d3.axisBottom(xScale);

for (var actor in data) {
    var svg = d3.select("#svg-container")
        .append("svg")
        .attr("class", "svg-movie")
        .attr("width", width)
        .attr("height", height)
        .attr("id", actor)
        .attr("class", "movie");
        
    svg.append("text")
        .attr("class", "svg-text")
        .attr("x", 0)
        .attr("y", height / 2)
        .attr("class", "actor")
        .text(actor);

    var movies = data[actor];
    var circles = svg.selectAll("circle").data(movies)
        .enter().append("circle")
        .attr("class", "svg-circle")
        .attr("cy", height / 2)
        .attr("cx", function(d) {
            return xScale(d.rating);
        })
        .attr("r", function(d) {
            return rScale(Math.sqrt(d.gross));
        })
        .attr("opacity", _opacity)
        .attr("fill", "pink")
        .on("mouseover", function (d) {
            showMovieInfo(d);
            d3.select(this)
                .attr("stroke", "red")
                .attr("stroke-width", 2);
        })
        .on("mouseout", function () {
            d3.select(this)
                .attr("stroke", "none")
                .attr("stroke-width", 0);
        });

    svg.append("g")
        .attr("class", "svg-axis")
        .attr("transform", "translate(0," + height / 2 + ")")
        .call(xAxis);
}
