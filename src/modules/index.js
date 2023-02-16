// export { default as PatientController} from './patients'
import patients from './patients'

const apiPrefix = "/api/v1"

const  routes = (app) => { 
    app.use(apiPrefix, patients)

    return app

}
export default routes;