import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cookie from 'react-cookies';
import { apiService } from '../../services/api.service';
import { Alert, Pagination, Table } from 'react-bootstrap';
//styles
import './UserRepositories.scss';

class UserRepositories extends Component {

  constructor(props) {
    super(props);
    this.state = {
      arrayFilter: [],
      currentPage: 1,
      currentRepos: [],
      isSearching: false,
      repos: [],
      search: ""
    };
  }

  componentDidMount() {
    this.requestData();
    this.subscription = apiService.getData().subscribe(repos => {
      if(repos.length){
        this.setState({ repos })
      }
    });
  }

  componentWillUnmount() {
    this.subscription.unsubscribe();
  }

  requestData() {
    const userInfo = cookie.load('userInfo');
    if(userInfo && userInfo.githubUsername){
      apiService.requestData(userInfo.githubUsername);
    }
  }

  backHome = () => {
    const { history } = this.props;
    cookie.remove('userInfo', { path: '/' });
    this.clearInfo();
    history.push("/");
  }

  clearInfo = () => {
    this.props.clear();
  }

  sortBy = ( sortField, array ) => {
    const newArray = [...array].sort((a,b)=> {
      if (a[sortField] > b[sortField]) {
        return 1;
      }
      if (a[sortField] < b[sortField]) {
        return -1;
      }
      return 0;
    });
    this.setState({ repos: newArray });
  }

  onChange = (event) => {
    const { repos } = this.state;
    const search = event.target.value;
    if(search && search.length >= 3){
      const isSearching = true;
      const result = repos.filter( item => {
        const lowerCase = item['name'].toLowerCase();
        const filter = search.toLowerCase();
        return lowerCase.includes(filter);
      });
      const arrayFilter = result.slice(0, 5);
      this.setState({ arrayFilter, isSearching, search });
    }
    if(search.length < 3){
      this.setState({ arrayFilter: [...repos], isSearching: false });
    }
  }

  renderfilterTable = () => {
    return (
      <form onSubmit={(e) => e.preventDefault()} className="repositories__filter" id="filterContainer">
        <div className="form-group inputContainer filter__container">
          <input className="form-control inputContainer__text filter__container__input" type="text" id="txtSearch" name="search" placeholder="Search by Name" onChange={this.onChange} onFocus={(e)=>e.target.select()} />
          <span className="filter__container__icon" id="searchIcon"><i className="fas fa-search"></i></span>
        </div>
      </form>
    )
  }

  renderTable = () => {
    const { arrayFilter, currentPage, isSearching, repos } = this.state;
    const arrayData = isSearching ? arrayFilter : (repos.length > 5 ? this.showDataByPage() : repos);
    let count = currentPage === 1 ? 1 : (currentPage * 5) - 4;
    return (
      <Table responsive className="repositories__table" id="reposTable">
        <thead>
          <tr>
            <th>#</th>
            <th onClick={() => this.sortBy('name', repos)}>Name</th>
            <th onClick={() => this.sortBy('description', repos)}>Description</th>
            <th onClick={() => this.sortBy('language', repos)}>Language</th>
            <th onClick={() => this.sortBy('default_branch', repos)}>Default Branch</th>
            <th onClick={() => this.sortBy('git_url', repos)}>Git Url</th>
            </tr>
        </thead>
        <tbody>
          {
            arrayData && arrayData.length > 0 ? arrayData.map( item => {
              return(
                <tr key={item['id']}>
                  <td>{ count++ }</td>
                  <td>{ item['name'] }</td>
                  <td>{ item['description'] }</td>
                  <td>{ item['language'] }</td>
                  <td>{ item['default_branch'] }</td>
                  <td>{ item['git_url'] }</td>
                </tr>
              )
            })
            : 
            <tr>
              <td colSpan="6">
                <Alert variant="info" id="messageTable">
                  <p className="message"><i className="fas fa-info-circle"></i> Repos not Found! </p>
                  <p className="messageIcon"><span role="img" aria-label="Emoji" aria-labelledby="emojiImg">😥</span></p>
                </Alert>
              </td>
            </tr>
          }
        </tbody>
      </Table>
    )
  }

  renderPagination = (repos) => {
    const items = [];
    const active = this.state.currentPage;
    const totalPages = Math.ceil(repos.length / 5);
    
    for (let number = 1; number <= totalPages; number++) {
      items.push(
        <Pagination.Item key={number} active={number === active} onClick={()=>this.setPage(number)}>
          {number}
        </Pagination.Item>,
      );
    }
    
    return (
      <section className="repositories__pagination">
        <Pagination>{items}</Pagination>
      </section>
    )
  }

  setPage = (page) => {
    this.setState({ currentPage: page });
  }

  showDataByPage = () => {
    const { repos, currentPage } = this.state;
    const offset = (currentPage - 1) * 5;
    const currentRepos = repos.slice(offset, offset + 5);
    return currentRepos;
  }

  render() {
    const { repos, isSearching } = this.state;
    return (
      <section className="repositories">
        <button className="btn btn-primary repositories__button" type="button" onClick={this.backHome}> <i className="fas fa-arrow-circle-left"></i> Back to Home </button>
        { this.renderfilterTable() }
        { this.renderTable() }
        { (repos.length > 5 && !isSearching)  && this.renderPagination(repos) }
      </section>
    );
  }
}

UserRepositories.protoTypes = {
  clear: PropTypes.func,
  history: PropTypes.object
}

export default UserRepositories;
