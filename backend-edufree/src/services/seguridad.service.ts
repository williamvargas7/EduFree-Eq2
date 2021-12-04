import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import { repository } from '@loopback/repository';
import { Credenciales, Usuario } from '../models';
import {UsuarioRepository} from '../repositories';


const jwt = require('jsonwebtoken');

@injectable({scope: BindingScope.TRANSIENT})
export class SeguridadService {
  constructor(@repository(UsuarioRepository) public Usuariorepositorio: UsuarioRepository)   {}
  // Validar que el usuario exista
  //Generar un Token
  // Validar Token

  async ValidarUsuario(credenciales: Credenciales) {
    try {

      const usuarioBuscado = await this.Usuariorepositorio.findOne(
        {
          where: {
            usuario: credenciales.usuario,
            contrasenia: credenciales.contrasenia
          }
        }
      );
      if(usuarioBuscado){
        return usuarioBuscado;
      }else{
        return false;
      }
      
    } catch (error) {
      console.log(error.message);
      return false;
    }

  }

  async GenerarToken(usuario:Usuario){
    const token = jwt.sign(
      {
        data: {
          nombre:usuario.nombresUsuario,
          usuario:usuario.usuario
        }
      }, '2&%$##$%&%$&%');
      return token;
  }
  /*
   * Add service methods here
   */
}
