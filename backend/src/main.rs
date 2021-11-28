mod model;
mod auth;
mod api;

extern crate pretty_env_logger;
#[macro_use]
extern crate log;

use std::io::Read;
use std::env;

use actix_files::Files;
use actix_web::{middleware, web, App, HttpResponse, HttpServer, Responder};
use crate::api::user_handlers::{hello, login, logout, register};
use actix_session::{Session, CookieSession};
use std::sync::Arc;
use crate::api::content_handlers::{get_image, get_info};

use crate::model::database::{Database, DatabaseMock};

async fn echo() -> impl Responder {
    "It works"
}

fn generate_db(b: bool) -> Arc<dyn Database> {
    match b {
        false => unimplemented!(),
        true => Arc::new(DatabaseMock::new().unwrap_or_else(
            |e| {
                error!("When creating fake DB: {}", e);
                panic!()
            }
        ))
    }
}


#[actix_web::main]
async fn main() -> std::io::Result<()> {
    pretty_env_logger::init();

    let mut settings = config::Config::default();
    settings
        .merge(config::File::with_name("config")).unwrap();

    let db = generate_db(settings.get_bool("mock").unwrap_or(false));

    HttpServer::new(move || {
        App::new()
            .data::<Arc<dyn Database>>(db.clone())
            .wrap(middleware::Logger::default())
            .wrap(
                CookieSession::signed(&[0; 32])
                    .secure(false)
            )
            .service(
                web::scope("/api")
                    // ...so this handles requests for `GET /app/index.html`
                    .route("/echo", web::get().to(echo))
                    .service(hello)
                    .service(get_image)
                    .service(get_info)
                    .service(
                        web::scope("/auth")
                            .service(login)
                            .service(register)
                            .service(logout)
                    )
            )
    })
        .bind(env::var("URL").unwrap_or("192.168.0.234:4040".to_string()))?
        .run()
        .await
}
