const { StatusCodes } = require("http-status-codes");
const {AppError} = require("../utils/errors")

class CrudRepository {
    constructor(model) {
        this.model = model;
    }

    async create(data) {
        console.log(this.model)
            const response = await this.model.create(data);
        console.log(response)
            return response;
   }

    async destroy(id) {
        const response = await this.model.destroy({
            where: {
                id : id
            }
        });
        if(!response) {
            throw new AppError("Requested data is not found", StatusCodes.NOT_FOUND);
        };
        return response;
    }    

    async getAll() {
        const response = await this.model.findAll();
        return response;
    }

    async getOne(id) {
        const response = await this.model.findByPk(id);
        if(!response) {
            throw new AppError("Requested data is not found", StatusCodes.NOT_FOUND);
        }
        return response;
    }

    async update(id, data) {
        const response = await this.model.update(data, {
            where: {
                id : id
            }
        });
        if (response.length === 1 && response[0] === 0) {
            throw new AppError("Requested data is not found", StatusCodes.NOT_FOUND);
        }
     
        return response;

    }    
}

module.exports = CrudRepository;