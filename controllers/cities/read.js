import City from "../../models/City.js";

export default async (req,res,next) => {
    try {
        console.log(req.query);   


        let objetoDeBusqueda = {}
        let objetoDeOrdenamiento = {}
        if (req.query._id) {
            objetoDeBusqueda.admin_id = req.query.admin_id
        }
        if (req.query.city) {
            objetoDeBusqueda.city = new RegExp(req.query.city,'i')
           
        }
        if (req.query.sort) {
            objetoDeOrdenamiento.city = req.query.sort
            
        }
        let allCities = await City
            .find(objetoDeBusqueda,'country city photo admin_id')
            .populate('admin_id','photo name -_id')
            .sort(objetoDeOrdenamiento)
        
        if (allCities.length>0) {
            return res.status(200).json({
                success: true,
                message: 'cities found',
                response: allCities
            })
        } else {
            return res.status(404).json({
                success: false,
                message: 'not found',
                response: null
            })
        }
    } catch (error) {
        next(error)
    }
}