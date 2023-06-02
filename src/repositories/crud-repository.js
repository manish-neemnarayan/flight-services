const {Logger} = require("../config");

class CrudRepository {
    constructor(model) {
        this.model = model;
    }

    async create(data) {
            const response = await this.model.create(data);
            return response;
   }

    async destroy(data) {
        try {
            const response = await this.model.destroy({
                where: {
                    id : data
                }
            });
            return response;
        } catch (error) {
            Logger.error("something went wrong in the Crud Repo : Destroy");
            throw new Error(error);

        }
    }    

    async getAll() {
        try {
            const response = await this.model.findAll();
            return response;
        } catch (error) {
            Logger.error("something went wrong in the Crud Repo : get");
            throw new Error(error);

        }
    }

    async update(id, data) {
        try {
            const response = await this.model.update(data, {
                where: {
                    id : id
                }
            });
            return response;
        } catch (error) {
            Logger.error("something went wrong in the Crud Repo : update");
            throw new Error(error);

        }
    }    
}

module.exports = CrudRepository;