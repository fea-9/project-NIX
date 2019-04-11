import React, {Component} from 'react';
import Icon from "../BaseComponents/icon/index";
import Button from '../BaseComponents/Button';
import PropTypes from 'prop-types';
import * as actions from "../actions/search";
import { connect } from "react-redux"; 
import BurgerButton from '../BaseComponents/BurgerButton';

class Search extends Component{
    state = {
        search:{
            value:'',
            config:{
                type:'text',
                placeholder: "Search for published articles, topics, or journals…",
                name: "search",
                label: "search",
                required: true
            },
            
        },
        searched:false
    }
    render(){
        
        return(
            <div className = "search-box">
            <input 
                className = "input-box__input-search" 
                placeholder={this.state.search.config.placeholder} 
                type={this.state.search.config.type} 
                name={this.state.search.config.name} 
            />
            <Button 
                className = "btn-search"
                >
                <Icon 
                    className = "search-icon" 
                    type = "searchIcon" 
                    width = {17} 
                    height = {17} 
                    viewBox="0 0 20 20"
                />
                Search
                </Button>
                <BurgerButton/>
            </div>
        )
    }
}

export default connect(
    null,
    { ...actions }
  )(Search);