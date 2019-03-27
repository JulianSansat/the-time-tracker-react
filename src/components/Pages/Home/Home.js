import React, { Component } from 'react';
import Api from "../../../services/api";
import AsyncSelect from 'react-select/lib/Async';
import './Home.scss';

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            logs: [],
            errorWarning: 'hide',
        }
    }

    componentDidMount() {
        Api.get(`/logs`)
        .then(res => {
        if(res.status === 200){
          this.setState({
            'errorWarning': 'hide',
            'logs': res.data.data
          });
        }
        })
        .catch(error => {
          if(error.response != undefined){
            this.setState(
              {
                'errorWarning': '',
                'errors': error.response.data.errors
              }
            );
            return;
          }
          this.setState(
            {
              'errorWarning': ''
            }
          );
        });
    }

    render() {
        return (
            <section className="section">
                <div className="box">
                    <article class={"message is-danger " + this.state.errorWarning}>
                      <div class="message-header">
                        <p>Failed to load logs</p>
                      </div>
                      <div class="message-body">
                        <p>something went wrong when accessing time logs</p>
                      </div>
                    </article>
                    <table className="table is-narrow is-fullwidth is-bordered">
                        <thead className="thead">
                            <tr>
                                <th>user Id</th>
                                <th>Time</th>
                            </tr>
                        </thead>
                        <tbody>
                          {Object.values(this.state.logs).map(log => 
                            <tr key={log.id}>
                              <th>{log.user_id}</th>
                              <td>{log.time}</td>
                            </tr>
                          )}
                        </tbody>
                    </table>
                </div>
            </section>
        );
    }
}

export default Home;