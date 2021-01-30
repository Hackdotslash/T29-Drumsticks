import React, { Component } from 'react'
import HomeNav from './HomeComp/HomeNav'
import HomeForm from './HomeComp/HomeForm'

export class Home extends Component {
    render() {
        return (
            <div>
                <HomeNav/>
                <HomeForm/>
            </div>
        )
    }
}

export default Home
