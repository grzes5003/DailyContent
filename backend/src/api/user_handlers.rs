use actix_web::{web, Responder, post, get, HttpResponse};
use actix_session::{Session};
use serde::{Serialize, Deserialize};
use crate::model::database::Database;


#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct LoginData {
    pub username: String,
    pub password: String
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct RegisterData {
    pub username: String,
    pub password: String
}

#[derive(Serialize, Debug)]
pub struct UserData {
    pub id: u16,
    #[serde(rename(serialize = "username"))]
    pub username: String
}


#[post("/login")]
pub async fn login<'a>(db: web::Data<Box<dyn Database>>, session: Session, login_data_raw: web::Json<LoginData>) -> impl Responder {
    info!("login data {:?}", login_data_raw);

    let login_data = LoginData {
        username: String::from(&login_data_raw.username),
        password: String::from(&login_data_raw.password)
    };

    if let Some(user_data) = db.login(login_data) {
        session.insert("user_id", &user_data.id);
        return HttpResponse::Ok()
            .json(UserData {
                id: user_data.id,
                username: user_data.username,
            })
    }

    HttpResponse::Forbidden()
        .body("Bad login or password")
}

#[post("/register")]
pub async fn register<'a>(db: web::Data<Box<dyn Database>>, session: Session, register_data_raw: web::Json<RegisterData>) -> impl Responder {

    let register_data = RegisterData {
        username: String::from(&register_data_raw.username),
        password: String::from(&register_data_raw.password),
    };

    info!("register data {:?}", register_data);

    if let Ok(_) = db.register(register_data) {
        return HttpResponse::Ok();
    }

    HttpResponse::Forbidden()
}

#[get("/logout")]
pub async fn logout(db: web::Data<Box<dyn Database>>, session: Session) -> impl Responder {
    info!("logout action");

    if let Ok(Some(user_id)) = session.get::<u64>("user_id") {
        session.purge();
        return HttpResponse::Ok()
    }

    HttpResponse::Forbidden()
}