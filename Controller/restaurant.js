
const Restaurant = require("../Model/restaurantDB");
exports.getRestaurant = (req, res) => {
    
    Restaurant.find()
        .then(response => {
            res.status(200).json({
                message: "Restaurant Fetched Successfully",
                restaurant: response
            })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}

exports.filteredRestaurant = (req, res) => {
    let { location, mealtype, sort, page } = req.body;
    
    sort = sort ? sort : 1;         // 1 -> Ascending Order, -1 -> Descending Order
    page = page ? page : 1;         // If no page is specified, by default page - 1 will be selected

    const itemsPerPage = 2;     // Number of restaurants in a page
    const startIndex = page * itemsPerPage - itemsPerPage;
    const endIndex = page * itemsPerPage;

    var filterObj = {};     // empty Object

    location && (filterObj["city"] = location);     // Inserting a location data passed from the body to the filter object.
    mealtype && (filterObj["type.mealtype"] = mealtype);    // Inserting mealtype data passed from the body to the filter object.
       
    console.log(filterObj);

    Restaurant.find(filterObj).sort({cost : sort })
        .then(response => {
            const filteredResponse = response.slice(startIndex, endIndex);
            res.status(200).json({
                message: "Restaurant Filtered Successfully",
                restaurants: filteredResponse
            })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}