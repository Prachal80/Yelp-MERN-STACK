import React from 'react';
import { shallow } from 'enzyme';

import Review from './customerRestaurantView'
// import { BACKEND_URL, BACKEND_PORT } from '../Config/backendConfig'

describe( 'Review', () => {

    let axios = require( "axios" );
    let MockAdapter = require( "axios-mock-adapter" );
    let mock = new MockAdapter( axios );

  
    const reviews =  [
        {
          reviewid: 2,
          customerid: '43',
          restaurantid: '10',
          customername: 'Prachal Patel',
          restaurantname: 'McDonalds',
          review: 'Lovely sandwiches',
          rating: '5',
          reviewdate: "2020-10-02T07:00:00.000Z"
        },
        {
          reviewid: 5,
          customerid: '43',
          restaurantid: '10',
          customername: 'Prachal Patel',
          restaurantname: 'McDonalds',
          review: 'Nice service',
          rating: '3',
          reviewdate:"2020-10-02T07:00:00.000Z"
        },
        {
          reviewid: 1,
          customerid: '43',
          restaurantid: '10',
          customername: 'Prachal Patel',
          restaurantname: 'McDonalds',
          review: 'Good food',
          rating: '4',
          reviewdate: "2020-10-01T07:00:00.000Z"
        },
         {
          reviewid: 4,
          customerid: '43',
          restaurantid: '10',
          customername: 'Prachal Patel',
          restaurantname: 'McDonalds',
          review: 'Best burger ever',
          rating: '4',
          reviewdate: "2020-09-22T07:00:00.000Z"
        }
      ]
      mock.onGet( "http://" + process.env.REACT_APP_IP + ":3001" + "/restaurantProfile/getRestaurantProfile" ).reply( 200,
      { success: true, customerReviews: reviews}
      );
    let component

    beforeEach( () => {
        localStorage.setItem( "CID", 43 )
        component = shallow( < Review debug /> );
        
    } );

    it( 'should Get reviews', () => {
        component.instance()
        expect( component ).toMatchSnapshot();
    } );

    it( 'validate localstorage has values', () => {
        expect( localStorage.getItem( "CID" ) ).toEqual(43)
        // expect( component.state().RID ).toEqual(10)
        
    } );

    it( 'render after setting localstorage', async ( done ) => {
        component.update()
        component.instance().setState({
            RID: 10,
        })
        component
            .instance()
            .componentDidMount()
            .then( () => {
                expect( component.state().reviews ).toEqual( reviews )
                //expect( component.state().filtered_restaurants ).toEqual( restaurants )
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