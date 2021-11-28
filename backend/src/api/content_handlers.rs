use std::sync::Arc;
use actix_session::Session;
use actix_web::{HttpResponse, Responder, get, web, Result};
use serde::{Serialize, Deserialize};
use crate::model::database::Database;

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Content {
    pub id: u32,
    pub image_url: String,
    pub title: String,
    pub description: String,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct ContentText {
    pub title: String,
    pub description: String,
}

impl ContentText {
    pub fn from_content(content: &Content) -> ContentText {
        ContentText {
            title: content.title.clone(),
            description: content.description.clone(),
        }
    }
}

#[get("/img/{idx}")]
pub async fn get_image(db: web::Data<Arc<dyn Database>>, params: web::Path<u32>) -> impl Responder {
    info!("hello");
    let idx = params.into_inner();
    match db.get_image(idx) {
        Some(img) => HttpResponse::Ok()
            .content_type("image/jpeg")
            .body(img),
        None => HttpResponse::NotFound().body("Not found")
    }
}

#[get("/info/{idx}")]
pub async fn get_info(db: web::Data<Arc<dyn Database>>, params: web::Path<u32>) -> impl Responder {
    info!("hello");
    let idx = params.into_inner();

    match db.get_info(idx) {
        Some(content_text) => HttpResponse::Ok()
            .content_type("application/json")
            .json(content_text),
        None => HttpResponse::NotFound().body("Not found")
    }
}