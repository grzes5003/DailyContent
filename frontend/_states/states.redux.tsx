import { connect, ConnectedProps } from 'react-redux'
import {RootState} from "../types";

const mapState = (state: RootState) => ({
    isOn: state.authentication.loggedIn,
})

const mapDispatch = {
    toggleOn: () => ({ type: 'TOGGLE_IS_ON' }),
}

const connector = connect(mapState, mapDispatch)

// The inferred type will look like:
// {isOn: boolean, toggleOn: () => void}
type PropsFromRedux = ConnectedProps<typeof connector>