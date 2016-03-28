var express = require('express');
var request = require('request');
var cheerio = require('cheerio');


var router = express.Router();

router.get('/rating/:zipcode', function(req, res) {
    console.log('Rating get invoked!');
    console.log(req.params.zipcode);
    var zipcode = req.params.zipcode;
    var url = 'http://www.school-ratings.com/schoolRatings.php?zipOrCity=' + zipcode;
    //X1-ZWz19tb5nmvg23_8gte4
    request(url, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var numberPattern = /<th>(\d{3})<\/th>/g;
            var apiArray = body.match(numberPattern);
            console.log(apiArray[0]);
            var sum = 0;

            for (var i = 0; i < apiArray.length; i++) {
                sum += parseInt(apiArray[i].substring(4, 7));
                console.log(sum);
            }

            var average = sum / apiArray.length;
            res.send({ average: average });
        }
    });
});

router.get('/:zipcode', function(req, res) {
    console.log('Server get invoked!');
    console.log(req.params.zipcode);
    var zipcode = req.params.zipcode;
    var url = 'http://www.zillow.com/homes/' + zipcode + '_rb/';
    //X1-ZWz19tb5nmvg23_8gte4
    request(url, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            // console.log(body) // Show the HTML for the Google homepage.
            function House(imageUrl, id, street, price, description) {
                if (id) {
                    this.id = id;
                } else {
                    this.id = 'ID Hidden';
                }
                this.imageUrl = imageUrl;
                if (street) {
                    this.street = street;
                } else {
                    this.street = "Address Hidden";
                }
                if (price) {
                    this.price = price;
                } else {
                    this.price = 'unknown';
                }
                this.description = description;
            };

            var $ = cheerio.load(body);
            var ids = $('article');
            var images = $('article figure');
            var streetAddresses = $('article div.property-info dt a');
            var prices = $('article div.property-info dt.price-large');
            var descriptions = $('article dt.property-data span.beds-baths-sqft');

            var houseList = [];
            if (images['length'] != 0) {
                for (var i = 0; i < 10; i++) {
                    var house = new House(
                        images[i].attribs['data-photourl'],
                        ids[i].attribs['id'].substring(5, 12),
                        streetAddresses[i].attribs['title'],
                        prices[i].children[0].data,
                        descriptions[i].children[0].data);
                    houseList.push(house);
                }

                res.send({ properties: houseList });
            } else {
                res.end('Server is busy, Please try it again.');

            }

        }
    });
});

module.exports = router;
