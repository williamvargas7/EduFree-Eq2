import { AuthenticationStrategy } from "@loopback/authentication";
import { UserProfile } from "@loopback/security";
import {HttpErrors, Request} from '@loopback/rest';
import { SeguridadService } from "../services";
import { service } from "@loopback/core";
import parseBearerToken from "parse-bearer-token";



export class EstrategiaSeguridad implements AuthenticationStrategy {

    name: string = 'seguridad';

    constructor(
        @service(SeguridadService) 
        public servicioSeguridad: SeguridadService
    ){

    }

    async authenticate(request: Request): Promise <UserProfile | undefined> {
        let token = parseBearerToken(request);

        if(token) {
            let response = await this.servicioSeguridad.ValidarToken(token);

            if(response) {

                const perfil: UserProfile = Object.assign({
                    nombre: response.data.nombre,
                    email: response.data.email
                });
                return perfil;
            } else {
                throw new HttpErrors['401']('Token inválido');
            }
        } else {
            throw new HttpErrors['401']('Request no token');
        }


    }
}