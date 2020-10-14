import React from 'react';
import { shallow } from 'enzyme';

import Profile from './customerProfile'
// import { BACKEND_URL, BACKEND_PORT } from '../Config/backendConfig'

describe( 'Profile', () => {

    let axios = require( "axios" );
    let MockAdapter = require( "axios-mock-adapter" );
    let mock = new MockAdapter( axios );
  
    const profile =  [    
              {id: 43,
              name: 'Prachal Patel',
              email: 'prachaljpatel@gmail.com',
              password: '$2b$10$339p03I/o8qIFl0a65fvD.DZGVwwNWU7R0Iaqn1lZGlW.bX6jTKPm',
              birthdate: '2020-09-10',
              city: 'San Jose',
              state: 'CA',
              country: 'United States',
              nickname: 'Prac',
              headline: 'Software Engineerng Grad',
              phone: '7737083996',
              profilepic: 'uploads/profilePic-1602311819535.JPG',
              blog: 'prachal80.github.io',
              yelpingsince: '2019',
              thingsilove: 'Pizza',
              findmein: 'Mcd'}
      ]
    

      mock.onGet( "http://" + process.env.REACT_APP_IP + ":3001" + "/customerProfile/getCustomerProfile" ).reply( 200,
      { success: true, profileData: profile}
      );
    let component

    beforeEach( () => {
        localStorage.setItem( "CID", 43 )
        component = shallow( < Profile debug /> );
        
    } );

    it( 'should Get Profile', () => {
        component.instance()
        expect( component ).toMatchSnapshot();
    } );

    it( 'validate localstorage has values', () => {
        expect( localStorage.getItem( "CID" ) ).toEqual(43)
        // expect( component.state().RID ).toEqual(10)
        
    } );

    it( 'render after setting localstorage', async ( done ) => {
        component.update()
        // component.instance().setState({
        //     CID: 10,
        // })
        component
            .instance()
            .componentDidMount()
            .then( () => {
                expect( component.state().name ).toEqual( "Prachal Patel" )
                expect( component.state().city ).toEqual( "San Jose" )
                expect( component.state().phone ).toEqual( "7737083996" )
                //expect( component.state().filtered_restaurants ).toEqual( restaurants )
                done()
            } )
        expect( component ).toMatchSnapshot();
    } );

    
} )