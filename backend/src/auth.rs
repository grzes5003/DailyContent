use std::fmt;
use chrono::Utc;
use actix_cors::Cors;
use jsonwebtoken::{decode, encode, Algorithm, DecodingKey, EncodingKey, Header, Validation};
use actix_web::{dev::ServiceRequest, get, App, Error, HttpResponse, HttpServer};
use actix_web::error::ContentTypeError::ParseError;
use serde::{Serialize, Deserialize};
use actix_web_httpauth::{
    extractors::bearer::BearerAuth, middleware::HttpAuthentication
};

const BEARER: &str = "Bearer ";
const JWT_SECRET: &[u8] = b"secret";

#[derive(Clone, PartialEq)]
pub enum Role {
    User
}

impl fmt::Display for Role {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            Role::User => write!(f, "User"),
        }
    }
}

#[derive(Debug, Deserialize, Serialize)]
struct Claims {
    sub: String,
    role: String,
    exp: usize,
}

pub async fn validator(
    req: ServiceRequest,
    credentials: BearerAuth,
) -> Result<ServiceRequest, Error> {
    eprintln!("{:?}", credentials.token());
    let decoded = decode::<Claims>(
        &credentials.token(),
        &DecodingKey::from_secret(JWT_SECRET),
        &Validation::new(Algorithm::HS512),
    ).map_err(|e| {eprintln!("{}", e.to_string()); ParseError})?;
    eprintln!("{:?} {:?}", decoded.header, decoded.claims);
    Ok(req)
}


pub fn create_jwt(uid: &str) -> jsonwebtoken::errors::Result<String> {
    let expiration = Utc::now()
        .checked_add_signed(chrono::Duration::days(14))
        .expect("valid timestamp")
        .timestamp();

    let claims = Claims {
        sub: uid.to_owned(),
        role: Role::User.to_string(),
        exp: expiration as usize,
    };
    let header = Header::new(Algorithm::HS512);
    encode(&header, &claims, &EncodingKey::from_secret(JWT_SECRET))
}