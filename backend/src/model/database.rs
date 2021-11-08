use crate::api::user_handlers::{LoginData, UserData, RegisterData};

pub trait Database {
    fn login(&self, login_data: LoginData) -> Option<UserData>;
    fn register(&self, register_data: RegisterData) -> Result<(), ()>;
}


#[derive(Clone)]
pub struct DatabaseMock {
    id: u8
}

impl DatabaseMock {
    pub fn new() -> Result<DatabaseMock, String> {
        Ok(DatabaseMock{
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
}