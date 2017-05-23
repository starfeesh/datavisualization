// Fetch json
var countryData = fetch("inc/jsonencode.php")
    .then(e=>e.json())
    .then(handleData);

var countryArray = [];

function handleData(data) {
    countryArray = data;
}

window.addEventListener('load', pageReady);
var s;
var initialBanana;
var b;
var bs;
var stats;
var bg;
var resetButton;
var xAxis;
var yAxis;

function pageReady(){
    s = Snap("#svg");
    initialBanana = s.select("#banana");
    b = s.select("#bananas");
    bs = s.selectAll("#bananas > g");
    stats = s.select("#statsfill");
    bg = s.group(bs);
    resetButton = document.querySelector(".button");



    bg.appendTo(b);
    stats.transform('t0,-150');
    initialBanana.click(handleClick);
    $(resetButton).hide();
    setInterval(pulse, 500);


}
function pulse(){
    initialBanana = s.select("#banana");

    initialBanana.animate({transform: 's1.2'}, 250, function(){
        initialBanana.animate({transform: 's1'}, 250);
    });
}

// Reposition banana group after click
function reposition() {
    var offsetx = 125;
    var offsety = -75;
    bg.animate({transform: 't'+offsetx+','+offsety}, 1000);
}
// Handle click
function handleClick()
{
    this.attr("opacity", 0);
    reposition();
    var clone;
    var clones = [];
    var count = 100;
    var sumUnits = 0;

// Create clones
    for (var i = 0; i < count; i++)
    {
        clone = initialBanana.clone();
        clone.prependTo(bg);

        clone.attr("opacity", 0);
        clone.removeClass("bactive");
        clones.push(clone);
    }
// Sum up units for overall 100%
    countryArray.forEach(function(row) {
       sumUnits += parseInt(row.units);
    });

    setTimeout(function()
    {
        var iStackX = -102;
        var jStackX = -22;
        var kStackX = 58;
        var lStackX = 138;
        var stackY;
        var iLower = 0;
        var iUpper =  Math.round(countryArray[0].units / sumUnits * 100);
        var iHeight = (iUpper - iLower) * 2;
        var jLower = iUpper;
        var jUpper = Math.round(countryArray[1].units / sumUnits * 100) + jLower;
        var jHeight = (jUpper - jLower) * 2;
        var kLower = jUpper;
        var kUpper = Math.round(countryArray[2].units / sumUnits * 100) + kLower;
        var kHeight = (kUpper - kLower) * 2;
        var lLower = kUpper;
        var lUpper = Math.round(countryArray[3].units / sumUnits * 100) + lLower;
        var lHeight = (lUpper - lLower) * 2;
        var tallest = Math.max(iHeight,jHeight,kHeight,lHeight);

// Create stacks
        for (var i = iLower; i < iUpper; i++){
            stackY = (tallest - iHeight) + (i * 2 - iLower * 2) - 25;
            clones[i].animate({transform: 't'+iStackX+','+stackY+ 'r-70', opacity: 1}, 2000);

            if (i % 2 == 0){
                var f = s.filter(Snap.filter.shadow(0, 2, .3)),
                    c = clones[i].attr({
                        filter: f
                    });
            }
        }
        for (var j = jLower; j < jUpper; j++){
            stackY = (tallest - jHeight) + (j * 2 - jLower * 2) - 25;
            clones[j].animate({transform: 't'+jStackX+','+stackY+ 'r-70', opacity: 1}, 2000);

            if (j % 2 == 0){
                f = s.filter(Snap.filter.shadow(0, 2, .3));
                c = clones[j].attr({
                    filter: f
                });
            }
        }
        for (var k = kLower; k < kUpper; k++){
            stackY = (tallest - kHeight) + (k * 2 - kLower * 2) - 25;
            clones[k].animate({transform: 't'+kStackX+','+stackY+ 'r-70', opacity: 1}, 2000);

            if (k % 2 == 0){
                f = s.filter(Snap.filter.shadow(0, 2, .3));
                c = clones[k].attr({
                    filter: f
                });
            }
        }
        for (var l = lLower; l < lUpper; l++){
            stackY = (tallest - lHeight) + (l * 2 - lLower * 2) - 25;
            clones[l].animate({transform: 't'+lStackX+','+stackY+ 'r-70', opacity: 1}, 2000);

            if (l % 2 == 0){
                f = s.filter(Snap.filter.shadow(0, 2, .3));
                c = clones[l].attr({
                    filter: f
                });
            }
        }

        var countryInfo = s.selectAll("#countryTags > g");
        var rowCounter = 0;
        var map = s.select("#map");
        map.animate({opacity: 0}, 2000);

        var xPositions = [145, 220, 280, 400];
        var percentPositions = [12, 15, 45, 8];
        var yPosition = 520;

// Handle the country names and percentages
        countryInfo.forEach(function(el){
            var countryName = countryArray[rowCounter].name;
            var percentage = Math.round(countryArray[rowCounter].units / sumUnits * 100) +'%';
            var countryBBox = el.getBBox();
            var bananaBBox = clone.getBBox();

            el.transform('t'+(xPositions[rowCounter] - (countryBBox.width / 2) + (bananaBBox.width / 2))+','+yPosition);
            var countryText = el.select("text:nth-child(1)");
            countryText.attr("opacity", 0)
                .attr({text: countryName})
                .attr({fill: "#fff"})
                .animate({opacity: 1}, 500);
            var percentText = el.select("text:nth-child(2)");
            percentText.attr("opacity", 0)
                .attr({text: percentage, fill: "#fff"})
                .transform('t'+percentPositions[rowCounter]+',15')
                .animate({opacity: 1}, 500);


            rowCounter++;
        });


        $(resetButton).show(1000);
    }, 3000);

// Hide first banana
    this.attr("display", "none");

// Animate statistics banner
    stats.animate({transform: 't0, 0'}, 2000, mina.bounce).animate({opacity: 1}, 500);
    setTimeout(function () {
        stats.animate({transform: 't0,-150'}, 1000, mina.bounce).animate({opacity: 0}, 500);
    },7000)

}
