use std::collections::HashMap;
use std::fs;
use std::fs::File;
use std::io::Read;
use crate::api::user_handlers::{LoginData, UserData, RegisterData};
use crate::api::content_handlers::{Content, ContentText};

pub trait Database: Send + Sync {
    fn login(&self, login_data: LoginData) -> Option<UserData>;
    fn register(&self, register_data: RegisterData) -> Result<(), ()>;
    fn hello(&self) -> String;

    fn get_image(&self, idx: u32) -> Option<Vec<u8>>;
    fn get_info(&self, idx: u32) -> Option<ContentText>;
}

#[derive(Clone)]
pub struct DatabaseMock {
    content_vec: Box<HashMap<u32, Content>>,
    id: u8
}

impl DatabaseMock {
    pub fn new() -> Result<DatabaseMock, String> {
        let mut h_content = HashMap::new();
        let s_content = fs::read_to_string("C:\\Users\\xgg\\WebstormProjects\\DailyContent\\backend\\data\\content.json").expect("not found");
        let v_content: Vec<Content> = serde_json::from_str(s_content.as_str()).expect("could not convert");
        v_content.into_iter().for_each(|v| { h_content.insert(v.id, v); });

        Ok(DatabaseMock{
            content_vec: Box::new(h_content),
            id: 0
        })
    }
}

impl Database for DatabaseMock {
    fn login(&self, login_data: LoginData) -> Option<UserData> {
        unimplemented!();
        None
    }

    fn register(&self, register_data: RegisterData) -> Result<(), ()> {
        unimplemented!();
        Err(())
    }

    fn hello(&self) -> String {
        String::from("stufff asda sda sda da sd asd")
    }

    fn get_image(&self, idx: u32) -> Option<Vec<u8>> {
        let img =
            std::fs::read(format!("C:\\Users\\xgg\\WebstormProjects\\DailyContent\\backend\\data\\{}.jpg", idx));
        match img {
            Ok(img) => Some(img),
            Err(img) => {
                warn!("No such file");
                None
            }
        }
    }

    fn get_info(&self, idx: u32) -> Option<ContentText> {
        match self.content_vec.get(&idx) {
            Some(val) => Some(ContentText::from_content(val)),
            None => None
        }
    }
}