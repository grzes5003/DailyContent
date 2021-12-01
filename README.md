# DailyContent
> #### React Native (expo) + Rust actix web

Serves daily content based on user feedback

## Getting started
To get app running:

- clone repo
- install expo:
  - `npm install --global expo-cli`
- install Rust toolchain
  - `curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh`
- `cd frontend`
- `npm install`
- `npm start expo`
- Start backend server
- `cd ../backend`
- `run --package backend --bin backend`

> Note: by default expo and server runs on localhost

## General overview
This repo contains 3 main parts:
 - `frontend`: React Native app created with expo
 - `backend`: Rust server used by app
 - `backend-mock`: Node server based on Express.js with basic functionality

