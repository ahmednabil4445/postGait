const clientModel = require('../../../databases/models/client.model')
const AppError = require('../../utils/AppError')
const { catchAsyncError } = require('../../middleware/catchAsyncError')
const axios = require('axios');
const ApiFeatuers = require('../../utils/ApiFeatuers')

module.exports.createClient = catchAsyncError(async (req, res, next) => {
    const ClientExist = await clientModel.findOne({ email: req.body.email });
    if (ClientExist) next(new AppError('E-mail Aleardy Exist', 409))
    let Client = new clientModel(req.body)
    await Client.save();
    res.status(200).json({ message: 'Create Client Success', Client })
})
module.exports.createClient = catchAsyncError(async (req, res, next) => {
    const ClientExist = await clientModel.findOne({ email: req.body.email });
    if (ClientExist) next(new AppError('E-mail Aleardy Exist', 409))
    let newClient = new clientModel(req.body)
    await newClient.save();
    res.status(200).json({ message: 'Create Client Success', client: newClient });
})

module.exports.cities = catchAsyncError(async (req, res, next) => {
    const searchTerm = req.query.search || '';
    const citiesResponse = await axios.get('https://raw.githubusercontent.com/homaily/Saudi-Arabia-Regions-Cities-and-Districts/master/json/cities.json');
    const citiesData = citiesResponse.data;
    
    const uniqueCities = new Set(); // Use a set to store unique city names
    
    const filteredCities = citiesData.reduce((uniqueCitiesArray, cityData) => {
        const cityNameLowerCase = cityData.name_en.toLowerCase();
        const cityNameArabic = cityData.name_ar;

        // Check if either English or Arabic name matches the search term
        if (cityNameLowerCase.includes(searchTerm.toLowerCase()) || cityNameArabic.includes(searchTerm)) {
            // Check if the city name is not already in the set
            if (!uniqueCities.has(cityNameLowerCase)) {
                uniqueCities.add(cityNameLowerCase); // Add the city name to the set
                uniqueCitiesArray.push({
                    name_en: cityNameLowerCase,
                    name_ar: cityNameArabic
                });
            }
        }
        return uniqueCitiesArray;
    }, []);

    res.status(200).json({ message: 'Cities retrieved successfully', cities: filteredCities });
});



module.exports.getAllClients = catchAsyncError(async (req, res) => {
    let Clients = await clientModel.find({})
    res.json({ message: 'this is All Clients', Clients })
})
module.exports.searchClient = catchAsyncError(async (req, res) => {
    let apiFeatuers = new ApiFeatuers(clientModel.find(), req.query).search()
    let Clients = await apiFeatuers.mongooseQuery
    res.json({ message: 'this is All Clients', Clients })
})


module.exports.getClient = catchAsyncError(async (req, res, next) => {
    const { id } = req.params
    let Client = await clientModel.findById(id)
    if (!Client) {
        return next(new AppError(`Client Not Found`, 404))
    }
    res.json({ message: 'Success', Client })
})


module.exports.updateClient = catchAsyncError(async (req, res, next) => {
    const { id } = req.params
    let Client = await clientModel.findByIdAndUpdate(id, req.body, { new: true });
    if (!Client) {
        return next(new AppError(`Client Not Found`, 404))
    }
    res.json({ message: 'Updated Client', Client })
})

module.exports.deleteClient = catchAsyncError(async (req, res, next) => {
    const { id } = req.params
    let Client = await clientModel.findByIdAndDelete(id);
    if (!Client) {
        return next(new AppError(`Client Not Found`, 404))
    }
    res.json({ message: 'Deleted Client', Client })
})

