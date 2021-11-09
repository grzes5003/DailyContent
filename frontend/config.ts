export const config = {
    apiUrl: !process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? 'http://192.168.0.234:4040' : window.location.origin + '/api',
    loginServiceUrl: !process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? 'http://192.168.0.234:4040/api/auth' : window.location.origin + '/auth'
}