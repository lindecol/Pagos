export const api = {
  //server: 'http://10.104.11.10:8097/Servicio/api',
  server: 'http://10.104.8.50:8097/Servicio/api',
  //server: 'https://localhost:44361/api',
  // Swagger http://10.104.8.50:8097/Servicio/swagger/ui/index#/

  // Login
  login: '/AutenticarPost/',
  cambiarPassword: '/CambiarContraseña/',

  // Lista
  listaPais: '/Listar',
  listaNotificaciones: '/Listar/',
  listaSesion: '/ListarSesion?usuario=', 
  ListarGeneralPagos: '/ListarGeneralPagos?empId=',
  ObtenerNit:'/ObtenerNit?usuario=',

  // Mensaje
  cambiarEstadoMensaje: '/CambiarEstadoMensaje/',
};

export const framePagosUrl= 'http://10.104.8.50:8097/IU/Pago/Index?monto={monto}&referencia={referencia}&empId={EmpId}';
export const frameMultiPagosUrl= 'http://10.104.8.50:8097/IU/Multipago?objeto={objeto}';

//export const framePagosUrl= 'http://10.104.11.10:8097/IU/Pago/Index?monto={monto}&referencia={referencia}&empId={EmpId}';
//export const frameMultiPagosUrl= 'http://10.104.11.10:8097/IU/Multipago?objeto={objeto}';

//export const framePagosUrl= 'https://localhost:44385/Pago/Index?monto={monto}&referencia={referencia}&empId={EmpId}';
//export const frameMultiPagosUrl= 'https://localhost:44385/Multipago?objeto={objeto}';

export const SnackbarType = {
  // Store All Types of Existing SnackbarType
  WARNING: 'alert',
  ERROR: 'error',
  INFO: 'info',
  SUCCESS: 'success',
};

export const listaCompa =[
  {id: '15200',  name: 'Oxígenos de Colombia'},
  {id: '15270', name: 'Liquido Carbónico'},
  {id: '15290', name: 'Praxair Gases industriales'},
];

export const nombreProducto='Portal clientes';
export const nombreEmp='Linde';
export const version='1.0.0';

export const Headers = {
  // Store All Types of Existing Headers
  responseType: 'Accept',
  Token: 'token',
  Password: 'password',
};
