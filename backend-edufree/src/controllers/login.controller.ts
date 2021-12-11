// Uncomment these imports to begin using these cool features!

import { service } from "@loopback/core";
import { repository } from "@loopback/repository";
import { HttpErrors, post, requestBody } from "@loopback/rest";
import { Credenciales } from "../models";
import { UsuarioRepository } from "../repositories";
import { SeguridadService } from "../services";

// import {inject} from '@loopback/core';


export class LoginController {
  constructor(
    @repository(UsuarioRepository)
    public usuarioRepository: UsuarioRepository,
    @service(SeguridadService)
    public servicioSeguridad: SeguridadService
  ) {}

  @post('/autenticar', {
    responses: {
      '200': {
        description: 'Login Ok'
      }
    }
  })
  async login(
    @requestBody() credenciales: Credenciales
  ) {
    try {
      const usuarioBuscado = await this.servicioSeguridad.ValidarUsuario(credenciales);
      if (usuarioBuscado) {
        // Generar Token
        let token = await this.servicioSeguridad.GenerarToken(usuarioBuscado);
        //return token;
        return {
          tk: token,
          data: usuarioBuscado
        };

      } else {
        throw new HttpErrors[401]('Datos no validos');
      }

    } catch (error) {
      throw new HttpErrors[401]('Datos no validos');
    }
  }


}


