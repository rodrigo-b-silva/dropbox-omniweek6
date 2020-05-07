import React, { Component } from 'react';
import api from '../../services/api'

import './styles.css'
import logo from '../../assets/logo.png'

export default class Main extends Component {
    state = {
        box: ''
    }

    handleSubmit = async(e) => {
        e.preventDefault()
        const response = await api.post('/boxes', { title: this.state.box })
        console.log(response)

        this.props.history.push(`/box/${response.data._id}`)
    }
    
    handleInputChange = (e) => {
        this.setState({ box: e.target.value })
    }

    render(){
        return(
            <div id="main-container">
                <form onSubmit={this.handleSubmit}>
                    <img src={logo} alt="logo" />
                    <input 
                        type="text"
                        value={this.state.box}
                        onChange={this.handleInputChange} 
                        placeholder="Criar uma box" />
                    <button type="submit">Criar</button>
                </form>

            </div>
        )
    }
}