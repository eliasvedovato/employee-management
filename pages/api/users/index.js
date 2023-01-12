import connectMongo from '../../../database/conn'
import {getUsers} from '../../../database/controller'

export default async function handler(req, res) {
    connectMongo().catch(()=> res.status(405).json({error: 'Error in the connection'}))

    //type of request
    const {method} = req

    switch(method){
        case 'GET':
            getUsers(req, res)
            break;
        case 'POST':
            res.status(200).json({ method, name: 'POST request' })
            break;
        case 'PUT':
            res.status(200).json({ method, name: 'PUT request' })
            break;
        case 'DELETE':
            res.status(200).json({ method, name: 'DELETE request' })
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
            res.status(405).end(`Method ${method} not allowed`)
            break;
    }
}