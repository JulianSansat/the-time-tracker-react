import React, { Component } from 'react';
import Api from "../../../services/api";
import AsyncSelect from 'react-select/lib/Async';
import moment from 'moment';
import './Home.scss';

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            logs: [],
            errorWarning: 'hide',
            selectedUser: null,
            logFilters: []
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

    handleUserSelectChange = (selectedUser) => {
      this.setState({ selectedUser });
      this.filterLogs('user_id', selectedUser.user_id);
    }

    filterLogs = (key, value) => {
      let logFilters = this.state.logFilters;
      logFilters[key] = value;
      this.setState({
        logFilters: logFilters
      });
      this.loadLogs(logFilters);
    }

    loadLogs = (filters) => {
      Api.get(`/logs`, {params: {...filters}})
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
        const promiseOptions = inputValue => {
          return Api.get(`/users`, {params:{first_name: inputValue}}).then(res => {
            return res.data.data.map(obj => {
              return {value: obj.id, label: obj.first_name + ' ' + obj.last_name  , user_id:obj.id};
            });
          });
        };

        return (
            <section className="section">
                <AsyncSelect
                  cacheOptions={true}
                  value={this.state.selectedUser}
                  onChange={this.handleUserSelectChange}
                  defaultOptions={true}
                  loadOptions={promiseOptions}
                />
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
                                <th>User</th>
                                <th>Logged Time</th>
                                <th>Session start</th>
                                <th>Session end</th>
                            </tr>
                        </thead>
                        <tbody>
                          {Object.values(this.state.logs).map(log => 
                            <tr key={log.id}>
                              <th>{log.user.first_name} {log.user.last_name}</th>
                              <td>{log.time}</td>
                              <td>{moment(log.start).format('MMMM Do YYYY, h:mm:ss a')}</td>
                              <td>{moment(log.finish).format('MMMM Do YYYY, h:mm:ss a')}</td>
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