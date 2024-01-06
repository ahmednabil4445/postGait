
class ApiFeatuers {
    constructor(mongooseQuery, queryString) {
        this.mongooseQuery = mongooseQuery
        this.queryString = queryString
    }

    // ********************* pagination *************************
    paginate() {
        let page = this.queryString.page * 1 || 1;
        if (this.queryString.page <= 0) page = 1;
        let skip = (page - 1) * 5;
        this.page = page
        this.mongooseQuery.skip(skip).limit(5);
        return this;
    }

    // ********************* Filter *************************
    filter() {
        let filterObj = { ...this.queryString }
        let excludedQuery = ['sort', 'page', 'fields', 'keyword']
        excludedQuery.forEach((q) => {
            delete filterObj[q]
        })
        filterObj = JSON.stringify(filterObj)
        filterObj = filterObj.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)
        filterObj = JSON.parse(filterObj)
        this.mongooseQuery.find(filterObj);
        return this;
    }
    // ********************* Sort *************************
    sort() {
        if (this.queryString.sort) {
            let sortedBy = this.queryString.sort.split(',').join(' ')
            this.mongooseQuery.sort(sortedBy);
        }
        return this;
    }

    // ********************* Search *************************

    
    search() {
        if (this.queryString.keyword) {
            this.mongooseQuery.find({
                $or: [
                    { name: { $regex: this.queryString.keyword, $options: 'i' } },
                    { email: { $regex: this.queryString.keyword, $options: 'i' } },
                    { phone: { $regex: this.queryString.keyword, $options: 'i' } },
                    { customerAddress: { $regex: this.queryString.keyword, $options: 'i' } },
                    { customerAddress_Elective: { $regex: this.queryString.keyword, $options: 'i' } },
                    { nameCustomer: { $regex: this.queryString.keyword, $options: 'i' } },
                    { storeName: { $regex: this.queryString.keyword, $options: 'i' } },
                    { shippingCompany: { $regex: this.queryString.keyword, $options: 'i' } },
                    { Main: { $regex: this.queryString.keyword, $options: 'i' } },
                    { Name: { $regex: this.queryString.keyword, $options: 'i' } },
                    
                    
                ]
            })
        }
        return this;
    }

    // ********************* Select Fields *************************
    selectFields() {
        if (this.queryString.fields) {
            let fields = this.queryString.fields.split(',').join(' ')
            this.mongooseQuery.select(fields)
        }
        return this;
    }
}
module.exports = ApiFeatuers
