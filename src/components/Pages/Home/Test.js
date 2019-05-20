import React, { Component } from 'react';
import Api from "../../../services/api";
import AsyncSelect from 'react-select/lib/Async';
import moment from 'moment';
import './Home.scss';

class Test extends Component {
    constructor(props){
        super(props);
        this.state = {
          occurrences: []
        }
    }

    componentDidMount() {
        Api.get(`/occurrences`)
        .then(res => {
          if(res.status === 200){
            this.setState({
              'occurrences': res.data.data
            });
          }
        })
        .catch(error => {
          if(error.response != undefined){
            console.log(error.response.data.errors)
            return;
          }
          console.log('algum outro erro');
        });
    }

    render() {
      return(
        <div>Testando</div>
      );
    }
}

export default Test;