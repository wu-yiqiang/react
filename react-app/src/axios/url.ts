let url = ''
switch (process.env.NODE_ENV) { 
  case 'development': url = "/dev"; break;
  case 'test': url = "/test"; break;
  case 'production': url = "/production"; break;
  default:  url = "/dev"; break;
}
export default url