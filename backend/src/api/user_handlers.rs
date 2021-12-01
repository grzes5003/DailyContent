use std::sync::{Arc, Mutex};
use actix_web::{web, Responder, post, get, HttpResponse};
use actix_session::{Session};
use serde::{Serialize, Deserialize};
use crate::model::database::Database;
use crate::auth;


#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct LoginData {
    pub username: String,
    pub password: String
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct UserLoginResponse {
    pub id: u32,
    pub username: String,
    pub token: String
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct RegisterData {
    pub username: String,
    pub password: String
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct  Preferences {
    person: u8,
    place: u8,
    history: u8
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct UserData {
    pub id: u32,
    // #[serde(rename(serialize = "username"))]
    pub username: String,
    pub preferences: Preferences
}


#[post("/login")]
pub async fn login<'a>(db: web::Data<Arc<Mutex<dyn Database>>>, session: Session, login_data_raw: web::Json<LoginData>) -> impl Responder {
    println!("login data {:?}", login_data_raw);

    let login_data = LoginData {
        username: String::from(&login_data_raw.username),
        password: String::from(&login_data_raw.password)
    };

    if let Some(user_data) = db.lock().unwrap().login(login_data) {
        session.insert("user_id", &user_data.id);
        let token = auth::create_jwt(&user_data.id.to_string())
            .expect("Could not create JWT");

        return HttpResponse::Ok()
            .json( UserLoginResponse {
                id: user_data.id,
                username: user_data.username,
                token: format!("Bearer {}", token)
            })
    }

    HttpResponse::Forbidden()
        .body("Bad login or password")
}

#[post("/register")]
pub async fn register<'a>(db: web::Data<Arc<Mutex<dyn Database>>>, session: Session, register_data_raw: web::Json<RegisterData>) -> impl Responder {

    let register_data = RegisterData {
        username: String::from(&register_data_raw.username),
        password: String::from(&register_data_raw.password),
    };

    info!("register data {:?}", register_data);

    if let Ok(_) = db.lock().unwrap().register(register_data) {
        return HttpResponse::Ok();
    }

    HttpResponse::Forbidden()
}

#[get("/logout")]
pub async fn logout(db: web::Data<Arc<Mutex<dyn Database>>>, session: Session) -> impl Responder {
    info!("logout action");

    if let Ok(Some(user_id)) = session.get::<u64>("user_id") {
        session.purge();
        return HttpResponse::Ok()
    }

    HttpResponse::Forbidden()
}

#[get("/hello")]
pub async fn hello(db: web::Data<Arc<Mutex<dyn Database>>>, session: Session) -> impl Responder {
    info!("hello");

    HttpResponse::Ok()
        .body(db.lock().unwrap().hello())
}