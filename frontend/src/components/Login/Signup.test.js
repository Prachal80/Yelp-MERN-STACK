import React from 'react';
import { shallow } from 'enzyme';

import Signup from './Signup'
// import { BACKEND_URL, BACKEND_PORT } from '../Config/backendConfig'

describe( 'Signup', () => {

    let axios = require( "axios" );
    let MockAdapter = require( "axios-mock-adapter" );
    let mock = new MockAdapter( axios );

    mock.onPost( "http://" + process.env.REACT_APP_IP + ":3001" + "/signup" ).reply( 200,
    { success: true, res: [{
        
        name: "prachal",
        email: "prachal@gmail.com",
        password: "12345"
    }]}
    );

    let component

    beforeEach( () => {
        component = shallow( <Signup debug /> );
        component.instance().setState({
            email: "prachal@gmail.com",
            password: "12345",
            userType: "customer",
            name: "prachal"
        })
    } );

    it( 'should Signup', () => {
        component.instance()
        expect( component ).toMatchSnapshot();
    } );

    it( 'validate state has values', () => {
        expect( component.state().userType).toEqual( "customer" )
        // expect( component.state().password).toEqual( "12345" )
        // expect( component.state().username).toEqual( "prachal@gmail.com" )
    } );

    it( 'render after setting localstorage', async ( done ) => {
        component
            .instance()
            .submitSignup()
            .then( () => {
                //expect( localStorage.getItem("CID") ).toEqual( 43 )
                // expect( localStorage.getItem("Cname") ).toEqual( "prachal" )
                done()
            } )
        expect( component ).toMatchSnapshot();
    } );

    // it( 'simulate checkbox to filter restaurants by curbside_pickup', async ( done ) => {
    //     component
    //         .instance()
    //         .componentDidMount()
    //         .then( () => {
    //             let restaurants_filter = component.find( 'input[type="checkbox"]' ).at( 0 )
    //             expect( component.state().filtered_restaurants ).toEqual( restaurants )
    //             restaurants_filter.simulate( 'change', { target: { checked: true, value: "curbside_pickup" } } )
    //             expect( component.state().filtered ).toEqual( "curbside_pickup" )
    //             expect( component.state().filtered_restaurants ).toEqual( filtered_restaurants )
    //             restaurants_filter.simulate( 'change', { target: { checked: false, value: "curbside_pickup" } } )
    //             expect( component.state().filtered ).toEqual( "" )
    //             expect( component.state().filtered_restaurants ).toEqual( restaurants )
    //             done()
    //         } )

    //     expect( component ).toMatchSnapshot();
    // } )

    // it( 'simulate search restaurants to search indian cuisine', async ( done ) => {
    //     component
    //         .instance()
    //         .componentDidMount()
    //         .then( () => {
    //             let search_options = component.find( 'select.searchOptions' )
    //             let search = component.find( 'input[type="text"]' )
    //             expect( component.state().filtered_restaurants ).toEqual( restaurants )
    //             search_options.simulate( 'keydown', { keyCode: 40 } )
    //             search_options.simulate( 'keydown', { keyCode: 13 } )
    //             search_options.simulate( 'change', { target: { name: "selectedOption", value: "cuisine" } } )
    //             expect( component.state().selectedOption ).toEqual( "cuisine" )
    //             search.simulate( 'change', { target: { name: "search", value: "indian" } } )
    //             expect( component.state().search ).toEqual( "indian" )
    //             component
    //                 .instance()
    //                 .searchRestaurants( {
    //                     preventDefault: () => {
    //                     }
    //                 } )
    //                 .then( () => {
    //                     expect( component.state().filtered_restaurants ).toEqual( filtered_restaurants )
    //                     done()
    //                 } )

    //             expect( component ).toMatchSnapshot();
    //         } )
    // } )

    // it( 'validate localstorage is empty', () => {
    //     localStorage.removeItem( "id" )
    //     localStorage.removeItem( "active" )
    //     expect( localStorage.store ).toEqual( {} )
    // } );

} )