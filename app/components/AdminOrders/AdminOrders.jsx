import React, { Component } from 'react';

class AdminOrders extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      page: 1,
      numberOfPages: 0,
      filterByStatus: 'all'
    };
    this.fetchOrders();
    this.changeFilterByStatus = this.changeFilterByStatus.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
    this.getTBody = this.getTBody.bind(this);
    this.getPagination = this.getPagination.bind(this);
    this.getValidOrderStatus = this.getValidOrderStatus.bind(this);
  }

  fetchOrders() {
    let hostname = 'http://localhost:3000';
    fetch(`${hostname}/admin_orders.json`, {
            method: 'GET',
            credentials: 'include'
          })
          .then(response => response.json())
          .then(arrayOfOrders => this.setOrders(arrayOfOrders));
  }

  setOrders(arrayOfOrders) {
    this.setState({
      orders: arrayOfOrders,
      numberOfPages: Math.floor(arrayOfOrders.length / 10) + 1
    })
  }

  nextPage() {
    let currPage = this.state.page;
    let numberOfPages = this.state.numberOfPages;
    if (currPage < numberOfPages) {
      this.setState((prevState) => {
        return {
          page: prevState.page + 1
        };
      })
    }
  }

  prevPage() {
    let currPage = this.state.page;
    if (currPage > 1) {
      this.setState((prevState) => {
        return {
          page: prevState.page - 1
        };
      })
    }
  }

  changeFilterByStatus() {
    let newValue = this.selectStatusFilter.value;
    let orders = this.state.orders.filter((order) => {
      if (newValue === 'all'|| newValue === order.status) {
        return true;
      }
    });
    let newNumberOfPages = Math.floor(orders.length / 10) + 1; 
    this.setState((prevState) => {
      return {
        page: 1,
        filterByStatus: newValue,
        numberOfPages: newNumberOfPages
      };
    });
  }

  getTBody() {
    if (!this.state.orders.length) {
      return;
    }
    let optionsArr = ['Миття посуду', 'Чистка холодильника', 'Прасування', 'Чистка духовки', 'Миття вікон'];
    let ordersOnPage = 10;
    let currPage = this.state.page;
    let currFilterByStatus = this.state.filterByStatus;
    let orders = this.state.orders.filter((order) => {
      if (currFilterByStatus === 'all' || currFilterByStatus === order.status) {
        return true;
      }
    });
    orders = orders.slice((currPage - 1) * ordersOnPage, currPage * ordersOnPage);
    let tBody = orders.map((order, orderIndex) => {
      let optionsKeys = Object.keys(orders[orderIndex].options);
      let options = optionsArr.filter((optionTitle, index) => {
        return order.options[optionsKeys[index]] === "true";
      }).map((option, index) => {
        return (<li key={index}>{option}</li>);
      });

      return (
        <tr key={orderIndex}>
          <td>{order.id}</td>
          <td>{order.user.email}</td>
          <td>{order.user.phone}</td>
          <td>{order.address}</td>
          <td>{order.num_of_rooms}</td>
          <td>
            {order.time_order.slice(11, 16) + ' '} 
            {new Date(order.date_order).toLocaleDateString()} 
          </td>
          <td><ul>{options}</ul></td>
          <td>{order.amount}</td>
          <td>{this.getValidOrderStatus(order.status)}</td>
        </tr>
      );
    });
    return tBody;
  }

  getValidOrderStatus(status) {
    switch(status) {
      case 'new': return 'Нове замовлення'
      case 'in_progress': return 'В роботі'
      case 'done': return 'Завершене'
    }
  }

  getPagination() {
    let currPage = this.state.page;
    let newNumberOfPages = this.state.numberOfPages;
    if (newNumberOfPages > 1) {
      return (
        <p>{`${currPage} з ${newNumberOfPages}`}</p>
      );
    } else {
      return (
        <p></p>
      );
    } 
  }

  render() {
    console.log(this.state.orders);
    return (
      <div>
        <div className="wrapperNav">
          <div className="navText">
            <p><strong>Замовлення</strong> Опрацювати кожне необхідно протягом 5 хвилин</p>
            <select defaultValue="all" 
                    onChange={this.changeFilterByStatus}
                    ref={(input) => {this.selectStatusFilter = input;}}>
              <option value="new">Нове</option>
              <option value="in_progress">В роботі</option>
              <option value="done">Завершене</option>
              <option value="all">Усі</option>
            </select>
          </div>
        </div>
        <div className="wrapperTable1">
          <table className="table is-narrow">
            <thead>
              <tr>
                <td><strong>#</strong></td>
                <td><strong>Пошта</strong></td>
                <td><strong>Номер телефону</strong></td>
                <td><strong>Адреса</strong></td>
                <td><strong>К</strong></td>
                <td><strong>Час і дата</strong></td>
                <td><strong>Опції</strong></td>
                <td><strong>Сплачено</strong></td>
                <td><strong>Статус</strong></td>
              </tr>
            </thead>
            <tbody>{this.getTBody()}</tbody>
          </table>
          <nav className="pagination">
            <div className="pages">{this.getPagination()}</div>
            <a className="button" onClick={this.prevPage}>Попередня</a>
            <a className="button" onClick={this.nextPage}>Наступна</a>
          </nav>
        </div>
      </div>
    )
  }  
}

export default AdminOrders;
