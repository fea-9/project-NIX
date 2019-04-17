import React, {PureComponent} from 'react';
import Button from '../Button';
import Icon from '../icon';
import {NavLink} from 'react-router-dom';
import * as actions from "../../actions/search";
import { connect } from "react-redux";

let mapStateToProps = state => ({
    search: state.search,
  });

  
class SearchInput extends PureComponent{

    state = {
        value:"",
    }

    changeinpValue = e =>{
        this.setState({value: e.target.value})
    }

    clickHandler = e =>{
        this.props.getSearch( this.state.value );
    }

    componentDidMount(){
        if(this.state.value !== this.props.inputValue && this.props.inputValue !== ""){
            this.setState({value: this.props.inputValue})
        }
    }


    render(){
        return(
            <div className = "search-box-input__wrapper">
                <input 
                    className = "input-box__input-search-component" 
                    placeholder = "Search for published articles, topics, or journals…" 
                    type = "text" 
                    name = "search"
                    onChange = {this.changeinpValue}
                    value = {this.state.value} 
                />
                <NavLink to={`/search?${this.state.value}`}>
                <Button 
                    className = "btn-search"
                    onClick = {this.clickHandler}
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
                </NavLink>
            </div>
        )
    } 
}


SearchInput = connect(
    mapStateToProps,
    { ...actions }
  )(SearchInput);
export default SearchInput