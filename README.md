![alt text](docs/_media/logo.png)
> #### React Native (expo) + Redux + Rust actix web
# DailyContent
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

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

## About App 
DailyContent is mobile application, made as a university project. 
Home screen presets to user 5 random interesting facts (These are polish wikipedia articles as an example).

![Alt Text](docs/_media/app_01.gif)

User - if logged in - can share nad react to every fact with like/dislike. Feedback is sent do to server,
adjusting content presented to user in the future.  

![Alt Text](docs/_media/app_02.gif)


![Alt Text](docs/_media/app_03.gif)

## General overview of project structure
This repo contains 3 main parts:
 - `frontend`: React Native app created with expo
 - `backend`: Rust server used by app
 - `backend-mock`: Node server based on Express.js with basic functionality


### Frontend


App was implemented in React native with expo. I selected Redux as a state container.
Whole frontend codebase was written in TypeScript, as an attempt to understand this technology.  

Code structure is similar to my previous react+redux projects.
 - `screens` contains ready to use screen components
 - `components` are smaller parts used to build screens
 - `navigation` defines relations between different app screens
 - `assets` is in the most part not used, as it was useful in mocking process in early development stages
 - `_*` directories defines behaviour of state container and communication with REST api. More about this 
 can be found in the following sections.

#### Screens 

Application contains three screens:
- Home
- Login
- NotFound

Home screen handles all content cards and is starting screen for an app. 
Login screen is implemented as Modal type screen, expanding from bottom.
NotFound screen is served when user tries to access unavailable resources.

#### Navigation

Main component called `RootNavigator` defines relations between different screens. 

```tsx
export default function RootNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Drawer" component={Navigation} options={{headerShown: false, headerTransparent: true}}/>
            <Stack.Screen name="NotFound" component={NotFoundScreen} options={{title: 'Oops!'}}/>
            <Stack.Group screenOptions={{presentation: 'modal'}}>
                <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: true, headerTransparent: true, headerTintColor: 'white'}}/>
            </Stack.Group>
        </Stack.Navigator>
    );
}

```

Drawer is next navigation element, defining Home screen, and side drawer styled menu.


```tsx
export function Navigation({colorScheme}: { colorScheme: ColorSchemeName }) {
    const loggedIn = useAppSelector(selectLoggedIn);
    const dispatch = useDispatch();

    const DrawerContent = (props: any) => (
        ...
        // all menu elements
        ...
    )

    return (
        <Drawer.Navigator screenOptions={{drawerActiveTintColor: 'white', drawerInactiveTintColor: 'white'}}
                          initialRouteName="Home"
                          drawerContent={DrawerContent}
        >
            <Drawer.Screen options={{headerTransparent: true, headerTitle: ''}} name="Home" component={Home}/>
        </Drawer.Navigator>
    );
}
```

#### Components

Components are defined inside `frontend/components` directory.
Component is small interface element, that can be reused in app.

#### Redux (`_*` dirs) *aka back to the MVC*
 
Model+View+Controller was (disputably still is) quite popular approach for designing applications.
View displays Model controlled by Controller - View is handled by React components, Redux does the rest.
Redux really facilitates this technique in React, with ease.

Inside `_helpers/store.helper.ts` store is defined. It's Redux core, combining reducers with middleware. 
After declaration store is wrapped with storage, enabling possibility to store data in persistent device memory.
                                                                        
Data stored in state containers is: 

User data with JWT token
```ts
// auth: auth.reducers.ts
export interface User {
    id: number,
    token: string,
    username: string
}
export interface AuthState {
    loggedIn: boolean,
    ...
}

```

Content data shown to user in Home screen
```ts
// info info.reducers.ts

export interface ContentText {
    title: string
    description: string
    feedback: boolean
}

export interface InfoState {
    content: ContentText[],
    ...
}

// img: img.reducers.ts
export interface ImgState {
    images: string[],
    ...
}

```


All controllers are stored inside `_reducers`. From there reducers directly influences store data:
```ts
export const imgSlice = createSlice({
    name: 'img',
    initialState,
    reducers: {
        setLoading: (state, {payload}: PayloadAction<boolean>) => {
            state.loading = payload
        },

        setErrors: (state, {payload}: PayloadAction<string>) => {
            state.error = payload
            state.loading = false
        },

        setImages: (state, {payload}: PayloadAction<any>) => {
            state.images = payload
            state.loading = false
        },

        addImg: (state, {payload}: PayloadAction<any>) => {
            state.images.push(payload)
            state.loading = false
        }
    }
})
```
Where initial state is 
```ts
const initialState: ImgState = {
    loading: false,
    images: [],
    error: ''
}
```
This declaration enables to call `imgSlice.setImages(my_payload)`, that changes all stored images.

Easiest way to expose *reducers* in controlled manner is to define *actions*:
```ts
const getAllImages = (): ThunkAction<void, RootState, unknown, AnyAction> =>
    async dispatch => {
        console.log('get all images dispatch!');
        dispatch(setLoading(true))

        imgService.getAllImgs()
            .then(
                images => dispatch(setImages(images)),
                error => dispatch(setErrors(error))
            )
    };
```

The function above is called, for example, when loading home screen React component calls (aka *dispatches*) action `dispatch(getAllImages)`.
This triggers `imgService.getAllImgs()` inside this `ThunkAction`, which directly queries REST API exposed by server.

```ts
const getAllImgs = () => {
    const req = `${config.apiUrl}/img`;
    console.log('fetch all images from ', req)

    const promises = [];

    for (const x of Array(5).keys()) {
        promises.push(FileSystem.downloadAsync(
            `${req}/${x}`,
            FileSystem.documentDirectory + `${x}.jpg`,
            {
                sessionType: FileSystem.FileSystemSessionType.FOREGROUND
            }
        )
            .then(({uri}) => {
                console.log('Finished downloading to ', uri);
                return uri
            })
            .catch(error => {
                console.log('Finished downloading with error ');
                console.error(error);
            })
        );
    }

    return Promise.all(promises).then(values => {
        console.log('values ' + values);
        return values;
    }).catch(error => {
        console.log(error);
    })
}
```

Function above downloads images and returns URIs to it as promise.
Following that chain of calls, when promise is resolved `dispatch(setImages(images))` with array of URIs. 

```ts
        imgService.getAllImgs()
           .then(
                images => dispatch(setImages(images)),
                error => dispatch(setErrors(error))
            )
```

Other reducers, actions and services (for `auth` and `content`) are designed similarly. 
This approach enables great control over data used in app.